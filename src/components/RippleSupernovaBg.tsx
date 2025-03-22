"use client";

import { useState, useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  originalX: number;
  originalY: number;
  size: number;
  speed: number;
  opacity: number;
  color: string;
  // Previous positions for trail effect
  trail: Array<{x: number, y: number, opacity: number}>;
  // Velocity
  vx: number;
  vy: number;
}

export default function RippleSupernovaBg({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const mousePos = useRef({ x: -1000, y: -1000 }); // Start far off-screen
  const isMouseActiveRef = useRef(false);
  const gridOpacityRef = useRef(0); // Add opacity reference for grid fade effect
  const animationFrameId = useRef<number | undefined>(undefined);
  const gradientRef = useRef<CanvasGradient | null>(null);
  const lastTimeRef = useRef(0); // For animation timing
  
  // Initialize particles
  const initParticles = useCallback(() => {
    if (!canvasRef.current) return;
    
    const { width, height } = canvasRef.current;
    const particles: Particle[] = [];
    
    // Determine particle count based on screen size (more for larger screens)
    const particleCount = Math.min(Math.floor((width * height) / 10000), 200);
    
    // Supernova color palette
    const colors = ['#ffffff', '#d1e1f9', '#a6c1ee', '#8183e2', '#7744bb'];
    
    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      
      const colorIndex = Math.floor(Math.random() * colors.length);
      const color = colors[colorIndex];
      
      particles.push({
        x: x,
        y: y,
        originalX: x,
        originalY: y,
        size: Math.random() * 2.5 + 0.5,
        speed: Math.random() * 0.3 + 0.1,
        opacity: Math.random() * 0.5 + 0.3,
        color: color,
        vx: 0,
        vy: 0,
        trail: []
      });
    }
    
    particlesRef.current = particles;
  }, []);
  
  // Setup canvas and window resize handler
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current && canvasRef.current) {
        const width = containerRef.current.offsetWidth;
        const height = containerRef.current.offsetHeight;
        
        setDimensions({ width, height });
        
        // Update canvas size
        canvasRef.current.width = width;
        canvasRef.current.height = height;
        
        // Reinitialize particles when dimensions change
        initParticles();
        
        // Reset gradient cache
        gradientRef.current = null;
      }
    };
    
    // Initial dimensions
    updateDimensions();
    
    // Update dimensions on window resize
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [initParticles]);
  
  // Handle mouse movement
  useEffect(() => {
    // Create a function to check if the mouse is near the navbar
    const isMouseNearNavbar = (y: number): boolean => {
      // Top area where navbar is located (first ~80px)
      return y < 80;
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Only activate animation if mouse is NOT near the navbar
        if (!isMouseNearNavbar(e.clientY)) {
          mousePos.current = {
            x: mouseX,
            y: mouseY
          };
          isMouseActiveRef.current = true;
        } else {
          // If mouse is near navbar, deactivate the effect
          isMouseActiveRef.current = false;
        }
      }
    };
    
    const handleMouseLeave = () => {
      // Fade out the effect
      isMouseActiveRef.current = false;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (containerRef.current && e.touches.length > 0) {
        const rect = containerRef.current.getBoundingClientRect();
        const touch = e.touches[0];
        const touchY = touch.clientY;
        
        // Only activate for touches not near the navbar
        if (!isMouseNearNavbar(touchY)) {
          mousePos.current = {
            x: touch.clientX - rect.left,
            y: touch.clientY - rect.top
          };
          isMouseActiveRef.current = true;
          
          // Prevent scrolling while interacting with the canvas
          e.preventDefault();
        }
      }
    };
    
    const handleTouchEnd = () => {
      isMouseActiveRef.current = false;
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
      container.addEventListener('touchmove', handleTouchMove, { passive: false });
      container.addEventListener('touchend', handleTouchEnd);
    }
    
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, []);
  
  
  // Get the time warp effect parameters
  const getDistortionFactors = useCallback((x: number, y: number, mouseX: number, mouseY: number) => {
    // Calculate distance to mouse
    const dx = x - mouseX;
    const dy = y - mouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Calculate distortion strength inversely proportional to distance
    // Stronger effect closer to mouse, fading with distance
    const maxRadius = 200; // Maximum radius of effect
    const strength = Math.max(0, 1 - distance / maxRadius);
    
    // Calculate normalized direction vector
    const angle = Math.atan2(dy, dx);
    
    // Return calculated distortion values
    return {
      strength,
      distance,
      angle,
      normalizedDx: dx / (distance || 1),
      normalizedDy: dy / (distance || 1),
    };
  }, []);
  
  // Animation loop
  useEffect(() => {
    const draw = (timestamp: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const { width, height } = canvas;
      
      // Calculate delta time for animations
      const deltaTime = timestamp - (lastTimeRef.current || timestamp);
      lastTimeRef.current = timestamp;
      
      // Update grid opacity with smooth transition
      // For a 2 second fade duration: 1/2000ms = 0.0005 opacity per ms
      // At 60fps, deltaTime ≈ 16.67ms, so fadeSpeed ≈ 0.0083 (0.0005 * 16.67)
      const fadeSpeed = 0.0005; // Speed of fade transition (opacity per ms for 2 second duration)
      
      if (isMouseActiveRef.current) {
        // Fade in grid when mouse is active
        gridOpacityRef.current = Math.min(1, gridOpacityRef.current + fadeSpeed * deltaTime);
      } else {
        // Fade out grid when mouse is inactive
        gridOpacityRef.current = Math.max(0, gridOpacityRef.current - fadeSpeed * deltaTime);
      }
      
      // Create supernova gradient if not cached
      if (!gradientRef.current) {
        // Recreate the original supernova-top.svg gradient
        const gradient = ctx.createRadialGradient(
          width / 2, height, 0,
          width / 2, height, height
        );
        
        gradient.addColorStop(0, "#ffffff");
        gradient.addColorStop(0.3, "#6699cc");
        gradient.addColorStop(0.6, "#7744bb");
        gradient.addColorStop(1, "#000000");
        
        gradientRef.current = gradient;
      }
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Draw supernova background
      ctx.fillStyle = gradientRef.current;
      ctx.fillRect(0, 0, width, height);
      
      // Only draw grid if it has some opacity
      if (gridOpacityRef.current > 0.01) {
        const gridSize = 50;
        const gridSpacing = width / gridSize;
        
        // Set grid line opacity based on fade state
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * gridOpacityRef.current})`;
        ctx.lineWidth = 0.5;
        
        // Draw warped grid
        for (let x = 0; x <= gridSize; x++) {
          ctx.beginPath();
          
          for (let y = 0; y <= height / gridSpacing; y++) {
            const baseX = x * gridSpacing;
            const baseY = y * gridSpacing;
            
            // Apply distortion to grid coordinates
            const { strength, normalizedDx, normalizedDy } = getDistortionFactors(
              baseX, baseY, mousePos.current.x, mousePos.current.y
            );
            
            // Non-linear distortion that creates a "warp bubble" effect
            const warpFactor = Math.pow(strength, 2) * 60;
            const distortedX = baseX - normalizedDx * warpFactor;
            const distortedY = baseY - normalizedDy * warpFactor;
            
            if (y === 0) {
              ctx.moveTo(distortedX, distortedY);
            } else {
              ctx.lineTo(distortedX, distortedY);
            }
          }
          
          ctx.stroke();
        }
        
        // Vertical grid lines
        for (let y = 0; y <= gridSize; y++) {
          ctx.beginPath();
          
          for (let x = 0; x <= width / gridSpacing; x++) {
            const baseX = x * gridSpacing;
            const baseY = y * gridSpacing;
            
            // Apply distortion
            const { strength, normalizedDx, normalizedDy } = getDistortionFactors(
              baseX, baseY, mousePos.current.x, mousePos.current.y
            );
            
            const warpFactor = Math.pow(strength, 2) * 60;
            const distortedX = baseX - normalizedDx * warpFactor;
            const distortedY = baseY - normalizedDy * warpFactor;
            
            if (x === 0) {
              ctx.moveTo(distortedX, distortedY);
            } else {
              ctx.lineTo(distortedX, distortedY);
            }
          }
          
          ctx.stroke();
        }
      }
      
      // Update trails max length - reduced by 70%
      const MAX_TRAIL_LENGTH = 2; // Was 5, now ~30% (1.5) rounded up to 2
      
      // Update and draw particles
      particlesRef.current.forEach(particle => {
        // Store previous position for trail if the particle is in the warp field
        const { strength } = getDistortionFactors(
          particle.x, particle.y, mousePos.current.x, mousePos.current.y
        );
        
        // Save velocities from previous frame for color shifting
        const prevVx = particle.vx;
        const prevVy = particle.vy;
        
        // Only add to trail if particle is affected by warp
        if (strength > 0.1 && isMouseActiveRef.current) {
          // Add current position to trail
          particle.trail.push({
            x: particle.x,
            y: particle.y,
            opacity: 0.5 * particle.opacity
          });
          
          // Limit trail length
          if (particle.trail.length > MAX_TRAIL_LENGTH) {
            particle.trail.shift();
          }
        } else {
          // Clear trail when particle is not affected
          particle.trail = [];
        }
        
        // Natural particle movement (slight drift upward)
        particle.y -= particle.speed * 0.5;
        particle.x += Math.sin(particle.y * 0.01) * 0.3;
        
        // Reset particles that go off-screen
        if (particle.y < -10) {
          particle.y = height + 10;
          particle.x = Math.random() * width;
          particle.originalX = particle.x;
          particle.originalY = particle.y;
          particle.trail = []; // Clear trail when resetting
        }
        
        // Apply space-time distortion based on mouse position
        let finalX = particle.x;
        let finalY = particle.y;
        
        if (isMouseActiveRef.current) {
          const { strength, distance, normalizedDx, normalizedDy } = getDistortionFactors(
            particle.x, particle.y, mousePos.current.x, mousePos.current.y
          );
          
          // Create a non-linear distortion effect
          // Particles closer to the mouse are affected more dramatically
          const distortionStrength = Math.pow(strength, 1.5) * 120;
          
          // Store velocities for doppler effect
          particle.vx = -normalizedDx * distortionStrength * 0.1;
          particle.vy = -normalizedDy * distortionStrength * 0.1;
          
          // Apply displacement - particles move away from mouse in a distortion field
          finalX = particle.x - normalizedDx * distortionStrength;
          finalY = particle.y - normalizedDy * distortionStrength;
          
          // Add slight rotation effect to closest particles
          if (distance < 80) {
            const rotationFactor = (80 - distance) / 80 * Math.PI / 6; // Up to 30 degrees
            const cos = Math.cos(rotationFactor);
            const sin = Math.sin(rotationFactor);
            
            // Calculate position relative to mouse for rotation
            const relX = finalX - mousePos.current.x;
            const relY = finalY - mousePos.current.y;
            
            // Apply rotation
            finalX = mousePos.current.x + relX * cos - relY * sin;
            finalY = mousePos.current.y + relX * sin + relY * cos;
          }
        }
        
        // Draw particle trail first (behind the particle)
        if (particle.trail.length > 1 && isMouseActiveRef.current) {
          ctx.beginPath();
          ctx.moveTo(particle.trail[0].x, particle.trail[0].y);
          
          // Draw trail segments
          for (let i = 1; i < particle.trail.length; i++) {
            ctx.lineTo(particle.trail[i].x, particle.trail[i].y);
          }
          
          // Connect to current position
          ctx.lineTo(finalX, finalY);
          
          // Create gradient for trail
          const trailGradient = ctx.createLinearGradient(
            particle.trail[0].x, particle.trail[0].y,
            finalX, finalY
          );
          
          trailGradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
          trailGradient.addColorStop(0.5, `${particle.color.replace(')', ', 0.2)')}`);
          trailGradient.addColorStop(1, `${particle.color.replace(')', ', 0.4)')}`);
          
          ctx.strokeStyle = trailGradient;
          // Reduced by 70%
          ctx.lineWidth = particle.size * 0.21; // 0.7 * 0.3 = 0.21
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.stroke();
        }
        
        // Draw particle
        ctx.beginPath();
        
        // Add stretched effect to particles in warp field
        if (isMouseActiveRef.current) {
          const { strength } = getDistortionFactors(
            particle.x, particle.y, mousePos.current.x, mousePos.current.y
          );
          
          if (strength > 0.1) {
            // Calculate stretch direction - away from mouse
            const stretchDirection = Math.atan2(
              particle.y - mousePos.current.y,
              particle.x - mousePos.current.x
            );
            
            // Draw elongated particle
            const stretchFactor = strength * 3;
            const stretchedSize = particle.size * (1 + stretchFactor);
            
            // Create a gradient for the stretched particle - no doppler effect
            const gradient = ctx.createLinearGradient(
              finalX - Math.cos(stretchDirection) * stretchedSize,
              finalY - Math.sin(stretchDirection) * stretchedSize,
              finalX + Math.cos(stretchDirection) * stretchedSize,
              finalY + Math.sin(stretchDirection) * stretchedSize
            );
            
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
            gradient.addColorStop(0.5, particle.color);
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            
            // Draw the stretched particle
            ctx.fillStyle = gradient;
            
            // Draw stretched ellipse
            ctx.ellipse(
              finalX, 
              finalY, 
              stretchedSize, 
              particle.size, 
              stretchDirection, 
              0, 
              Math.PI * 2
            );
          } else {
            // Regular circular particle
            ctx.arc(finalX, finalY, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
          }
        } else {
          // Regular particle when no distortion
          ctx.arc(finalX, finalY, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
        }
        
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
      });
      
      // Reset alpha
      ctx.globalAlpha = 1;
      
      // The visual circle around the cursor has been removed
      // The space-time distortion effect still applies to particles and grid
      
      // Continue animation loop
      animationFrameId.current = requestAnimationFrame(draw);
    };
    
    // Start animation loop
    animationFrameId.current = requestAnimationFrame(draw);
    
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [dimensions, getDistortionFactors]);
  
  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-hidden"
      style={{ pointerEvents: 'none', zIndex: 1 }}
    >
      {/* Interactive Canvas - pointer-events-none prevents it from capturing mouse events */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />
      
      {/* Subtle darkening overlay */}
      <div className="absolute inset-0 bg-black opacity-30 pointer-events-none"></div>
      
      {/* Content - restore pointer events for children */}
      <div className="relative z-10 w-full h-full" style={{ pointerEvents: 'auto' }}>
        {children}
      </div>
    </div>
  );
}
