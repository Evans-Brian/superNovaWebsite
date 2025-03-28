'use client';

import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface HolographicProjectionTextProps {
  children: string;
  delay?: number;
}

export function HolographicProjectionText({
  children,
  delay = 0
}: HolographicProjectionTextProps) {
  const controls = useAnimation();
  const [key, setKey] = useState(0);
  // Split into words to prevent word breaks
  const words = children.split(' ');
  
  // Force reset component when remounted to ensure animation restarts
  const resetKey = React.useId();
  
  useEffect(() => {
    // Reset animation state
    controls.set("hidden");
    
    // Setup animation sequence with no delays
    const sequence = async () => {
      // Start everything immediately
      controls.start('initiate');
      controls.start('textReveal');
      controls.start('scan');
      
      // Wait for scan and text to complete
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Final state with flicker
      controls.start('final');
    };
    
    // Start animation sequence immediately
    sequence();
    
    // Cleanup function
    return () => {
      controls.stop();
    };
  }, [controls, children, resetKey]); // Add resetKey dependency to force effect to run on remount

  // Calculate total container width with a multiplier to account for the scan line's longer travel distance
  const containerWidth = 110; // Represents the 110% width the scan line travels
  
  // Text variants for the hologram effect - synced with scan line
  const textVariants = {
    hidden: {
      opacity: 0
    },
    initiate: {
      opacity: 0 // Keep text hidden during initiate phase
    },
    textReveal: (i: number) => {
      // Calculate position of this word in the text (as percentage of total width)
      const wordPosition = i / words.length;
      
      // Calculate when scan line will reach this word (0.1 = 10% of container)
      const scanThreshold = 0.1 + (wordPosition * 0.8); // Start at 10%, end at 90% of scan duration
      
      // Calculate delay based on when scan line reaches this word
      const revealDelay = scanThreshold * 3; // 3s is total scan duration
      
      return {
        opacity: [0, 0.8],
        transition: {
          duration: 0.1, // Quick fade in
          delay: revealDelay,
          ease: "linear"
        }
      };
    },
    final: {
      opacity: [0.8, 0.7, 0.8],
      transition: {
        repeat: Infinity,
        duration: 3,
        repeatType: "reverse" as const
      }
    }
  };

  // Scan line variants - slowed down
  const scanLineVariants = {
    hidden: {
      opacity: 0,
      left: '-10%'
    },
    initiate: {
      opacity: 0
    },
    scan: {
      opacity: 0.8,
      left: '110%',
      transition: {
        duration: 3,
        ease: 'linear'
      }
    },
    final: {
      opacity: 0
    }
  };

  // Flicker effect variants - enhanced
  const flickerVariants = {
    hidden: {
      opacity: 0
    },
    initiate: {
      opacity: 0
    },
    scan: {
      opacity: 0
    },
    final: (i: number) => ({
      opacity: [0, 0.5, 0],
      transition: {
        repeat: Infinity,
        duration: 0.3,
        delay: i * 2.5,
        repeatDelay: Math.random() * 5 + 3 // More frequent flickers
      }
    })
  };

  // Glow effect variants - enhanced
  const glowVariants = {
    hidden: {
      opacity: 0
    },
    initiate: {
      opacity: [0, 0.2],
      transition: {
        duration: 0.5
      }
    },
    scan: {
      opacity: 0.2
    },
    final: {
      opacity: [0.3, 0.6, 0.3], // Stronger glow effect
      transition: {
        repeat: Infinity,
        duration: 3,
        repeatType: "reverse" as const
      }
    }
  };

  // Horizontal scan line effect
  const horizontalScanVariants = {
    hidden: {
      opacity: 0,
      scaleY: 0
    },
    initiate: {
      opacity: 0.5,
      scaleY: 0.02,
      transition: {
        duration: 0.3
      }
    },
    scan: {
      opacity: 0.5,
      y: [0, 100, 0],
      transition: {
        duration: 3,
        repeat: 0,
        ease: 'linear',
      }
    },
    final: {
      opacity: [0.5, 0.3, 0.5],
      y: [0, 100, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  };

  return (
    <div className="relative inline-block p-4 rounded-md" key={key}>
      {/* Background glow */}
      <motion.div
        initial="hidden"
        animate={controls}
        variants={glowVariants}
        className="absolute inset-0 rounded-md blur-xl"
        style={{ backgroundColor: 'rgba(102, 57, 218, 0.05)' }}
      />
      
      {/* Scan line vertical */}
      <motion.div
        initial="hidden"
        animate={controls}
        variants={scanLineVariants}
        className="absolute top-0 bottom-0 w-[10%] blur-sm"
        style={{ 
          background: 'linear-gradient(to right, transparent, rgba(139, 92, 246, 0.3), transparent)'
        }}
      />
      
      {/* Horizontal scan line */}
      <motion.div
        initial="hidden"
        animate={controls}
        variants={horizontalScanVariants}
        className="absolute left-0 right-0 h-full"
        style={{ 
          background: 'linear-gradient(to bottom, transparent, rgba(139, 92, 246, 0.2), transparent)' 
        }}
      />
      
      {/* Flicker overlay */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={i}
          custom={i}
          initial="hidden"
          animate={controls}
          variants={flickerVariants}
          className="absolute inset-0 rounded-md"
          style={{ backgroundColor: 'rgba(139, 92, 246, 0.05)' }}
        />
      ))}
      
      {/* Text with standard white color matching Voice Agent page */}
      <motion.div 
        className="relative z-10" 
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          transition: { duration: 0.5 }
        }}
        style={{ color: 'white' }}
      >
        <span className="whitespace-pre-wrap">
          {words.map((word, i) => (
            <React.Fragment key={i}>
              <motion.span
                custom={i}
                initial="hidden"
                animate={controls}
                variants={textVariants}
                className="relative inline-block"
                style={{
                  textShadow: '0 0 5px rgba(255, 255, 255, 0.6), 0 0 10px rgba(255, 255, 255, 0.4)'
                }}
              >
                {word}
              </motion.span>
              {i < words.length - 1 && ' '}
            </React.Fragment>
          ))}
        </span>
      </motion.div>
      
      {/* Line noise effect */}
      <div className="absolute inset-0 bg-scanline opacity-10 z-0 pointer-events-none"></div>
    </div>
  );
}
