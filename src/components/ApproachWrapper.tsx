'use client';

import React, { useRef, useState } from 'react';
import ConstellationNetwork from './ConstellationNetwork';

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
        className="bg-gray-800 p-6 rounded-lg shadow-md"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {children}
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
  const cardRefs = childrenArray.map(() => useRef<HTMLDivElement>(null));
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  
  return (
    <div className="relative">
      {/* Constellation network overlay */}
      <ConstellationNetwork cardRefs={cardRefs} activeCardIndex={activeCardIndex} />
      
      {/* Approach steps grid */}
      <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-8 relative z-20`}>
        {childrenArray.map((child, index) => (
          <ApproachStepWrapper
            key={index}
            ref={cardRefs[index]}
            onMouseEnter={() => setActiveCardIndex(index)}
            onMouseLeave={() => setActiveCardIndex(null)}
          >
            {child}
          </ApproachStepWrapper>
        ))}
      </div>
    </div>
  );
}
