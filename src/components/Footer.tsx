import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-1 mb-4">
              <h3 className="text-lg font-semibold text-white">SuperNova Automations</h3>
              <Image 
                src="/logo.svg" 
                alt="SuperNova Automations Logo" 
                width={48} 
                height={48} 
                className="h-12 w-12"
              />
            </div>
            <p className="text-gray-300 mb-4">
              Empowering businesses with cutting-edge automation solutions.
            </p>
            {/* Social media icons removed */}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/voice-ai" className="text-gray-300 hover:text-indigo-400">
                  Voice AI Solutions
                </Link>
              </li>
              <li>
                <Link href="/services/process-automations" className="text-gray-300 hover:text-indigo-400">
                  Process Automations
                </Link>
              </li>
              <li>
                <Link href="/services/custom-integrations" className="text-gray-300 hover:text-indigo-400">
                  Custom Integrations
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <address className="not-italic text-gray-300 space-y-2">
              <p>Email: supernovaautomations@gmail.com</p>
              <p>Phone: (330) 357-9229</p>
            </address>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-center text-gray-400">
            &copy; {new Date().getFullYear()} SuperNova Automations. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
