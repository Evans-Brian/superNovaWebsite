import Link from 'next/link';
import Image from 'next/image';
import KeyFeaturesWrapper from '@/components/KeyFeaturesWrapper';
import BenefitsWrapper from '@/components/BenefitsWrapper';
import ApproachWrapper from '@/components/ApproachWrapper';
import StarfieldBackground from '@/components/StarfieldBackground';

export default function CustomIntegrationsPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="text-white py-16" style={{ 
        backgroundImage: 'url(/supernova-top.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'top center'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Custom Integrations</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Connect your systems, applications, and data sources with seamless custom integrations tailored to your business needs.
            </p>
          </div>
        </div>
      </section>

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
              <h2 className="text-3xl font-bold text-white mb-6">Seamless Connections for Your Business</h2>
              <p className="text-gray-300 mb-4">
                In today&apos;s digital landscape, businesses rely on multiple systems and applications to operate efficiently. Our Custom Integration solutions bridge the gap between these systems, enabling seamless data flow and process automation.
              </p>
              <p className="text-gray-300 mb-4">
                Whether you need to connect your CRM with your ERP, integrate e-commerce platforms with inventory management, or build custom APIs for third-party services, our team of integration experts can design and implement solutions that meet your specific requirements.
              </p>
              <p className="text-gray-300">
                We focus on creating reliable, scalable, and secure integrations that enhance your operational efficiency and provide a unified view of your business data.
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg h-80 flex items-center justify-center overflow-hidden">
              <Image 
                src="/custom-integrations-diagram.png" 
                alt="Custom Integrations Diagram" 
                width={500}
                height={300}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Integration Types Section */}
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
              <h2 className="text-3xl font-bold text-white mb-4">Integration Types</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                We offer a variety of integration approaches to meet your specific business requirements.
              </p>
            </div>
            
            <KeyFeaturesWrapper columns={3}>
            <div>
              <div className="flex items-center justify-center w-12 h-12 rounded-md text-white mb-4" style={{ backgroundColor: 'rgb(102, 57, 218)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">API Integrations</h3>
              <p className="text-gray-300">
                Connect applications through their APIs, enabling real-time data exchange and functionality sharing between systems.
              </p>
            </div>
            
            <div>
              <div className="flex items-center justify-center w-12 h-12 rounded-md text-white mb-4" style={{ backgroundColor: 'rgb(102, 57, 218)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Data Synchronization</h3>
              <p className="text-gray-300">
                Keep data consistent across multiple systems with automated synchronization processes, either in real-time or on a scheduled basis.
              </p>
            </div>
            
            <div>
              <div className="flex items-center justify-center w-12 h-12 rounded-md text-white mb-4" style={{ backgroundColor: 'rgb(102, 57, 218)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Workflow Automation</h3>
              <p className="text-gray-300">
                Create automated workflows that span multiple systems, triggering actions based on events or conditions in connected applications.
              </p>
            </div>
            
            <div>
              <div className="flex items-center justify-center w-12 h-12 rounded-md text-white mb-4" style={{ backgroundColor: 'rgb(102, 57, 218)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">ETL Processes</h3>
              <p className="text-gray-300">
                Extract, transform, and load data between systems, ensuring proper formatting and validation during the transfer process.
              </p>
            </div>
            
            <div>
              <div className="flex items-center justify-center w-12 h-12 rounded-md text-white mb-4" style={{ backgroundColor: 'rgb(102, 57, 218)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Custom Middleware</h3>
              <p className="text-gray-300">
                Develop specialized middleware solutions that facilitate communication between systems that don&apos;t natively integrate with each other.
              </p>
            </div>
            
            <div>
              <div className="flex items-center justify-center w-12 h-12 rounded-md text-white mb-4" style={{ backgroundColor: 'rgb(102, 57, 218)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">IoT Integrations</h3>
              <p className="text-gray-300">
                Connect IoT devices and sensors with your business systems to enable data collection, monitoring, and automated responses.
              </p>
            </div>
          </KeyFeaturesWrapper>
          </div>
        </section>
      </StarfieldBackground>

      {/* Common Integrations Section */}
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
            <h2 className="text-3xl font-bold text-white mb-4">Common Integration Scenarios</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We&apos;ve helped businesses across various industries connect their systems and streamline their operations.
            </p>
          </div>
          
          <BenefitsWrapper columns={2}>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-md text-white" style={{ backgroundColor: 'rgb(102, 57, 218)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-white mb-2">E-commerce Integrations</h3>
                <p className="text-gray-300">
                  Connect your online store with inventory management, shipping providers, payment processors, and accounting systems for a seamless order fulfillment process.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-md text-white" style={{ backgroundColor: 'rgb(102, 57, 218)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-white mb-2">CRM & Marketing Automation</h3>
                <p className="text-gray-300">
                  Integrate your CRM with marketing automation platforms, email marketing tools, and social media to create a unified customer engagement strategy.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-md text-white" style={{ backgroundColor: 'rgb(102, 57, 218)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-white mb-2">ERP & Financial Systems</h3>
                <p className="text-gray-300">
                  Connect your ERP with financial management, accounting, and reporting tools to streamline financial operations and improve data accuracy.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-md text-white" style={{ backgroundColor: 'rgb(102, 57, 218)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-white mb-2">Business Intelligence</h3>
                <p className="text-gray-300">
                  Integrate data sources with analytics and reporting tools to create comprehensive dashboards and gain valuable business insights.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-md text-white" style={{ backgroundColor: 'rgb(102, 57, 218)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-white mb-2">Supply Chain Management</h3>
                <p className="text-gray-300">
                  Connect inventory, procurement, logistics, and supplier management systems to create a transparent and efficient supply chain.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-md text-white" style={{ backgroundColor: 'rgb(102, 57, 218)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-white mb-2">Cloud Service Integrations</h3>
                <p className="text-gray-300">
                  Integrate with cloud services like AWS, Azure, or Google Cloud to leverage cloud storage, computing, and specialized services.
                </p>
              </div>
            </div>
          </BenefitsWrapper>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-16 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Integration Approach</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We follow a structured methodology to ensure successful integration projects.
            </p>
          </div>
          
          <ApproachWrapper columns={3}>
            <div>
              <div className="flex items-center justify-center w-12 h-12 rounded-full text-white mb-4" style={{ backgroundColor: 'rgb(102, 57, 218)' }}>
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Discovery & Analysis</h3>
              <p className="text-gray-300">
                We begin by understanding your business processes, systems, and integration requirements. This includes identifying data flows, integration points, and technical constraints.
              </p>
            </div>
            
            <div>
              <div className="flex items-center justify-center w-12 h-12 rounded-full text-white mb-4" style={{ backgroundColor: 'rgb(102, 57, 218)' }}>
                <span className="text-xl font-bold">2</span>
              </div>
              <h3  className="text-xl font-semibold text-white mb-2">Solution Design</h3>
              <p className="text-gray-300">
                Based on our analysis, we design a comprehensive integration solution that addresses your specific needs, including architecture, data mapping, transformation rules, and error handling.
              </p>
            </div>
            
            <div>
              <div className="flex items-center justify-center w-12 h-12 rounded-full text-white mb-4" style={{ backgroundColor: 'rgb(102, 57, 218)' }}>
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Development & Testing</h3>
              <p className="text-gray-300">
                Our team develops the integration solution according to the design specifications, followed by rigorous testing to ensure data integrity, performance, and error handling.
              </p>
            </div>
            
            <div>
              <div className="flex items-center justify-center w-12 h-12 rounded-full text-white mb-4" style={{ backgroundColor: 'rgb(102, 57, 218)' }}>
                <span className="text-xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Deployment</h3>
              <p className="text-gray-300">
                We implement the integration solution in your environment, ensuring a smooth transition with minimal disruption to your business operations.
              </p>
            </div>
            
            <div>
              <div className="flex items-center justify-center w-12 h-12 rounded-full text-white mb-4" style={{ backgroundColor: 'rgb(102, 57, 218)' }}>
                <span className="text-xl font-bold">5</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Monitoring & Support</h3>
              <p className="text-gray-300">
                We provide ongoing monitoring and support to ensure the integration continues to function optimally, addressing any issues that may arise.
              </p>
            </div>
            
            <div>
              <div className="flex items-center justify-center w-12 h-12 rounded-full text-white mb-4" style={{ backgroundColor: 'rgb(102, 57, 218)' }}>
                <span className="text-xl font-bold">6</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Continuous Improvement</h3>
              <p className="text-gray-300">
                We continuously evaluate and enhance your integration solution to adapt to your evolving business needs and emerging technologies.
              </p>
            </div>
          </ApproachWrapper>
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
          <h2 className="text-3xl font-bold mb-4">Ready to Connect Your Systems?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Contact us today to discuss how our Custom Integration solutions can help your business streamline operations and improve efficiency.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              href="/contact" 
              className="inline-block bg-neutral-800 text-white hover:bg-neutral-700 font-medium py-3 px-8 rounded-md shadow-md transition duration-150 ease-in-out"
            >
              Contact Us
            </Link>
            <Link 
              href="/services/voice-ai" 
              className="inline-block bg-transparent border-2 border-white text-white hover:bg-neutral-800 hover:border-neutral-800 font-medium py-3 px-8 rounded-md transition duration-150 ease-in-out"
            >
              Explore Voice Agent Solutions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
