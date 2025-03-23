'use client';

import React, { useRef, useState } from 'react';
import ConstellationNetwork from './ConstellationNetwork';
import { GlowingEffect } from '../../components/ui/glowing-effect';

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
        className="p-1 rounded-xl relative Bordered Service Cards"
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
