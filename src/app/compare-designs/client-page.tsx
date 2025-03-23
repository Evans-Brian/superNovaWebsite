'use client';

import dynamic from 'next/dynamic';

// Use Next.js dynamic import with SSR disabled for the complex components
const CompareDesigns = dynamic(() => import('@/components/CompareDesigns'), {
  ssr: false, // Disable server-side rendering for this component
  loading: () => (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-white text-xl">Loading comparison tool...</div>
    </div>
  )
});

export default function ComparePage() {
  return <CompareDesigns />;
}
