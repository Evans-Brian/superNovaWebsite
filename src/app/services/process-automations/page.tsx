import Link from 'next/link';
import Image from 'next/image';
import KeyFeaturesWrapper from '../../../components/KeyFeaturesWrapper';
import BenefitsWrapper from '../../../components/BenefitsWrapper';
import StarfieldBackground from '../../../components/StarfieldBackground';
import { AnimatedHeadline } from '../../../components/text-effects/AnimatedHeadline';
import { AuroraBackground } from '../../../components/aurora-background';

export default function ProcessAutomationsPage() {
  return (
    <div>
      {/* Hero Section */}
      <AuroraBackground className="text-white py-16 min-h-[400px] h-auto flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="text-4xl font-bold mb-4">
              <AnimatedHeadline text="Process Automations" />
            </div>
            <div className="text-xl max-w-3xl mx-auto">
              <AnimatedHeadline text="Launch your workflows into orbit with AI-powered automation that eliminates friction, accelerates operations, and propels productivity to new heights." />
            </div>
          </div>
        </div>
      </AuroraBackground>

      {/* Overview Section */}
      <section className="py-16 bg-gray-800 relative">
        {/* Top border glow */}
        <div className="absolute top-0 left-0 right-0 h-0 pointer-events-none" 
          style={{
            animation: 'borderGlowPulse 6s infinite',
            zIndex: 5
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Transform Your Business Operations</h2>
              <p className="text-gray-300 mb-4">
                Our Process Automation solutions leverage cutting-edge technology to automate repetitive tasks, streamline workflows, and optimize business processes.
              </p>
              <p className="text-gray-300 mb-4">
                By automating manual processes, your team can focus on high-value activities that drive innovation and growth, while reducing errors and improving consistency.
              </p>
              <p className="text-gray-300">
                Whether you&apos;re looking to automate a single process or transform your entire operation, our solutions can be tailored to meet your specific business needs.
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg h-80 flex items-center justify-center overflow-hidden">
              <Image 
                src="/process-automation-diagram.png" 
                alt="Process Automation Diagram" 
                width={500}
                height={300}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
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
              <h2 className="text-3xl font-bold text-white mb-4">Common Use Cases</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Our Process Automation solutions can be applied to a wide range of business processes across various industries.
              </p>
            </div>
            
            <KeyFeaturesWrapper columns={3}>
            <div>
              <div className="flex items-center justify-center w-12 h-12 rounded-md text-white mb-4" style={{ backgroundColor: 'rgb(102, 57, 218)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Document Processing</h3>
              <p className="text-gray-300">
                Automate document handling, data extraction, and approval workflows to reduce manual paperwork and accelerate processing times.
              </p>
            </div>
            
            <div>
              <div className="flex items-center justify-center w-12 h-12 rounded-md text-white mb-4" style={{ backgroundColor: 'rgb(102, 57, 218)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Financial Operations</h3>
              <p className="text-gray-300">
                Streamline invoicing, accounts payable/receivable, expense management, and financial reporting processes.
              </p>
            </div>
            
            <div>
              <div className="flex items-center justify-center w-12 h-12 rounded-md text-white mb-4" style={{ backgroundColor: 'rgb(102, 57, 218)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Supply Chain Management</h3>
              <p className="text-gray-300">
                Optimize inventory management, order processing, supplier management, and logistics coordination.
              </p>
            </div>
            
            <div>
              <div className="flex items-center justify-center w-12 h-12 rounded-md text-white mb-4" style={{ backgroundColor: 'rgb(102, 57, 218)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">HR Processes</h3>
              <p className="text-gray-300">
                Automate employee onboarding, time tracking, leave management, performance reviews, and other HR workflows.
              </p>
            </div>
            
            <div>
              <div className="flex items-center justify-center w-12 h-12 rounded-md text-white mb-4" style={{ backgroundColor: 'rgb(102, 57, 218)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Customer Service</h3>
              <p className="text-gray-300">
                Enhance customer support with automated ticket routing, response management, and issue resolution tracking.
              </p>
            </div>
            
            <div>
              <div className="flex items-center justify-center w-12 h-12 rounded-md text-white mb-4" style={{ backgroundColor: 'rgb(102, 57, 218)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Contract Management</h3>
              <p className="text-gray-300">
                Streamline contract creation, review, approval, and renewal processes with automated workflows.
              </p>
            </div>
          </KeyFeaturesWrapper>
          </div>
        </section>
      </StarfieldBackground>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-800 relative">
        {/* Top border glow */}
        <div className="absolute top-0 left-0 right-0 h-0 pointer-events-none" 
          style={{
            animation: 'borderGlowPulse 6s infinite',
            zIndex: 5
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Benefits of Process Automation</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Implementing our Process Automation solutions can deliver significant benefits to your organization.
            </p>
          </div>
          
          <BenefitsWrapper columns={2}>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-md text-white" style={{ backgroundColor: 'rgb(102, 57, 218)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-white mb-2">Increased Efficiency</h3>
                <p className="text-gray-300">
                  Automate repetitive tasks to reduce processing times by up to 80%, allowing your team to accomplish more in less time.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-md text-white" style={{ backgroundColor: 'rgb(102, 57, 218)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-white mb-2">Improved Accuracy</h3>
                <p className="text-gray-300">
                  Eliminate human errors in data entry and processing, ensuring consistent and accurate results every time.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-md text-white" style={{ backgroundColor: 'rgb(102, 57, 218)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-white mb-2">Cost Reduction</h3>
                <p className="text-gray-300">
                  Reduce operational costs by automating manual processes, minimizing resource requirements, and optimizing resource allocation.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-md text-white" style={{ backgroundColor: 'rgb(102, 57, 218)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-white mb-2">Scalability</h3>
                <p className="text-gray-300">
                  Easily scale your operations to handle increased workloads without proportionally increasing staff or resources.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-md text-white" style={{ backgroundColor: 'rgb(102, 57, 218)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-white mb-2">Compliance & Traceability</h3>
                <p className="text-gray-300">
                  Ensure regulatory compliance with automated audit trails, documentation, and standardized processes.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-md text-white" style={{ backgroundColor: 'rgb(102, 57, 218)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-white mb-2">Employee Satisfaction</h3>
                <p className="text-gray-300">
                  Free your employees from repetitive tasks, allowing them to focus on more meaningful, creative, and strategic work.
                </p>
              </div>
            </div>
          </BenefitsWrapper>
        </div>
      </section>

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
          <h2 className="text-3xl font-bold mb-4">Ready to Streamline Your Business Processes?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Contact us today to discuss how our Process Automation solutions can help your business improve efficiency and reduce costs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              href="/contact" 
              className="inline-block bg-neutral-800 text-white hover:bg-neutral-700 font-medium py-3 px-8 rounded-md shadow-md transition duration-150 ease-in-out"
            >
              Contact Us
            </Link>
            <Link 
              href="/services/custom-integrations" 
              className="inline-block bg-transparent border-2 border-white text-white hover:bg-neutral-800 hover:border-neutral-800 font-medium py-3 px-8 rounded-md transition duration-150 ease-in-out"
            >
              Explore Custom Integrations
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
