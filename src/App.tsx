import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { AppProvider } from './context/AppContext.tsx';
import { PageLoader } from './components/PageLoader.tsx';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { CartDrawer } from './components/CartDrawer.tsx';
import { AuthModal } from './components/AuthModal.tsx';
import { SuccessModal } from './components/SuccessModal.tsx';
import { ToastContainer } from './components/ToastContainer.tsx';
import { BackToTop } from './components/BackToTop.tsx';

// Pages
import { HomePage } from './pages/HomePage.tsx';
import { FindGigsPage } from './pages/FindGigsPage.tsx';
import { GigDetailPage } from './pages/GigDetailPage.tsx';
import { PostGigPage } from './pages/PostGigPage.tsx';
import { CarriersPage } from './pages/CarriersPage.tsx';
import { DriverProfilePage } from './pages/DriverProfilePage.tsx';
import { NotFoundPage } from './pages/NotFoundPage.tsx';

// Scroll to top upon route change
const ScrollToTop: React.FC = () => {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, search, hash]);

  return null;
};

// Route wrapper with quick fade + 12px slide transition
const AnimatedRouteWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <PageLoader />

        <div className="flex flex-col min-h-screen bg-[#0B1220] text-[#F5F7FA]">
          <Navbar />

          <main className="flex-1">
            <AnimatePresence mode="wait">
              <Routes>
                <Route
                  path="/"
                  element={
                    <AnimatedRouteWrapper>
                      <HomePage />
                    </AnimatedRouteWrapper>
                  }
                />
                <Route
                  path="/gigs"
                  element={
                    <AnimatedRouteWrapper>
                      <FindGigsPage />
                    </AnimatedRouteWrapper>
                  }
                />
                <Route
                  path="/gigs/:id"
                  element={
                    <AnimatedRouteWrapper>
                      <GigDetailPage />
                    </AnimatedRouteWrapper>
                  }
                />
                <Route
                  path="/post"
                  element={
                    <AnimatedRouteWrapper>
                      <PostGigPage />
                    </AnimatedRouteWrapper>
                  }
                />
                <Route
                  path="/carriers"
                  element={
                    <AnimatedRouteWrapper>
                      <CarriersPage />
                    </AnimatedRouteWrapper>
                  }
                />
                <Route
                  path="/drivers/:id"
                  element={
                    <AnimatedRouteWrapper>
                      <DriverProfilePage />
                    </AnimatedRouteWrapper>
                  }
                />
                <Route
                  path="*"
                  element={
                    <AnimatedRouteWrapper>
                      <NotFoundPage />
                    </AnimatedRouteWrapper>
                  }
                />
              </Routes>
            </AnimatePresence>
          </main>

          <Footer />

          {/* Interactive Modals & Drawers */}
          <CartDrawer />
          <AuthModal />
          <SuccessModal />
          <ToastContainer />
          <BackToTop />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
