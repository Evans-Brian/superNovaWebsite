'use client';

import { useState, useRef, useEffect } from 'react';

interface VideoCardProps {
  title: string;
  videoId: string;
  description?: string;
}

export default function VideoCard({ title, videoId, description }: VideoCardProps) {
  const [showCallModal, setShowCallModal] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Load YouTube API and handle iframe initialization
  useEffect(() => {
    // Create a unique ID for this iframe
    const frameId = `youtube-player-${videoId}`;
    if (iframeRef.current) {
      iframeRef.current.id = frameId;
    }

    // Function to handle messages from the YouTube iframe
    const handleMessage = (event: MessageEvent) => {
      // Only process messages from YouTube
      if (event.origin !== 'https://www.youtube.com') return;
      
      // Process YouTube iframe API events if needed
      if (event.data && typeof event.data === 'object' && event.data.event) {
        // Handle specific YouTube events if needed
        console.log('YouTube event:', event.data.event);
      }
    };

    // Add message listener for YouTube iframe API
    window.addEventListener('message', handleMessage);

    // Cleanup function
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [videoId]);

  const handleCallNow = () => {
    setShowCallModal(true);
    // In a real implementation, this would initialize Twilio or WebRTC
  };

  // This prevents click events from bubbling up from the iframe
  const handleIframeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div 
        className="relative" 
        style={{ height: '450px' }}
        onClick={handleIframeClick}
      >
        <iframe
          ref={iframeRef}
          src={`https://www.youtube.com/embed/${videoId}?rel=0&enablejsapi=1&autoplay=0&playsinline=1&origin=${encodeURIComponent(window.location.origin)}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          title={`YouTube video: ${title}`}
          className="w-full h-full"
        ></iframe>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
        {description && (
          <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        )}
        <button
          onClick={handleCallNow}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out"
        >
          Call Now
        </button>
      </div>

      {/* Call Modal */}
      {showCallModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Connect with an Agent</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              In a real implementation, this would connect you with an agent using Twilio or WebRTC.
            </p>
            <div className="flex justify-between">
              <button
                onClick={() => setShowCallModal(false)}
                className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out"
              >
                Cancel
              </button>
              <button
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out"
              >
                Start Call
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
