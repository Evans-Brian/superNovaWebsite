'use client';

import Link from 'next/link';
import { useState, useRef, useEffect, useCallback } from 'react';

interface NebulaDepthCardProps {
  title: string;
  description: string;
  icon: string;
  link: string;
}

export default function NebulaDepthCard({ title, description, icon, link }: NebulaDepthCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cardDimensions, setCardDimensions] = useState({ width: 0, height: 0, left: 0, top: 0 });
  // State to store parent section's cards heights
  const [sectionCardsHeight, setSectionCardsHeight] = useState<number | null>(null);
  
  const updateCardDimensions = useCallback(() => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setCardDimensions({
        width: rect.width,
        height: rect.height,
        left: rect.left,
        top: rect.top
      });
    }
  }, []);
  
  // Find all cards in the same section and equalize heights
  const equalizeCardHeights = useCallback(() => {
    if (cardRef.current) {
      // Find the parent section element (usually a div with grid class)
      const parentSection = cardRef.current.closest('.grid') || cardRef.current.parentElement;
      
      if (parentSection) {
        // Find all cards with the same data-card-type in this section
        const sameTypeCards = parentSection.querySelectorAll('[data-card-type="Our Services Service Cards"]');
        
        if (sameTypeCards.length > 1) {
          // Find the maximum natural height of all cards
          let maxHeight = 0;
          
          sameTypeCards.forEach((card) => {
            // Temporarily remove fixed height to measure natural height
            const cardElement = card as HTMLElement;
            const originalHeight = cardElement.style.height;
            cardElement.style.height = 'auto';
            
            const height = cardElement.getBoundingClientRect().height;
            maxHeight = Math.max(maxHeight, height);
            
            // Restore original height
            cardElement.style.height = originalHeight;
          });
          
          // Set all cards to the maximum height
          if (maxHeight > 0) {
            setSectionCardsHeight(maxHeight);
          }
        }
      }
    }
  }, []);
  
  // Handle mouse movement for parallax effect
  const handleMouseMove = (e: MouseEvent) => {
    if (!cardRef.current) return;
    
    // Calculate mouse position relative to card center
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Normalize values between -1 and 1
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    
    setMousePosition({ x, y });
  };
  
  // Get a random nebula color
  const getRandomNebulaColor = useCallback((): string => {
    const colors = [
      'rgba(102, 57, 218', // Purple
      'rgba(66, 153, 225', // Blue
      'rgba(236, 72, 153', // Pink
      'rgba(49, 46, 129', // Indigo
      'rgba(112, 26, 117' // Violet
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }, []);
  
  // Particles animation setup - using useCallback to avoid dependency issues
  const initializeParticles = useCallback(() => {
    const canvas = particlesRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = cardDimensions.width;
    canvas.height = cardDimensions.height;
    
    // Create particles
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speed: number;
      color: string;
      alpha: number;
    }> = [];
    
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.5 + 0.1,
        color: getRandomNebulaColor(),
        alpha: Math.random() * 0.5 + 0.1
      });
    }
    
    // Animation loop
    let animationFrameId: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw particles
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace(')', `, ${particle.alpha})`);
        ctx.fill();
        
        // Move particles
        particle.y -= particle.speed;
        
        // Reset particles that go out of bounds
        if (particle.y < -particle.size) {
          particle.y = canvas.height + particle.size;
          particle.x = Math.random() * canvas.width;
        }
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup animation on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [cardDimensions.width, cardDimensions.height, getRandomNebulaColor]);

  // Initialize card dimensions, particles, and equalize heights
  useEffect(() => {
    // Ensure this code only runs on the client side, not during server-side rendering
    if (typeof window === 'undefined') return;
    
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setCardDimensions({
        width: rect.width,
        height: rect.height,
        left: rect.left,
        top: rect.top
      });
      
      // Initialize particles canvas
      initializeParticles();
    }
    
    // Initial height equalization
    equalizeCardHeights();
    
    // Update dimensions on resize
    const handleResize = () => {
      updateCardDimensions();
      // Reset height to auto before recalculating
      setSectionCardsHeight(null);
      setTimeout(equalizeCardHeights, 100); // Small delay to ensure DOM updates
    };
    
    window.addEventListener('resize', handleResize);
    // Trigger height equalization after content is fully loaded
    window.addEventListener('load', equalizeCardHeights);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', equalizeCardHeights);
    };
  }, [initializeParticles, updateCardDimensions, equalizeCardHeights]);
  
  // Calculate 3D transform based on mouse position
  const getTransform = () => {
    if (!isHovered) return '';
    
    const rotateX = mousePosition.y * 10; // -10 to 10 degrees
    const rotateY = mousePosition.x * -10; // -10 to 10 degrees
    
    return `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };
  
  // Calculate parallax movement for layers
  const getLayerTransform = (depth: number) => {
    const factor = depth * 10; // Adjust this value to increase/decrease effect
    const translateX = mousePosition.x * factor;
    const translateY = mousePosition.y * factor;
    
    return `translate(${translateX}px, ${translateY}px)`;
  };

  return (
    <Link 
      href={link}
      className="block h-full"
    >
      <div 
        ref={cardRef}
        className="Our Services Service Cards relative overflow-hidden rounded-lg transition-all duration-300 cursor-pointer transform-gpu"
        style={{
          height: sectionCardsHeight ? `${sectionCardsHeight}px` : '100%',
          transform: getTransform(),
          transformStyle: 'preserve-3d',
          transition: 'transform 0.2s ease-out'
        }}
        data-card-type="Our Services Service Cards"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={(e) => handleMouseMove(e.nativeEvent)}
      >
        {/* Background layer (depth 1) */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-950 rounded-lg"
          style={{
            transform: getLayerTransform(1),
            zIndex: 1
          }}
        />
        
        {/* Particles canvas layer (depth 0.8) */}
        <canvas 
          ref={particlesRef}
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            transform: getLayerTransform(0.8),
            zIndex: 2
          }}
        />
        
        {/* Glass morphism effect layer (depth 0.6) */}
        <div 
          className="absolute inset-0 rounded-lg opacity-60"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%)',
            backdropFilter: 'blur(4px)',
            transform: getLayerTransform(0.6),
            zIndex: 3
          }}
        />
        
        {/* Content layer (depth 0.4) */}
        <div 
          className="relative p-6 h-full flex flex-col"
          style={{
            transform: getLayerTransform(0.4),
            zIndex: 4
          }}
        >
          {/* Depth effect for the icon */}
          <div 
            className="flex items-center justify-center w-12 h-12 rounded-md text-white mb-4 shadow-lg relative"
            style={{ 
              backgroundColor: 'rgb(102, 57, 218)',
              transform: `translateZ(${isHovered ? '10px' : '0px'})`,
              transition: 'transform 0.3s ease-out',
              zIndex: 5
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
          
          {/* Title with depth effect */}
          <h3 
            className="text-xl font-semibold text-white mb-2 relative"
            style={{ 
              transform: `translateZ(${isHovered ? '15px' : '0px'})`,
              transition: 'transform 0.3s ease-out',
              textShadow: isHovered ? '0 0 8px rgba(255,255,255,0.3)' : 'none'
            }}
          >
            {title}
          </h3>
          
          {/* Description with depth effect */}
          <p 
            className="text-gray-300 relative"
            style={{ 
              transform: `translateZ(${isHovered ? '5px' : '0px'})`,
              transition: 'transform 0.3s ease-out'
            }}
          >
            {description}
          </p>
        </div>
        
        {/* Edge glow effect - visible on hover */}
        <div 
          className="absolute inset-0 rounded-lg pointer-events-none transition-opacity duration-300"
          style={{
            boxShadow: 'inset 0 0 20px rgba(102, 57, 218, 0.5)',
            opacity: isHovered ? 0.8 : 0,
            zIndex: 5
          }}
        />
      </div>
    </Link>
  );
}
