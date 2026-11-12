import React, { createContext, useContext, useState, useEffect } from 'react';
import { Gig, CartGig } from '../data/types.ts';
import confetti from 'canvas-confetti';

interface ToastMessage {
  id: string;
  title: string;
  subtitle?: string;
  type?: 'success' | 'info' | 'warning';
}

interface AppContextType {
  cart: CartGig[];
  addToCart: (gig: Gig) => void;
  removeFromCart: (gigId: string) => void;
  clearCart: () => void;
  isInCart: (gigId: string) => boolean;
  cartTotalEarnings: number;
  cartTotalMiles: number;
  hasScheduleConflict: boolean;
  conflictingDates: string[];

  savedGigs: string[];
  toggleSaveGig: (gigId: string) => void;
  isSaved: (gigId: string) => boolean;

  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  toasts: ToastMessage[];
  addToast: (title: string, subtitle?: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;

  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authRole: 'driver' | 'company';
  setAuthRole: (role: 'driver' | 'company') => void;

  submitCartApplications: (notes?: string) => Promise<{ carrierCount: number; gigCount: number }>;
  isSubmittedSuccessModalOpen: boolean;
  setIsSubmittedSuccessModalOpen: (open: boolean) => void;
  lastSubmissionMeta: { carrierCount: number; gigCount: number } | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'haulgig_cart_v1';
const SAVED_STORAGE_KEY = 'haulgig_saved_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Cart state with safe localStorage
  const [cart, setCart] = useState<CartGig[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.warn('Failed to read cart from localStorage', e);
      return [];
    }
  });

  // Saved gigs state with safe localStorage
  const [savedGigs, setSavedGigs] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(SAVED_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.warn('Failed to read saved gigs from localStorage', e);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authRole, setAuthRole] = useState<'driver' | 'company'>('driver');
  const [isSubmittedSuccessModalOpen, setIsSubmittedSuccessModalOpen] = useState(false);
  const [lastSubmissionMeta, setLastSubmissionMeta] = useState<{ carrierCount: number; gigCount: number } | null>(null);

  // Sync cart to localStorage safely
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  // Sync saved to localStorage safely
  useEffect(() => {
    try {
      localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(savedGigs));
    } catch (e) {
      console.warn('Failed to save favorites to localStorage', e);
    }
  }, [savedGigs]);

  const addToast = (title: string, subtitle?: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    setToasts((prev) => [...prev, { id, title, subtitle, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4200);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (gig: Gig) => {
    if (cart.some((item) => item.id === gig.id)) {
      addToast('Already in Gig Cart', `${gig.pickup.city} → ${gig.dropoff.city}`, 'info');
      return;
    }
    const newCartItem: CartGig = { ...gig, addedAt: Date.now() };
    setCart((prev) => [...prev, newCartItem]);
    addToast(
      `Added to Gig Cart ✓`,
      `${gig.pickup.city} → ${gig.dropoff.city} · $${gig.pay.toLocaleString()}`,
      'success'
    );
  };

  const removeFromCart = (gigId: string) => {
    const item = cart.find((i) => i.id === gigId);
    setCart((prev) => prev.filter((i) => i.id !== gigId));
    if (item) {
      addToast('Removed from Cart', `${item.pickup.city} → ${item.dropoff.city}`, 'info');
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const isInCart = (gigId: string) => {
    return cart.some((i) => i.id === gigId);
  };

  const toggleSaveGig = (gigId: string) => {
    setSavedGigs((prev) => {
      const exists = prev.includes(gigId);
      if (exists) {
        addToast('Removed from Saved Gigs', undefined, 'info');
        return prev.filter((id) => id !== gigId);
      } else {
        addToast('Saved to My Gigs', undefined, 'success');
        return [...prev, gigId];
      }
    });
  };

  const isSaved = (gigId: string) => {
    return savedGigs.includes(gigId);
  };

  // Schedule conflict detection: two gigs on same date
  const dateCounts: Record<string, number> = {};
  cart.forEach((g) => {
    dateCounts[g.date] = (dateCounts[g.date] || 0) + 1;
  });
  const conflictingDates = Object.keys(dateCounts).filter((date) => dateCounts[date] > 1);
  const hasScheduleConflict = conflictingDates.length > 0;

  const cartTotalEarnings = cart.reduce((acc, curr) => acc + curr.pay, 0);
  const cartTotalMiles = cart.reduce((acc, curr) => acc + curr.miles, 0);

  const submitCartApplications = async (_notes?: string) => {
    // Unique carriers count
    const uniqueCarriers = new Set(cart.map((g) => g.company.name));
    const carrierCount = uniqueCarriers.size;
    const gigCount = cart.length;

    // Trigger subtle confetti burst
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#FFB547', '#FF7A1A', '#2DD4BF', '#3B82F6', '#22C55E']
      });
    } catch {
      // Ignore if confetti fails
    }

    setLastSubmissionMeta({ carrierCount, gigCount });
    setIsSubmittedSuccessModalOpen(true);
    setCart([]);
    setIsCartOpen(false);

    return { carrierCount, gigCount };
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
        cartTotalEarnings,
        cartTotalMiles,
        hasScheduleConflict,
        conflictingDates,
        savedGigs,
        toggleSaveGig,
        isSaved,
        isCartOpen,
        setIsCartOpen,
        toasts,
        addToast,
        removeToast,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authRole,
        setAuthRole,
        submitCartApplications,
        isSubmittedSuccessModalOpen,
        setIsSubmittedSuccessModalOpen,
        lastSubmissionMeta
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
