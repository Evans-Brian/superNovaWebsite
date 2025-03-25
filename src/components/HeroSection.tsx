"use client";

import Link from 'next/link';
import RippleSupernovaBg from './RippleSupernovaBg';
import { motion } from "framer-motion";

export default function HeroSection() {
  // Animation variants for fade-up effect
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2, // Staggered delay based on index
        ease: [0.25, 0.4, 0.25, 1], // Custom ease curve
      },
    }),
  };

  return (
    <div className="relative text-white">
      <RippleSupernovaBg>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="md:w-2/3">
            <motion.h1 
              custom={0}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
            >
              Transforming Businesses with Intelligent Automation
            </motion.h1>
            
            <motion.p 
              custom={1}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="text-xl md:text-2xl mb-8"
            >
              SuperNova Automations helps small businesses work smarter with powerful voice agents, process automation, and custom integration solutions—designed to save you time, reduce manual work, and increase productivity.
            </motion.p>
            
            <motion.div 
              custom={2}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            >
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
            </motion.div>
          </div>
        </div>
      </RippleSupernovaBg>
    </div>
  );
}
