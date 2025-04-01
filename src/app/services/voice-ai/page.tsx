import VideoCard from '@/components/VideoCard';
import Link from 'next/link';
import Image from 'next/image';
import KeyFeaturesWrapper from '@/components/KeyFeaturesWrapper';
import StarfieldBackground from '@/components/StarfieldBackground';
import SpaceBackground from '@/components/SpaceBackground';
import DarkKeyFeaturesWrapper from '@/components/DarkKeyFeaturesWrapper';
import { AnimatedHeadline } from '@/components/text-effects/AnimatedHeadline';
import { AuroraBackground } from '@/components/aurora-background';

export default function VoiceAIPage() {
  return (
    <div>
      {/* Hero Section */}
      <AuroraBackground className="text-white py-16 min-h-[400px] h-auto flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              <AnimatedHeadline 
                text="Voice Agent Solutions" 
                delay={0.2}
                duration={0.9}
                distance={25}
              />
            </h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed">
              <AnimatedHeadline 
                text="Transform your customer interactions and streamline operations with our cutting-edge Voice Agent technology." 
                delay={0.5}
                duration={1.0}
                distance={30}
              />
            </p>
          </div>
        </div>
      </AuroraBackground>

      {/* Overview Section */}
      <SpaceBackground className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Harness the Power of Voice Agent</h2>
              <p className="text-gray-700 mb-4">
                Our Voice Agent solutions leverage advanced natural language processing and machine learning to create intelligent voice-driven systems that understand, respond, and learn from interactions.
              </p>
              <p className="text-gray-700 mb-4">
                Whether you&apos;re looking to automate customer service, enhance accessibility, or create voice-controlled applications, our solutions can be tailored to meet your specific business needs.
              </p>
              <p className="text-gray-700">
                With SuperNova Automations, you get more than just technology – you get a partner committed to helping you achieve your business goals through innovative voice solutions.
              </p>
            </div>
            <div className="bg-neutral-900 rounded-lg h-80 flex items-center justify-center overflow-hidden shadow-lg">
              <Image 
                src="/voice-ai-diagram.png" 
                alt="Voice Agent Diagram" 
                width={500}
                height={300}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </SpaceBackground>

      {/* Video Demos Section */}
      <StarfieldBackground>
        <section className="py-16 relative">
          {/* Top border glow */}
          <div className="absolute top-0 left-0 right-0 h-0 pointer-events-none" 
            style={{
              animation: 'borderGlowPulse 6s infinite',
              zIndex: 5
            }}
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">See Voice Agent in Action</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Watch our demo videos to see how our Voice Agent solutions can transform your business. Want to try it out? Click &quot;Call Now&quot; to speak to the agent.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <VideoCard 
                title="Dental Office Scheduling Agent" 
                videoId="OdxqYRDl7TI" 
                description="Watch our AI assistant handle appointment scheduling for a dental office, providing a seamless experience for patients."
              />
              <VideoCard 
                title="Locksmith Job Booking Agent" 
                videoId="u86h6B4IU-8" 
                description="See how our Voice Agent system manages locksmith service bookings, efficiently handling customer requests and scheduling."
              />
            </div>
          </div>
        </section>
      </StarfieldBackground>

      {/* Features Section */}
      <div className="text-center py-8 bg-white">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Features</h2>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          Our Voice Agent solutions come packed with features designed to enhance your business operations.
        </p>
      </div>
      
      <DarkKeyFeaturesWrapper columns={3} meteorEffect={false}>
        <div>
          <div className="flex items-center justify-center w-12 h-12 rounded-md text-white mb-4" style={{ backgroundColor: 'rgb(102, 57, 218)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Natural Language Understanding</h3>
          <p className="text-gray-300">
            Our Agents understand context, intent, and nuance in human speech, enabling more natural interactions.
          </p>
        </div>
        
        <div>
          <div className="flex items-center justify-center w-12 h-12 rounded-md text-white mb-4" style={{ backgroundColor: 'rgb(102, 57, 218)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Multilingual Support</h3>
          <p className="text-gray-300">
            Support for over 30 languages, enabling global businesses to provide consistent service worldwide.
          </p>
        </div>
        
        <div>
          <div className="flex items-center justify-center w-12 h-12 rounded-md text-white mb-4" style={{ backgroundColor: 'rgb(102, 57, 218)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Continuous Learning</h3>
          <p className="text-gray-300">
            Our AI systems learn from each interaction, continuously improving accuracy and effectiveness over time.
          </p>
        </div>
        
        <div>
          <div className="flex items-center justify-center w-12 h-12 rounded-md text-white mb-4" style={{ backgroundColor: 'rgb(102, 57, 218)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">System Integration</h3>
          <p className="text-gray-300">
            Our agents can be integrated with your existing scheduling and CRM systems.
          </p>
        </div>
        
        <div>
          <div className="flex items-center justify-center w-12 h-12 rounded-md text-white mb-4" style={{ backgroundColor: 'rgb(102, 57, 218)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Advanced Analytics</h3>
          <p className="text-gray-300">
            Gain insights from voice interactions with detailed analytics and reporting capabilities.
          </p>
        </div>
        
        <div>
          <div className="flex items-center justify-center w-12 h-12 rounded-md text-white mb-4" style={{ backgroundColor: 'rgb(102, 57, 218)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Strong Security Features</h3>
          <p className="text-gray-300">
            Advanced protection keeps your voice data safe through encryption and adherence to industry compliance standards.
          </p>
        </div>
      </DarkKeyFeaturesWrapper>

      {/* CTA Section */}
      <section className="py-16 text-white relative" style={{ 
        backgroundImage: 'url(/supernova-bottom.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'bottom center'
      }}>
        {/* Top border glow */}
        <div className="absolute top-0 left-0 right-0 h-0 pointer-events-none" 
          style={{
            animation: 'borderGlowPulse 6s infinite',
            zIndex: 5
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business with Voice Agent?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Contact us today to discuss how our Voice Agent solutions can help your business improve efficiency and customer satisfaction.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              href="/contact" 
              className="inline-block bg-neutral-800 text-white hover:bg-neutral-700 font-medium py-3 px-8 rounded-md shadow-md transition duration-150 ease-in-out"
            >
              Contact Us
            </Link>
            <Link 
              href="/services/process-automations" 
              className="inline-block bg-transparent border-2 border-white text-white hover:bg-neutral-800 hover:border-neutral-800 font-medium py-3 px-8 rounded-md transition duration-150 ease-in-out"
            >
              Explore Process Automations
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
