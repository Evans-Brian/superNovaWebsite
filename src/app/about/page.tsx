import Link from 'next/link';
import { AnimatedHeadline } from '../../components/text-effects/AnimatedHeadline';
import { AuroraBackground } from '../../components/aurora-background';
import SpaceBackground from '@/components/SpaceBackground';
import StarfieldBackground from '@/components/StarfieldBackground';
import BorderGlow from '@/components/ui/BorderGlow';
import { GlowingEffect } from '../../../components/ui/glowing-effect';

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <AuroraBackground className="text-white py-16 min-h-[400px] h-auto flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              <AnimatedHeadline 
                text="About SuperNova Automations" 
                delay={0.2}
                duration={0.9}
                distance={25}
              />
            </h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed">
              <AnimatedHeadline 
                text="We're a team of automation experts dedicated to helping businesses leverage the power of technology." 
                delay={0.5}
                duration={1.0}
                distance={30}
              />
            </p>
          </div>
        </div>
      </AuroraBackground>

      {/* Our Story Section */}
      <SpaceBackground className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4">
                SuperNova Automations was founded with a simple mission: to help businesses harness the power of automation and artificial intelligence to work smarter, not harder.
              </p>
              <p className="text-gray-700 mb-4">
                Our founder, drawing on experience in the tech industry, saw that many businesses were struggling to keep up with the rapid pace of technological change. They were either overwhelmed by the complexity of new tools or unsure how to integrate them into their existing workflows.
              </p>
              <p className="text-gray-700">
                That&apos;s where we come in. We bridge the gap between cutting-edge technology and practical business applications, delivering solutions that are both innovative and accessible.
              </p>
            </div>
            <div className="bg-neutral-900 rounded-lg h-80 flex items-center justify-center shadow-lg">
              <p className="text-gray-400 italic">Company image placeholder</p>
            </div>
          </div>
        </div>
      </SpaceBackground>

      {/* Our Mission Section with Starfield Background */}
      <section className="text-white relative">
        {/* Top and bottom border glows */}
        <BorderGlow position="top" />
        <BorderGlow position="bottom" />
        
        <StarfieldBackground>
          <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                To empower businesses with intelligent automation solutions that drive growth, efficiency, and innovation.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="relative p-1 rounded-xl" data-card-type="Bordered Service Cards">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={3}
                />
                <div 
                  className="p-6 rounded-lg shadow-md"
                  style={{ 
                    backgroundColor: '#e6eeff',
                    backgroundImage: `
                      radial-gradient(circle at 40% 40%, rgba(102, 57, 218, 0.08), transparent 60%),
                      radial-gradient(circle at 60% 60%, rgba(66, 153, 225, 0.06), transparent 50%)
                    `
                  }}
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-md text-white mb-4" style={{ backgroundColor: 'rgb(102, 57, 218)' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Efficiency</h3>
                  <p className="text-gray-700">
                    We help businesses streamline their operations and eliminate repetitive tasks through intelligent automation.
                  </p>
                </div>
              </div>
              
              <div className="relative p-1 rounded-xl" data-card-type="Bordered Service Cards">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={3}
                />
                <div 
                  className="p-6 rounded-lg shadow-md"
                  style={{ 
                    backgroundColor: '#e6eeff',
                    backgroundImage: `
                      radial-gradient(circle at 40% 40%, rgba(102, 57, 218, 0.08), transparent 60%),
                      radial-gradient(circle at 60% 60%, rgba(66, 153, 225, 0.06), transparent 50%)
                    `
                  }}
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-md text-white mb-4" style={{ backgroundColor: 'rgb(102, 57, 218)' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation</h3>
                  <p className="text-gray-700">
                    We stay at the forefront of technology to bring innovative solutions to our clients&apos; most challenging problems.
                  </p>
                </div>
              </div>
              
              <div className="relative p-1 rounded-xl" data-card-type="Bordered Service Cards">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={3}
                />
                <div 
                  className="p-6 rounded-lg shadow-md"
                  style={{ 
                    backgroundColor: '#e6eeff',
                    backgroundImage: `
                      radial-gradient(circle at 40% 40%, rgba(102, 57, 218, 0.08), transparent 60%),
                      radial-gradient(circle at 60% 60%, rgba(66, 153, 225, 0.06), transparent 50%)
                    `
                  }}
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-md text-white mb-4" style={{ backgroundColor: 'rgb(102, 57, 218)' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Empowerment</h3>
                  <p className="text-gray-700">
                    We empower our clients with the knowledge and tools they need to thrive in an increasingly digital world.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </StarfieldBackground>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-white relative" style={{ 
        backgroundImage: 'url(/supernova-bottom.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'bottom center'
      }}>
        {/* Top border glow */}
        <BorderGlow position="top" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Work With Us?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Let&apos;s discuss how we can help your business leverage the power of automation.
          </p>
          <Link 
            href="/contact" 
            className="inline-block bg-neutral-800 text-white hover:bg-neutral-700 font-medium py-3 px-8 rounded-md shadow-md transition duration-150 ease-in-out"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
