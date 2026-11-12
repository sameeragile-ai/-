import React from 'react';

interface CarrierBadgeProps {
  initials: string;
  gradient?: [string, string];
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const CarrierBadge: React.FC<CarrierBadgeProps> = ({
  initials,
  gradient = ['#FF7A1A', '#E5481F'],
  size = 'md',
  className = ''
}) => {
  const sizeMap = {
    sm: 'w-7 h-7 text-xs rounded-md',
    md: 'w-10 h-10 text-sm rounded-lg',
    lg: 'w-13 h-13 text-base rounded-xl',
    xl: 'w-16 h-16 text-xl rounded-2xl'
  };

  const [from, to] = gradient;

  return (
    <div
      className={`inline-flex items-center justify-center font-display font-bold text-white shadow-sm shrink-0 border border-white/20 select-none ${sizeMap[size]} ${className}`}
      style={{
        background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`
      }}
      aria-hidden="true"
    >
      <span>{initials.slice(0, 2).toUpperCase()}</span>
    </div>
  );
};
