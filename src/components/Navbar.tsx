'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const toggleServices = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  return (
    <nav className="bg-black shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center space-x-2">
              <Image 
                src="/logo.svg" 
                alt="SuperNova Automations Logo" 
                width={40} 
                height={40} 
                className="h-10 w-10"
              />
              <span className="text-xl font-bold" style={{ color: 'rgb(102, 57, 218)' }}>
                SuperNova Automations
              </span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-200 hover:text-indigo-400 hover:bg-gray-800">
              Home
            </Link>
            <div 
              className="relative group" 
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => {
                // Use a small delay to prevent immediate closing
                setTimeout(() => {
                  setIsServicesOpen(false);
                }, 100);
              }}
            >
              <button 
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-200 hover:text-indigo-400 hover:bg-gray-800 inline-flex items-center"
                onClick={toggleServices}
                aria-expanded={isServicesOpen}
              >
                Services
                <svg className="ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div 
                className={`absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-neutral-900 ring-1 ring-black ring-opacity-5 transition ease-out duration-200 z-10 before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-8 before:-translate-y-8 before:bg-transparent ${
                  isServicesOpen ? 'opacity-100 visible' : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible'
                }`}
              >
                <div className="py-1">
                  <Link href="/services/voice-ai" className="block px-4 py-2 text-sm text-gray-200 hover:bg-neutral-800">
                    Voice AI Solutions
                  </Link>
                  <Link href="/services/process-automations" className="block px-4 py-2 text-sm text-gray-200 hover:bg-neutral-800">
                    Process Automations
                  </Link>
                  <Link href="/services/custom-integrations" className="block px-4 py-2 text-sm text-gray-200 hover:bg-neutral-800">
                    Custom Integrations
                  </Link>
                </div>
              </div>
            </div>
            <Link href="/about" className="px-3 py-2 rounded-md text-sm font-medium text-gray-200 hover:text-indigo-400 hover:bg-gray-800">
              About
            </Link>
            <Link href="/contact" className="px-3 py-2 rounded-md text-sm font-medium text-gray-200 hover:text-indigo-400 hover:bg-gray-800">
              Contact
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:bg-gray-800 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <div className="flex items-center space-x-2 px-3 py-2 mb-2">
              <Image 
                src="/logo.svg" 
                alt="SuperNova Automations Logo" 
                width={30} 
                height={30} 
                className="h-8 w-8"
              />
              <span className="text-base font-bold" style={{ color: 'rgb(102, 57, 218)' }}>
                SuperNova Automations
              </span>
            </div>
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-indigo-400 hover:bg-gray-800">
              Home
            </Link>
            <div className="space-y-1 pl-4 border-l-2 border-indigo-500">
              <Link href="/services/voice-ai" className="block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-indigo-400 hover:bg-gray-800">
                Voice AI Solutions
              </Link>
              <Link href="/services/process-automations" className="block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-indigo-400 hover:bg-gray-800">
                Process Automations
              </Link>
              <Link href="/services/custom-integrations" className="block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-indigo-400 hover:bg-gray-800">
                Custom Integrations
              </Link>
            </div>
            <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-indigo-400 hover:bg-gray-800">
              About
            </Link>
            <Link href="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-indigo-400 hover:bg-gray-800">
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
