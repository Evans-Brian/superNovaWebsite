'use client';

import React, { useRef, useState } from 'react';
import ConstellationNetwork from './ConstellationNetwork';

interface BenefitWrapperProps {
  ref: React.RefObject<HTMLDivElement>;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  children: React.ReactNode;
}

// A wrapper component that attaches ref and mouse events
const BenefitWrapper = React.forwardRef<HTMLDivElement, BenefitWrapperProps>(
  ({ onMouseEnter, onMouseLeave, children }, ref) => {
    return (
      <div 
        ref={ref}
        className="p-1 rounded-xl relative Constellation Effect"
        data-card-type="Constellation Effect"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {/* No GlowingEffect for Constellation Effect, only constellation network */}
        <div className="relative flex items-start p-4 gap-4 overflow-hidden rounded-lg border-[0.75px] bg-gray-900 shadow-sm">
          {children}
        </div>
      </div>
    );
  }
);

BenefitWrapper.displayName = 'BenefitWrapper';

interface BenefitsWrapperProps {
  children: React.ReactNode;
  columns?: number;
}

export default function BenefitsWrapper({ children, columns = 2 }: BenefitsWrapperProps) {
  const childrenArray = React.Children.toArray(children);
  const cardRefs = childrenArray.map(() => useRef<HTMLDivElement>(null));
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  
  return (
    <div className="relative">
      {/* Constellation network overlay */}
      <ConstellationNetwork cardRefs={cardRefs} activeCardIndex={activeCardIndex} />
      
      {/* Benefits grid */}
      <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-8 relative z-20`}>
        {childrenArray.map((child, index) => (
          <BenefitWrapper
            key={index}
            ref={cardRefs[index]}
            onMouseEnter={() => setActiveCardIndex(index)}
            onMouseLeave={() => setActiveCardIndex(null)}
          >
            {child}
          </BenefitWrapper>
        ))}
      </div>
    </div>
  );
}
