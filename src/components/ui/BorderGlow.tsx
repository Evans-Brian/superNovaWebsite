'use client';

interface BorderGlowProps {
  position: 'top' | 'bottom';
  zIndex?: number;
}

/**
 * BorderGlow - A simple component that renders a pulsing glowing border
 * at the top or bottom of a container.
 * 
 * @param {BorderGlowProps} props - Component props
 * @returns React Component
 */
export default function BorderGlow({ position, zIndex = 5 }: BorderGlowProps) {
  const isTop = position === 'top';
  
  return (
    <div 
      className={`absolute ${isTop ? 'top-0' : 'bottom-0'} left-0 right-0 h-0 pointer-events-none`}
      style={{
        animation: 'borderGlowPulse 6s infinite',
        zIndex,
        boxShadow: isTop 
          ? '0 0.8px 4px 0.8px rgba(102, 57, 218, 0.5)' 
          : '0 -0.8px 4px 0.8px rgba(102, 57, 218, 0.5)'
      }}
    />
  );
} 