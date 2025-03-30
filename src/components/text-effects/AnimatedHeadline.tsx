'use client';

import { motion } from 'framer-motion';

interface AnimatedHeadlineProps {
  text: string;
  delay?: number;
  duration?: number;
  distance?: number;
}

export function AnimatedHeadline({ 
  text, 
  delay = 0, 
  duration = 0.8,
  distance = 20
}: AnimatedHeadlineProps) {
  return (
    <motion.span 
      className="text-white font-bold block"
      initial={{ opacity: 0, y: distance }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: duration,
        delay: delay,
        ease: [0.25, 0.4, 0.25, 1] // Smooth easing curve
      }}
    >
      {text}
    </motion.span>
  );
}
