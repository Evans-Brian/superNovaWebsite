import HeroSection from "@/components/HeroSection";
import ServiceCard from "@/components/ServiceCard";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <HeroSection />
      
      {/* Services Section */}
      <section className="py-16 bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Services</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We offer a range of automation solutions to help your business operate more efficiently and effectively.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard 
              title="Voice Agent Solutions" 
              description="Implement cutting-edge voice recognition and natural language processing to enhance customer interactions and automate voice-driven processes."
              icon="voice"
              link="/services/voice-ai"
            />
            <ServiceCard 
              title="Process Automations" 
              description="Streamline your business operations with intelligent workflow automation that reduces manual tasks and improves efficiency."
              icon="process"
              link="/services/process-automations"
            />
            <ServiceCard 
              title="Custom Integrations" 
              description="Connect your existing systems and software with seamless integrations tailored to your specific business requirements."
              icon="integration"
              link="/services/custom-integrations"
            />
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-16 bg-neutral-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Why Choose SuperNova Automations</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We combine technical expertise with business acumen to deliver solutions that drive real results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full text-white mb-4" style={{ backgroundColor: 'rgb(102, 57, 218)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Innovative Solutions</h3>
              <p className="text-gray-300">
                We stay at the forefront of technology to deliver cutting-edge automation solutions.
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full text-white mb-4" style={{ backgroundColor: 'rgb(102, 57, 218)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Expert Team</h3>
              <p className="text-gray-300">
                We brings years of experience in automation and engineering.
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full text-white mb-4" style={{ backgroundColor: 'rgb(102, 57, 218)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Secure & Reliable</h3>
              <p className="text-gray-300">
                We prioritize security and reliability in every solution we deliver.
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full text-white mb-4" style={{ backgroundColor: 'rgb(102, 57, 218)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Fast Implementation</h3>
              <p className="text-gray-300">
                We deliver solutions quickly and efficiently to minimize disruption to your business.
              </p>
            </div>
          </div>
        </div>
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
