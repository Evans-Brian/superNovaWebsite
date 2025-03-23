'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

// Different stellar phases with their corresponding properties
const stellarPhases = {
  nebula: {
    name: 'Nebula',
    colors: {
      primary: 'rgba(102, 57, 218, 0.8)', // Purple
      secondary: 'rgba(236, 72, 153, 0.5)', // Pink
      accent: 'rgba(49, 46, 129, 0.7)', // Indigo
    },
    particleCount: 80,
    pulsation: 1.5,
    speed: 0.6,
  },
  protostar: {
    name: 'Protostar',
    colors: {
      primary: 'rgba(220, 38, 38, 0.8)', // Red
      secondary: 'rgba(252, 211, 77, 0.5)', // Yellow
      accent: 'rgba(180, 83, 9, 0.7)', // Orange
    },
    particleCount: 60,
    pulsation: 2.0,
    speed: 0.8,
  },
  mainSequence: {
    name: 'Main Sequence',
    colors: {
      primary: 'rgba(252, 211, 77, 0.8)', // Yellow
      secondary: 'rgba(59, 130, 246, 0.5)', // Blue
      accent: 'rgba(253, 186, 116, 0.7)', // Light Orange
    },
    particleCount: 50,
    pulsation: 1.2,
    speed: 0.4,
  },
  redGiant: {
    name: 'Red Giant',
    colors: {
      primary: 'rgba(220, 38, 38, 0.8)', // Red
      secondary: 'rgba(252, 211, 77, 0.5)', // Yellow
      accent: 'rgba(239, 68, 68, 0.7)', // Lighter Red
    },
    particleCount: 90,
    pulsation: 3.0,
    speed: 0.3,
  },
  supernova: {
    name: 'Supernova',
    colors: {
      primary: 'rgba(219, 39, 119, 0.8)', // Pink
      secondary: 'rgba(79, 70, 229, 0.5)', // Indigo
      accent: 'rgba(236, 72, 153, 0.7)', // Lighter Pink
    },
    particleCount: 120,
    pulsation: 4.0,
    speed: 1.2,
  },
};

// Map service types to stellar phases
const serviceStarMap = {
  voice: 'nebula',
  process: 'mainSequence',
  integration: 'supernova',
};

interface StellarLifecycleCardProps {
  title: string;
  description: string;
  icon: string;
  link: string;
}

