'use client';

import { useRef, useEffect } from 'react';
import FeatureCard from './FeatureCard';

export default function FeatureCardGrid() {
  // Create refs for each feature card
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);
  
  // Create a shared ref for the grid
  const gridRef = useRef<HTMLDivElement>(null);

  // Function to equalize card heights
  const equalizeCardHeights = () => {
    if (gridRef.current) {
      // Get all FeatureCard elements within the grid
      const cards = gridRef.current.querySelectorAll('[data-card-type="Bordered Service Cards"]');
      
      // If we found cards, equalize their heights
      if (cards.length > 0) {
        let maxHeight = 0;
        
        // First, reset all heights to auto to get their natural heights
        cards.forEach((card) => {
          const cardElement = card as HTMLElement;
          cardElement.style.height = 'auto';
          
          // Calculate the content height
          const contentContainer = cardElement.querySelector('.card-content-container') as HTMLElement;
          if (contentContainer) {
            const height = contentContainer.getBoundingClientRect().height;
            maxHeight = Math.max(maxHeight, height);
          }
        });
        
        // Then set the content container height for all cards
        if (maxHeight > 0) {
          cards.forEach((card) => {
            const contentContainer = card.querySelector('.card-content-container') as HTMLElement;
            if (contentContainer) {
              contentContainer.style.height = `${maxHeight}px`;
            }
          });
        }
      }
    }
  };
  
  // Use useEffect to equalize heights after render and on resize
  useEffect(() => {
    // Ensure this code only runs on the client side, not during server-side rendering
    if (typeof window === 'undefined') return;
    
    // Initial equalization
    equalizeCardHeights();
    
    // Re-equalize on window resize
    const handleResize = () => {
      // Reset heights first
      if (gridRef.current) {
        const contentContainers = gridRef.current.querySelectorAll('.card-content-container');
        contentContainers.forEach((container) => {
          (container as HTMLElement).style.height = 'auto';
        });
      }
      
      // Small delay to ensure DOM updates
      setTimeout(equalizeCardHeights, 100);
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('load', equalizeCardHeights);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', equalizeCardHeights);
    };
  }, []);
  
  return (
    <div className="relative">
      {/* Feature cards grid with equal height rows */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-20">
        <FeatureCard
          ref={card1Ref}
          onMouseEnter={() => {}}
          onMouseLeave={() => {}}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          }
          title="Innovative Solutions"
          description="We stay at the forefront of technology to deliver cutting-edge automation solutions."
        />
        
        <FeatureCard
          ref={card2Ref}
          onMouseEnter={() => {}}
          onMouseLeave={() => {}}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
          title="Expert Team"
          description="We bring years of experience in automation and engineering."
        />
        
        <FeatureCard
          ref={card3Ref}
          onMouseEnter={() => {}}
          onMouseLeave={() => {}}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          }
          title="Secure & Reliable"
          description="We prioritize security and reliability in every solution we deliver."
        />
        
        <FeatureCard
          ref={card4Ref}
          onMouseEnter={() => {}}
          onMouseLeave={() => {}}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          }
          title="Fast Implementation"
          description="We deliver solutions quickly and efficiently to minimize disruption to your business."
        />
      </div>
    </div>
  );
}
