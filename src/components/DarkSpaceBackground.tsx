'use client';

import { useEffect, useRef } from 'react';
import BorderGlow from './ui/BorderGlow';

interface DarkSpaceBackgroundProps {
  children: React.ReactNode;
  className?: string;
  meteorEffect?: boolean;
}

export default function DarkSpaceBackground({ 
  children, 
  className = '',
  meteorEffect = false
}: DarkSpaceBackgroundProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Add subtle background animation
  useEffect(() => {
    const section = sectionRef.current;
    if (section) {
      let angle = 0;
      const animate = () => {
        angle = (angle + 0.05) % 360;
        if (section) {
          section.style.backgroundPosition = 
            `0% 0%, 0% 0%, ${Math.sin(angle * 0.01) * 10}px ${Math.cos(angle * 0.01) * 10}px`;
        }
        requestAnimationFrame(animate);
      };
      const animationId = requestAnimationFrame(animate);
      
      return () => cancelAnimationFrame(animationId);
    }
  }, []);

  return (
    <div 
      ref={sectionRef}
      className={`relative ${className}`}
      style={{
        backgroundColor: '#111827', // Dark background
        backgroundImage: `
          radial-gradient(circle at 30% 40%, rgba(102, 57, 218, 0.3), transparent 70%),
          radial-gradient(circle at 70% 60%, rgba(66, 153, 225, 0.2), transparent 60%),
          radial-gradient(circle at 2px 2px, rgba(102, 57, 218, 0.1) 2px, transparent 0px)
        `,
        backgroundSize: '100% 100%, 100% 100%, 20px 20px'
      }}
    >
      {/* Decorative space elements */}
      <div className="absolute top-10 left-10 w-24 h-24 rounded-full opacity-40" 
           style={{ 
             background: 'radial-gradient(circle, rgba(102, 57, 218, 0.8) 0%, rgba(102, 57, 218, 0) 70%)',
             filter: 'blur(8px)'
           }} 
      />
      <div className="absolute bottom-20 right-20 w-32 h-32 rounded-full opacity-30" 
           style={{ 
             background: 'radial-gradient(circle, rgba(66, 153, 225, 0.9) 0%, rgba(66, 153, 225, 0) 70%)',
             filter: 'blur(10px)'
           }} 
      />
      <div className="absolute top-40 right-40 w-16 h-16 rounded-full opacity-35" 
           style={{ 
             background: 'radial-gradient(circle, rgba(236, 72, 153, 0.7) 0%, rgba(236, 72, 153, 0) 70%)',
             filter: 'blur(6px)'
           }} 
      />
      
      {/* Top border glow */}
      <BorderGlow position="top" />
      
      {/* Bottom border glow */}
      <BorderGlow position="bottom" />
      
      {children}
    </div>
  );
}
