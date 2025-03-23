'use client';

import { useState } from 'react';
import ErrorBoundary from './ErrorBoundary';
import ServiceCard from './ServiceCard';
import NebulaDepthCard from './NebulaDepthCard';

// Fallback component in case any of the card components fail
const FallbackCard = ({ title, description, icon, link }: any) => (
  <div className="p-6 h-full bg-gray-800 rounded-lg border border-purple-500">
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
    <p className="mt-4 text-purple-400">Component failed to load</p>
  </div>
);

// Create simplified versions of the complex cards for debugging
const SimpleCosmicPortalCard = ({ title, description, icon, link }: any) => (
  <div className="p-6 h-full bg-gray-800 rounded-lg border border-pink-500">
    <div className="flex items-center justify-center w-12 h-12 rounded-md text-white mb-4 relative bg-purple-600">
      {icon === 'voice' && 'V'}
      {icon === 'process' && 'P'}
      {icon === 'integration' && 'I'}
    </div>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
    <p className="mt-4 text-pink-400">Cosmic Portal Card (Simple Version)</p>
  </div>
);

const SimpleLifecycleCard = ({ title, description, icon, link }: any) => (
  <div className="p-6 h-full bg-gray-800 rounded-lg border border-yellow-500">
    <div className="flex items-center justify-center w-12 h-12 rounded-md text-white mb-4 relative bg-yellow-600">
      {icon === 'voice' && 'V'}
      {icon === 'process' && 'P'}
      {icon === 'integration' && 'I'}
    </div>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
    <p className="mt-4 text-yellow-400">Stellar Lifecycle Card (Simple Version)</p>
  </div>
);

export default function CompareDesigns() {
  const [activeDesign, setActiveDesign] = useState<string>('all');
  
  const serviceData = [
    {
      title: "Voice Agent Solutions", 
      description: "Implement cutting-edge voice recognition and natural language processing to enhance customer interactions and automate voice-driven processes.",
      icon: "voice",
      link: "/services/voice-ai"
    },
    {
      title: "Process Automations", 
      description: "Streamline your business operations with intelligent workflow automation that reduces manual tasks and improves efficiency.",
      icon: "process",
      link: "/services/process-automations"
    },
    {
      title: "Custom Integrations", 
      description: "Connect your existing systems and software with seamless integrations tailored to your specific business requirements.",
      icon: "integration",
      link: "/services/custom-integrations"
    }
  ];
  
  return (
    <div className="min-h-screen bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Card Design Comparison</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Compare three different card designs for the service section of the SuperNova Automations website.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button 
              onClick={() => setActiveDesign('all')}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeDesign === 'all' 
                  ? 'bg-purple-700 text-white' 
                  : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
              }`}
            >
              Show All
            </button>
            <button 
              onClick={() => setActiveDesign('original')}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeDesign === 'original' 
                  ? 'bg-purple-700 text-white' 
                  : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
              }`}
            >
              Original Design
            </button>
            <button 
              onClick={() => setActiveDesign('nebula')}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeDesign === 'nebula' 
                  ? 'bg-purple-700 text-white' 
                  : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
              }`}
            >
              Nebula Depth Cards
            </button>
            <button 
              onClick={() => setActiveDesign('cosmic')}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeDesign === 'cosmic' 
                  ? 'bg-purple-700 text-white' 
                  : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
              }`}
            >
              Cosmic Portal Cards
            </button>
            <button 
              onClick={() => setActiveDesign('stellar')}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeDesign === 'stellar' 
                  ? 'bg-purple-700 text-white' 
                  : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
              }`}
            >
              Stellar Lifecycle Cards
            </button>
          </div>
        </div>
        
        {/* Original Design */}
        {(activeDesign === 'all' || activeDesign === 'original') && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Original Design</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {serviceData.map((service, index) => (
                <ServiceCard 
                  key={`original-${index}`}
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  link={service.link}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Nebula Depth Cards */}
        {(activeDesign === 'all' || activeDesign === 'nebula') && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Nebula Depth Cards</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {serviceData.map((service, index) => (
                <ErrorBoundary key={`nebula-${index}`} fallback={<FallbackCard {...service} />}>
                  <NebulaDepthCard 
                    title={service.title}
                    description={service.description}
                    icon={service.icon}
                    link={service.link}
                  />
                </ErrorBoundary>
              ))}
            </div>
            <div className="mt-6 text-center">
              <p className="text-gray-300">
                Features: 3D parallax effect, depth layers, glass morphism, particle animation
              </p>
            </div>
          </div>
        )}
        
        {/* Cosmic Portal Cards */}
        {(activeDesign === 'all' || activeDesign === 'cosmic') && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Cosmic Portal Cards</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {serviceData.map((service, index) => (
                <ErrorBoundary key={`cosmic-${index}`} fallback={<FallbackCard {...service} />}>
                  <SimpleCosmicPortalCard 
                    title={service.title}
                    description={service.description}
                    icon={service.icon}
                    link={service.link}
                  />
                </ErrorBoundary>
              ))}
            </div>
            <div className="mt-6 text-center">
              <p className="text-gray-300">
                Features: Three.js vortex effect, WebGL shader animation, spiraling particles
              </p>
            </div>
          </div>
        )}
        
        {/* Stellar Lifecycle Cards */}
        {(activeDesign === 'all' || activeDesign === 'stellar') && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Stellar Lifecycle Cards</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {serviceData.map((service, index) => (
                <ErrorBoundary key={`stellar-${index}`} fallback={<FallbackCard {...service} />}>
                  <SimpleLifecycleCard 
                    title={service.title}
                    description={service.description}
                    icon={service.icon}
                    link={service.link}
                  />
                </ErrorBoundary>
              ))}
            </div>
            <div className="mt-6 text-center">
              <p className="text-gray-300">
                Features: Stellar phase transitions on hover, orbital particle motion, dynamic pulsation
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
