'use client';

import React, { useRef } from 'react';
import { GlowingEffect } from '../../components/ui/glowing-effect';

interface CardWrapperProps {
  className?: string;
  ref: React.RefObject<HTMLDivElement>;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  children: React.ReactNode;
}

// A wrapper component that attaches ref and mouse events
const CardWrapper = React.forwardRef<HTMLDivElement, CardWrapperProps>(
  ({ className, onMouseEnter, onMouseLeave, children }, ref) => {
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
        <div className={`relative flex flex-col p-6 gap-4 overflow-hidden rounded-lg border-[0.75px] bg-gray-900 shadow-sm ${className}`}>
          {children}
        </div>
      </div>
    );
  }
);

CardWrapper.displayName = 'CardWrapper';

interface KeyFeaturesWrapperProps {
  children: React.ReactNode;
  columns?: number;
}

export default function KeyFeaturesWrapper({ children, columns = 3 }: KeyFeaturesWrapperProps) {
  const childrenArray = React.Children.toArray(children);
  const cardRefs = childrenArray.map(() => useRef<HTMLDivElement>(null));
  
  return (
    <div className="relative">
      {/* Feature cards grid */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-8 relative z-20`}>
        {childrenArray.map((child, index) => (
          <CardWrapper
            key={index}
            ref={cardRefs[index]}
            onMouseEnter={() => {}}
            onMouseLeave={() => {}}
          >
            {child}
          </CardWrapper>
        ))}
      </div>
    </div>
  );
}
