import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">About SuperNova Automations</h1>
            <p className="text-xl max-w-3xl mx-auto">
              We're a team of automation experts dedicated to helping businesses leverage the power of technology.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                SuperNova Automations was founded in 2020 with a simple mission: to help businesses harness the power of automation and artificial intelligence to work smarter, not harder.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Our founder, a veteran in the tech industry, saw that many businesses were struggling to keep up with the rapid pace of technological change. They were either overwhelmed by the complexity of new tools or unsure how to integrate them into their existing workflows.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                That's where we come in. We bridge the gap between cutting-edge technology and practical business applications, delivering solutions that are both innovative and accessible.
              </p>
            </div>
            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-80 flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400 italic">Company image placeholder</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              To empower businesses with intelligent automation solutions that drive growth, efficiency, and innovation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-center w-12 h-12 rounded-md bg-indigo-500 text-white mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Efficiency</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We help businesses streamline their operations and eliminate repetitive tasks through intelligent automation.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-center w-12 h-12 rounded-md bg-indigo-500 text-white mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Innovation</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We stay at the forefront of technology to bring innovative solutions to our clients' most challenging problems.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-center w-12 h-12 rounded-md bg-indigo-500 text-white mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Empowerment</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We empower our clients with the knowledge and tools they need to thrive in an increasingly digital world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Team</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Meet the experts behind SuperNova Automations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-40 w-40 mx-auto mb-4 flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400 italic">Photo</p>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">Jane Doe</h3>
              <p className="text-indigo-600 dark:text-indigo-400 mb-2">Founder & CEO</p>
              <p className="text-gray-600 dark:text-gray-300">
                With over 15 years of experience in tech, Jane leads our company's vision and strategy.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-40 w-40 mx-auto mb-4 flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400 italic">Photo</p>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">John Smith</h3>
              <p className="text-indigo-600 dark:text-indigo-400 mb-2">CTO</p>
              <p className="text-gray-600 dark:text-gray-300">
                John oversees our technical operations and ensures we deliver cutting-edge solutions.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-40 w-40 mx-auto mb-4 flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400 italic">Photo</p>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">Sarah Johnson</h3>
              <p className="text-indigo-600 dark:text-indigo-400 mb-2">Head of AI Research</p>
              <p className="text-gray-600 dark:text-gray-300">
                Sarah leads our AI research team, developing innovative solutions for complex problems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Work With Us?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Let's discuss how we can help your business leverage the power of automation.
          </p>
          <Link 
            href="/contact" 
            className="inline-block bg-white text-indigo-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-md shadow-md transition duration-150 ease-in-out"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
