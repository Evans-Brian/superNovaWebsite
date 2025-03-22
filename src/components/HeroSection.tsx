import Link from 'next/link';
import RippleSupernovaBg from './RippleSupernovaBg';

export default function HeroSection() {
  return (
    <div className="relative text-white">
      <RippleSupernovaBg>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Transforming Businesses with Intelligent Automation
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              SuperNova Automations helps small businesses work smarter with powerful voice agents, process automation, and custom integration solutions—designed to save you time, reduce manual work, and increase productivity.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                href="/contact" 
                className="inline-block bg-neutral-800 text-white hover:bg-neutral-700 font-medium py-3 px-6 rounded-md shadow-md transition duration-150 ease-in-out text-center"
              >
                Get Started
              </Link>
              <Link 
                href="/services/voice-ai" 
                className="inline-block bg-transparent border-2 border-white text-white hover:bg-neutral-800 hover:border-neutral-800 font-medium py-3 px-6 rounded-md transition duration-150 ease-in-out text-center"
              >
                Explore Solutions
              </Link>
            </div>
          </div>
        </div>
      </RippleSupernovaBg>
    </div>
  );
}
