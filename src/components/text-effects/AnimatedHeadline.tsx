'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import with SSR disabled to prevent hydration errors
const HolographicProjectionText = dynamic(
  () => import('./HolographicProjectionText').then(mod => ({ default: mod.HolographicProjectionText })),
  { ssr: false }
);

interface AnimatedHeadlineProps {
  text: string;
}

export function AnimatedHeadline({ text }: AnimatedHeadlineProps) {
  return (
    <Suspense fallback={<span className="text-gray-300 opacity-70">Loading...</span>}>
      <HolographicProjectionText>
        {text}
      </HolographicProjectionText>
    </Suspense>
  );
}
