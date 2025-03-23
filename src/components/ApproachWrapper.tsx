'use client';

import React, { useState } from 'react';
import { GlowingEffect } from '../../components/ui/glowing-effect';

interface ApproachStepWrapperProps {
  ref: React.RefObject<HTMLDivElement>;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  children: React.ReactNode;
}

// A wrapper component that attaches ref and mouse events
const ApproachStepWrapper = React.forwardRef<HTMLDivElement, ApproachStepWrapperProps>(
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
        <div className="relative p-6 gap-4 overflow-hidden rounded-lg border-[0.75px] bg-gray-800 shadow-sm">
          {children}
        </div>
      </div>
    );
  }
);

ApproachStepWrapper.displayName = 'ApproachStepWrapper';

interface ApproachWrapperProps {
  children: React.ReactNode;
  columns?: number;
}

export default function ApproachWrapper({ children, columns = 3 }: ApproachWrapperProps) {
  const childrenArray = React.Children.toArray(children);
  
  // Create refs array using useMemo to avoid React Hook violations
  const cardRefs = React.useMemo(() => {
    return Array(childrenArray.length).fill(null).map(() => React.createRef<HTMLDivElement>());
  }, [childrenArray.length]);
  
  return (
    <div className="relative">
      {/* Approach steps grid */}
      <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-8 relative z-20`}>
        {childrenArray.map((child, index) => (
          <ApproachStepWrapper
            key={index}
            ref={cardRefs[index]}
            onMouseEnter={() => {}}
            onMouseLeave={() => {}}
          >
            {child}
          </ApproachStepWrapper>
        ))}
      </div>
    </div>
  );
}
