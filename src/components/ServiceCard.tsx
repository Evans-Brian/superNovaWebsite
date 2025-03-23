'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  link: string;
  type?: "Our Services Service Cards" | "Bordered Service Cards" | "Other Service Cards";
}

export default function ServiceCard({ title, description, icon, link, type = "Other Service Cards" }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glowIntensity, setGlowIntensity] = useState(0);
  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });
  
  // State to store parent section's cards heights
  const [sectionCardsHeight, setSectionCardsHeight] = useState<number | null>(null);
  
  // Update card position on mount and window resize and equalize card heights
  useEffect(() => {
    // Ensure this code only runs on the client side, not during server-side rendering
    if (typeof window === 'undefined') return;
    
    const updateCardPosition = () => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        setCardPosition({
          x: rect.left,
          y: rect.top,
          width: rect.width,
          height: rect.height
        });
      }
    };
    
    // Find all cards in the same section with the same type
    const equalizeCardHeights = () => {
      if (cardRef.current) {
        // Find the parent section element (usually a div with grid class)
        let parentSection = cardRef.current.closest('.grid') || cardRef.current.parentElement;
        
        if (parentSection) {
          // Find all cards with the same type in this section
          const sameTypeCards = parentSection.querySelectorAll(`[data-card-type="${type}"]`);
          
          if (sameTypeCards.length > 1) {
            // Find the maximum natural height of all cards
            let maxHeight = 0;
            
            sameTypeCards.forEach((card) => {
              // Temporarily remove fixed height to measure natural height
              const cardElement = card as HTMLElement;
              const originalHeight = cardElement.style.height;
              cardElement.style.height = 'auto';
              
              const height = cardElement.getBoundingClientRect().height;
              maxHeight = Math.max(maxHeight, height);
              
              // Restore original height
              cardElement.style.height = originalHeight;
            });
            
            // Set all cards to the maximum height
            if (maxHeight > 0) {
              setSectionCardsHeight(maxHeight);
            }
          }
        }
      }
    };
    
    // Initial position and height equalization
    updateCardPosition();
    equalizeCardHeights();
    
    // Update on resize
    window.addEventListener('resize', () => {
      updateCardPosition();
      // Reset height to auto before recalculating
      setSectionCardsHeight(null);
      setTimeout(equalizeCardHeights, 100); // Small delay to ensure DOM updates
    });
    window.addEventListener('scroll', updateCardPosition);
    
    // Trigger height equalization after content is fully loaded
    window.addEventListener('load', equalizeCardHeights);
    
    return () => {
      window.removeEventListener('resize', updateCardPosition);
      window.removeEventListener('scroll', updateCardPosition);
      window.removeEventListener('load', equalizeCardHeights);
    };
  }, [type]);
  
  // Track mouse position and calculate glow intensity
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cardRef.current) {
        // Calculate distance from mouse to card
        const dx = Math.max(cardPosition.x - e.clientX, 0, e.clientX - (cardPosition.x + cardPosition.width));
        const dy = Math.max(cardPosition.y - e.clientY, 0, e.clientY - (cardPosition.y + cardPosition.height));
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Maximum distance for glow effect (in pixels)
        const maxDistance = 200;
        
        // Calculate intensity (1 when mouse is on card, 0 when distance >= maxDistance)
        const intensity = Math.max(0, 1 - distance / maxDistance);
        setGlowIntensity(intensity);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cardPosition]);
  
  // Calculate glow effect based on intensity
  // Use a gradient of colors for a more vibrant effect (purple to blue)
  const glowColors = {
    primary: `rgba(102, 57, 218, ${glowIntensity * 0.8})`,  // Purple
    secondary: `rgba(66, 153, 225, ${glowIntensity * 0.5})`, // Blue
    tertiary: `rgba(236, 72, 153, ${glowIntensity * 0.3})`,  // Pink
  };
  
  const glowSize = `${Math.max(5, glowIntensity * 15)}px`;
  
  // Calculate a subtle animation speed based on proximity
  // Closer = faster animation
  const animationDuration = Math.max(2, 8 - glowIntensity * 6); // Between 2-8s
  
  return (
    <Link 
      href={link}
      className="block h-full"
    >
      <div 
        ref={cardRef}
        className={`bg-neutral-950 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:transform hover:scale-105 relative cursor-pointer ${type}`}
        style={{
          height: sectionCardsHeight ? `${sectionCardsHeight}px` : '100%',
          boxShadow: `0 0 ${glowSize} ${glowIntensity > 0.05 ? glowColors.primary : 'transparent'}`,
          borderColor: glowColors.primary,
          borderWidth: '1px',
          borderStyle: 'solid'
        }}
        data-card-type={type}
      >
        {/* Glow overlay - creates an additional inner glow effect */}
        <div 
          className="absolute inset-0 rounded-lg pointer-events-none"
          style={{
            background: `linear-gradient(135deg, transparent 0%, ${glowColors.secondary} 50%, ${glowColors.tertiary} 100%)`,
            opacity: glowIntensity * 0.15,
            mixBlendMode: 'overlay',
            animation: glowIntensity > 0.1 ? `pulse ${animationDuration}s ease-in-out infinite alternate` : 'none'
          }}
        />
        
        {/* Corner accents that light up based on proximity */}
        <div className="absolute w-4 h-4 top-0 left-0 pointer-events-none">
          <div 
            className="absolute w-full h-[1px] transition-all duration-300" 
            style={{ 
              background: `linear-gradient(to right, ${glowColors.primary}, transparent)`,
              opacity: glowIntensity, 
              boxShadow: `0 0 8px ${glowColors.primary}`,
              width: `${Math.min(100, 20 + glowIntensity * 80)}%` 
            }}
          />
          <div 
            className="absolute h-full w-[1px] transition-all duration-300" 
            style={{ 
              background: `linear-gradient(to bottom, ${glowColors.primary}, transparent)`,
              opacity: glowIntensity, 
              boxShadow: `0 0 8px ${glowColors.primary}`,
              height: `${Math.min(100, 20 + glowIntensity * 80)}%` 
            }}
          />
        </div>
        
        <div className="absolute w-4 h-4 top-0 right-0 pointer-events-none">
          <div 
            className="absolute w-full h-[1px] right-0 transition-all duration-300" 
            style={{ 
              background: `linear-gradient(to left, ${glowColors.primary}, transparent)`,
              opacity: glowIntensity, 
              boxShadow: `0 0 8px ${glowColors.primary}`,
              width: `${Math.min(100, 20 + glowIntensity * 80)}%` 
            }}
          />
          <div 
            className="absolute h-full w-[1px] right-0 transition-all duration-300" 
            style={{ 
              background: `linear-gradient(to bottom, ${glowColors.primary}, transparent)`,
              opacity: glowIntensity, 
              boxShadow: `0 0 8px ${glowColors.primary}`,
              height: `${Math.min(100, 20 + glowIntensity * 80)}%` 
            }}
          />
        </div>
        
        <div className="absolute w-4 h-4 bottom-0 left-0 pointer-events-none">
          <div 
            className="absolute w-full h-[1px] bottom-0 transition-all duration-300" 
            style={{ 
              background: `linear-gradient(to right, ${glowColors.primary}, transparent)`,
              opacity: glowIntensity, 
              boxShadow: `0 0 8px ${glowColors.primary}`,
              width: `${Math.min(100, 20 + glowIntensity * 80)}%` 
            }}
          />
          <div 
            className="absolute h-full w-[1px] bottom-0 transition-all duration-300" 
            style={{ 
              background: `linear-gradient(to top, ${glowColors.primary}, transparent)`,
              opacity: glowIntensity, 
              boxShadow: `0 0 8px ${glowColors.primary}`,
              height: `${Math.min(100, 20 + glowIntensity * 80)}%` 
            }}
          />
        </div>
        
        <div className="absolute w-4 h-4 bottom-0 right-0 pointer-events-none">
          <div 
            className="absolute w-full h-[1px] right-0 bottom-0 transition-all duration-300" 
            style={{ 
              background: `linear-gradient(to left, ${glowColors.primary}, transparent)`,
              opacity: glowIntensity, 
              boxShadow: `0 0 8px ${glowColors.primary}`,
              width: `${Math.min(100, 20 + glowIntensity * 80)}%` 
            }}
          />
          <div 
            className="absolute h-full w-[1px] right-0 bottom-0 transition-all duration-300" 
            style={{ 
              background: `linear-gradient(to top, ${glowColors.primary}, transparent)`,
              opacity: glowIntensity, 
              boxShadow: `0 0 8px ${glowColors.primary}`,
              height: `${Math.min(100, 20 + glowIntensity * 80)}%` 
            }}
          />
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-md text-white mb-4" style={{ backgroundColor: 'rgb(102, 57, 218)' }}>
            {icon === 'voice' && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            )}
            {icon === 'process' && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            )}
            {icon === 'integration' && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
              </svg>
            )}
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
          <p className="text-gray-300">{description}</p>
        </div>
      </div>
    </Link>
  );
}
