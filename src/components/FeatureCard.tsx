'use client';

import { forwardRef } from 'react';
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
    return (
      <div
        ref={ref}
        className="feature-card text-center p-1 rounded-xl relative transition-all duration-300 Bordered Service Cards"
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
        
        <div className="relative flex flex-col items-center justify-between p-6 gap-4 overflow-hidden rounded-lg border-[0.75px] bg-neutral-900 shadow-sm">
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
