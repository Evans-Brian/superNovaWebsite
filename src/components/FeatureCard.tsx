'use client';

import { forwardRef, useState, useEffect } from 'react';
import { GlowingEffect } from '../../components/ui/glowing-effect';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const FeatureCard = forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ icon, title, description, onMouseEnter, onMouseLeave }, ref) => {
  // State to store parent section's cards heights
  const [sectionCardsHeight, setSectionCardsHeight] = useState<number | null>(null);
  
  // Find all cards in the same section and equalize heights
  useEffect(() => {
    const equalizeCardHeights = () => {
      if (ref && 'current' in ref && ref.current) {
        // Find the parent section element (usually a div with grid class)
        const parentSection = ref.current.closest('.grid') || ref.current.parentElement;
        
        if (parentSection) {
          // Find all cards with the same data-card-type in this section
          const sameTypeCards = parentSection.querySelectorAll('[data-card-type="Bordered Service Cards"]');
          
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
    
    // Initial height equalization
    equalizeCardHeights();
    
    // Update on resize
    const handleResize = () => {
      // Reset height to auto before recalculating
      setSectionCardsHeight(null);
      setTimeout(equalizeCardHeights, 100); // Small delay to ensure DOM updates
    };
    
    window.addEventListener('resize', handleResize);
    // Trigger height equalization after content is fully loaded
    window.addEventListener('load', equalizeCardHeights);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', equalizeCardHeights);
    };
  }, [ref]);
  
  return (
    <div 
      ref={ref}
      className="relative p-1 rounded-xl Bordered Service Cards"
      style={{ height: sectionCardsHeight ? `${sectionCardsHeight}px` : '100%' }}
      data-card-type="Bordered Service Cards"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
        
        <div className="relative flex flex-col items-center justify-between p-6 gap-4 overflow-hidden rounded-lg border-[0.75px] shadow-md card-content-container" 
             style={{ 
               backgroundColor: '#111827', // Dark background from DarkSpaceBackground
               backgroundImage: `
                 radial-gradient(circle at 40% 40%, rgba(102, 57, 218, 0.3), transparent 60%),
                 radial-gradient(circle at 60% 60%, rgba(66, 153, 225, 0.2), transparent 50%),
                 radial-gradient(circle at 2px 2px, rgba(102, 57, 218, 0.1) 2px, transparent 0px)
               `,
               backgroundSize: '100% 100%, 100% 100%, 20px 20px'
             }}>
          <div className="icon-container flex items-center justify-center w-16 h-16 rounded-full text-white mb-2" style={{ backgroundColor: 'rgb(102, 57, 218)' }}>
            {/* Orbit particles that appear on hover */}
            <div className="orbit-particle" style={{ top: '2px', left: '50%' }}></div>
            <div className="orbit-particle" style={{ bottom: '2px', left: '50%' }}></div>
            <div className="orbit-particle" style={{ left: '2px', top: '50%' }}></div>
            <div className="orbit-particle" style={{ right: '2px', top: '50%' }}></div>
            
            {icon}
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <p className="text-gray-300">
              {description}
            </p>
          </div>
        </div>
      </div>
    );
  }
);

FeatureCard.displayName = 'FeatureCard';

export default FeatureCard;
