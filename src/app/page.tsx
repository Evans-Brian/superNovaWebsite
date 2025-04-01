'use client';

import HeroSection from "@/components/HeroSection";
import NebulaDepthCard from "@/components/NebulaDepthCard";
import FeatureCardGrid from "@/components/FeatureCardGrid";
import StarfieldBackground from "@/components/StarfieldBackground";
import SpaceBackground from "@/components/SpaceBackground";
import BorderGlow from "@/components/ui/BorderGlow";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <HeroSection />
      
      {/* Services Section */}
      <SpaceBackground className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              We offer a range of automation solutions to help your business operate more efficiently and effectively.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <NebulaDepthCard 
              title="Voice Agent Solutions" 
              description="Implement cutting-edge voice recognition and natural language processing to enhance customer interactions and automate voice-driven processes."
              icon="voice"
              link="/services/voice-ai"
            />
            <NebulaDepthCard 
              title="Process Automations" 
              description="Streamline your business operations with intelligent workflow automation that reduces manual tasks and improves efficiency."
              icon="process"
              link="/services/process-automations"
            />
            <NebulaDepthCard 
              title="Custom Integrations" 
              description="Connect your existing systems and software with seamless integrations tailored to your specific business requirements."
              icon="integration"
              link="/services/custom-integrations"
            />
          </div>
        </div>
      </SpaceBackground>
      
      {/* Why Choose Us Section */}
      <section className="text-white relative">
        {/* Bottom border - only pulsing glow, flush with edge */}
        <BorderGlow position="bottom" zIndex={10} />
        <StarfieldBackground>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Why Choose SuperNova Automations?</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                We combine technical expertise with business acumen to deliver solutions that drive real results.
              </p>
            </div>
            
            <FeatureCardGrid />
          </div>
        </StarfieldBackground>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 text-white" style={{ 
        backgroundImage: 'url(/supernova-bottom.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'bottom center'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Contact us today to discuss how our automation solutions can help your business thrive.
          </p>
          <Link 
            href="/contact" 
            className="inline-block bg-neutral-800 text-white hover:bg-neutral-700 font-medium py-3 px-8 rounded-md shadow-md transition duration-150 ease-in-out"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