export default function StellarLifecycleCard({ title, description, icon, link }: StellarLifecycleCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const animationFrameId = useRef<number | null>(null);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  
  // Get the initial stellar phase based on service type
  const initialPhase = serviceStarMap[icon as keyof typeof serviceStarMap] || 'nebula';
  const [currentPhase, setCurrentPhase] = useState(initialPhase);
  
  const phaseKeys = Object.keys(stellarPhases);
  
  // Phase transition on extended hover
  useEffect(() => {
    if (isHovered && timeoutId.current === null) {
      // Start phase transition sequence
      timeoutId.current = setTimeout(() => {
        const nextIndex = (phaseIndex + 1) % phaseKeys.length;
        setPhaseIndex(nextIndex);
        setCurrentPhase(phaseKeys[nextIndex]);
        timeoutId.current = null;
      }, 3000); // Transition every 3 seconds while hovered
    } else if (!isHovered) {
      // Reset to the service's default phase when not hovered
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
        timeoutId.current = null;
      }
      
      // Delay returning to initial phase for a smoother experience
      setTimeout(() => {
        setCurrentPhase(initialPhase);
        // Find the index of the initial phase
        const initialIndex = phaseKeys.indexOf(initialPhase);
        setPhaseIndex(initialIndex >= 0 ? initialIndex : 0);
      }, 500);
    }
    
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, [isHovered, phaseIndex, initialPhase, phaseKeys]);
  
  // Initialize and manage the stellar animation
  useEffect(() => {
    if (!canvasRef.current || !cardRef.current) return;
    
    const canvas = canvasRef.current;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Set canvas dimensions
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Phase configuration
    const phase = stellarPhases[currentPhase as keyof typeof stellarPhases];
    
    // Create particles
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      alpha: number;
      cycle: number;
      phase: number;
    }> = [];
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    for (let i = 0; i < phase.particleCount; i++) {
      // Create a spiral pattern
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * (canvas.width / 2.5);
      
      // Distribute particles in a spiral
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      
      // Assign random properties
      const colorRand = Math.random();
      let color;
      
      if (colorRand < 0.5) {
        color = phase.colors.primary;
      } else if (colorRand < 0.8) {
        color = phase.colors.secondary;
      } else {
        color = phase.colors.accent;
      }
      
      particles.push({
        x,
        y,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * phase.speed,
        speedY: (Math.random() - 0.5) * phase.speed,
        color,
        alpha: Math.random() * 0.7 + 0.3,
        cycle: Math.random() * 10, // Random starting point in pulsation cycle
        phase: Math.random() * Math.PI * 2, // Random phase offset
      });
    }
    
    let time = 0;
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      time += 0.01;
      
      // Draw stellar core (central glow)
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, canvas.width / 4
      );
      
      gradient.addColorStop(0, phase.colors.primary.replace('0.8', `${0.7 + Math.sin(time) * 0.3}`));
      gradient.addColorStop(0.5, phase.colors.secondary.replace('0.5', `${0.3 + Math.sin(time * 0.8) * 0.2}`));
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, canvas.width / 3, 0, Math.PI * 2);
      ctx.fill();
      
      // Update and draw particles
      particles.forEach(particle => {
        // Update particle cycle
        particle.cycle += 0.02;
        
        // Pulsation effect based on phase
        const pulseFactor = 1 + Math.sin(particle.cycle * phase.pulsation + particle.phase) * 0.3;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(
          particle.x, 
          particle.y, 
          particle.size * pulseFactor * (isHovered ? 1.5 : 1), 
          0, 
          Math.PI * 2
        );
        
        // Apply color with pulsating alpha
        const alphaFactor = isHovered ? 
          (particle.alpha * (0.8 + Math.sin(particle.cycle * 2) * 0.2)) : 
          (particle.alpha * (0.6 + Math.sin(particle.cycle) * 0.1));
        
        ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, `${alphaFactor})`);
        ctx.fill();
        
        // Move particles in orbital-like motion
        const dx = particle.x - centerX;
        const dy = particle.y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 5) { // Avoid division by zero
          // Orbital motion factor (stronger for particles further from center)
          const orbital = 0.01 * (isHovered ? 1.5 : 1);
          
          // Move perpendicular to radius with small inward/outward drift
          particle.x += -dy / distance * orbital * distance + particle.speedX;
          particle.y += dx / distance * orbital * distance + particle.speedY;
          
          // Slowly drift toward or away from center based on phase
          const drift = (Math.sin(time + particle.phase) * 0.2) * phase.speed;
          particle.x += (dx / distance) * drift;
          particle.y += (dy / distance) * drift;
        }
        
        // Keep particles within bounds with slight bounce effect
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -0.8;
          particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        }
        
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -0.8;
          particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        }
        
        // Gradually slow particles down
        particle.speedX *= 0.99;
        particle.speedY *= 0.99;
        
        // Occasionally give particles small random impulses
        if (Math.random() < 0.01) {
          particle.speedX += (Math.random() - 0.5) * 0.2 * phase.speed;
          particle.speedY += (Math.random() - 0.5) * 0.2 * phase.speed;
        }
      });
      
      // Continue animation
      animationFrameId.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!cardRef.current || !canvasRef.current) return;
      
      const newRect = cardRef.current.getBoundingClientRect();
      canvas.width = newRect.width;
      canvas.height = newRect.height;
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup animation on unmount or phase change
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [currentPhase, isHovered]);
  
  // Get phase-specific styles
  const phaseStyle = stellarPhases[currentPhase as keyof typeof stellarPhases];

  return (
    <Link 
      href={link}
      className="block h-full"
    >
      <div 
        ref={cardRef}
        className="relative h-full overflow-hidden rounded-lg transition-all duration-700 cursor-pointer bg-neutral-900"
        style={{
          boxShadow: isHovered 
            ? `0 0 25px ${phaseStyle.colors.primary}, inset 0 0 15px ${phaseStyle.colors.secondary}` 
            : `0 0 15px ${phaseStyle.colors.primary.replace('0.8', '0.4')}, inset 0 0 8px ${phaseStyle.colors.secondary.replace('0.5', '0.2')}`,
          transform: isHovered ? 'scale(1.03)' : 'scale(1)',
          transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Canvas for star animation */}
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none"
        />
        
        {/* Content container with glass effect */}
        <div 
          className="absolute inset-0 rounded-lg overflow-hidden"
          style={{
            background: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(4px)',
            opacity: 0.9,
            transition: 'opacity 0.5s ease'
          }}
        >
          {/* Phase Label - visible on hover */}
          <div 
            className="absolute top-3 right-3 px-2 py-1 rounded text-xs font-bold transition-opacity duration-500"
            style={{
              backgroundColor: phaseStyle.colors.primary,
              opacity: isHovered ? 0.9 : 0,
            }}
          >
            {phaseStyle.name}
          </div>
          
          {/* Card Content */}
          <div className="relative p-6 h-full flex flex-col z-10">
            <div 
              className="flex items-center justify-center w-12 h-12 rounded-md text-white mb-4 relative"
              style={{ 
                backgroundColor: phaseStyle.colors.primary.replace('0.8', '1'),
                boxShadow: isHovered 
                  ? `0 0 15px ${phaseStyle.colors.primary}` 
                  : `0 0 5px ${phaseStyle.colors.primary.replace('0.8', '0.4')}`,
                transition: 'all 0.5s ease'
              }}
            >
              {icon === 'voice' && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              )}
              {icon === 'process' && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              )}
              {icon === 'integration' && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              )}
            </div>
            
            <h3 
              className="text-xl font-semibold text-white mb-2"
              style={{ 
                textShadow: `0 0 10px ${phaseStyle.colors.accent}`,
                transition: 'text-shadow 0.5s ease'
              }}
            >
              {title}
            </h3>
            
            <p className="text-gray-300 relative">
              {description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
