'use client';

import { forwardRef } from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const FeatureCard = forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ icon, title, description, onMouseEnter, onMouseLeave }, ref) => {
    return (
      <div
        ref={ref}
        className="feature-card text-center p-6 rounded-lg transition-all duration-300 bg-neutral-900"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="icon-container flex items-center justify-center w-16 h-16 mx-auto rounded-full text-white mb-4" style={{ backgroundColor: 'rgb(102, 57, 218)' }}>
          {/* Orbit particles that appear on hover */}
          <div className="orbit-particle" style={{ top: '2px', left: '50%' }}></div>
          <div className="orbit-particle" style={{ bottom: '2px', left: '50%' }}></div>
          <div className="orbit-particle" style={{ left: '2px', top: '50%' }}></div>
          <div className="orbit-particle" style={{ right: '2px', top: '50%' }}></div>
          
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-300">
          {description}
        </p>
      </div>
    );
  }
);

FeatureCard.displayName = 'FeatureCard';

export default FeatureCard;
