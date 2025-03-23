'use client';

import { useRef, useEffect, useState } from 'react';

interface Point {
  x: number;
  y: number;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  targetIndex: number;
  sourceIndex: number;
  progress: number;
  color: string;
  opacity: number;
  isRandomParticle?: boolean;
  timeToLive?: number;
}

interface Connection {
  source: number;
  target: number;
  currentOpacity: number;
  targetOpacity: number;
}

interface ConstellationNetworkProps {
  cardRefs: React.RefObject<HTMLDivElement | null>[];
  activeCardIndex: number | null;
}

export default function ConstellationNetwork({ cardRefs, activeCardIndex }: ConstellationNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const particles = useRef<Particle[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const cardCenters = useRef<Point[]>([]);
  const lastUpdateTime = useRef<number>(0);
  const nextRandomParticleTime = useRef<number>(0);
  const connections = useRef<Connection[]>([]);
  const previousActiveIndex = useRef<number | null>(null);

  // Generate a random color within our theme palette
  const getRandomColor = () => {
    const colors = [
      'rgba(102, 57, 218, 0.8)', // Purple
      'rgba(66, 153, 225, 0.8)', // Blue
      'rgba(236, 72, 153, 0.8)',  // Pink
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Initialize canvas and resize handler
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current && canvasRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
        canvasRef.current.width = width;
        canvasRef.current.height = height;
      }
    };

    // Initial setup
    updateDimensions();

    // Handle resize
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Calculate the center points of each card
  useEffect(() => {
    const updateCardCenters = () => {
      const newCardCenters: Point[] = [];
      const containerRect = containerRef.current?.getBoundingClientRect();
      
      if (!containerRect) return;
      
      cardRefs.forEach(ref => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          newCardCenters.push({
            x: rect.left + rect.width / 2 - containerRect.left,
            y: rect.top + rect.height / 2 - containerRect.top
          });
        }
      });
      
      cardCenters.current = newCardCenters;
      
      // Initialize particles when card centers are calculated
      if (newCardCenters.length > 0 && particles.current.length === 0) {
        initializeParticles();
      }
    };
    
    updateCardCenters();
    
    // Update centers when window is resized
    window.addEventListener('resize', updateCardCenters);
    return () => window.removeEventListener('resize', updateCardCenters);
  }, [cardRefs]);

  // Initialize particles
  const initializeParticles = () => {
    const centers = cardCenters.current;
    if (centers.length < 2) return;
    
    const newParticles: Particle[] = [];
    
    // Create background particles for each connection between cards
    for (let i = 0; i < centers.length; i++) {
      for (let j = i + 1; j < centers.length; j++) {
        // Create particles going from i to j
        for (let k = 0; k < 2; k++) {
          newParticles.push({
            x: centers[i].x,
            y: centers[i].y,
            size: Math.random() * 2 + 1,
            speedX: 0,
            speedY: 0,
            sourceIndex: i,
            targetIndex: j,
            progress: Math.random(), // Random start position along the path
            color: getRandomColor(),
            opacity: 0.3 + Math.random() * 0.5
          });
          
          // Create particles going from j to i
          newParticles.push({
            x: centers[j].x,
            y: centers[j].y,
            size: Math.random() * 2 + 1,
            speedX: 0,
            speedY: 0,
            sourceIndex: j,
            targetIndex: i,
            progress: Math.random(), // Random start position
            color: getRandomColor(),
            opacity: 0.3 + Math.random() * 0.5
          });
        }
      }
    }
    
    particles.current = newParticles;
  };

  // Generate random particles from a random node
  const generateRandomParticles = (timestamp: number) => {
    if (timestamp < nextRandomParticleTime.current) return;
    
    // Set next particle generation time (more infrequent - doubled time)
    nextRandomParticleTime.current = timestamp + Math.random() * 6000 + 4000; // 4-10 seconds
    
    const centers = cardCenters.current;
    if (centers.length < 2) return;
    
    // Pick a random source node
    const sourceIdx = Math.floor(Math.random() * centers.length);
    
    // Generate 1-3 particles from this node
    const particleCount = Math.floor(Math.random() * 3) + 1;
    
    for (let i = 0; i < particleCount; i++) {
      // Pick a random target (that's not the source)
      let targetIdx;
      do {
        targetIdx = Math.floor(Math.random() * centers.length);
      } while (targetIdx === sourceIdx);
      
      particles.current.push({
        x: centers[sourceIdx].x,
        y: centers[sourceIdx].y,
        size: Math.random() * 2 + 1,
        speedX: 0,
        speedY: 0,
        sourceIndex: sourceIdx,
        targetIndex: targetIdx,
        progress: 0,
        color: getRandomColor(),
        opacity: 0.5 + Math.random() * 0.5,
        isRandomParticle: true,
        timeToLive: 1 // Will complete one full journey
      });
    }
  };

  // Generate particles from active card
  const generateActiveCardParticles = (timestamp: number, activeIndex: number) => {
    // Only generate a new particle every 200-400ms
    if (Math.random() > 0.05) return; // About 5% chance per frame (at 60fps)
    
    const centers = cardCenters.current;
    if (centers.length < 2) return;
    
    // Find all possible targets (all cards except the active one)
    const possibleTargets = centers
      .map((_, idx) => idx)
      .filter(idx => idx !== activeIndex);
    
    if (possibleTargets.length === 0) return;
    
    // Get a random target
    const targetIdx = possibleTargets[Math.floor(Math.random() * possibleTargets.length)];
    
    // Create a new particle
    particles.current.push({
      x: centers[activeIndex].x,
      y: centers[activeIndex].y,
      size: Math.random() * 2.5 + 1.5, // Slightly larger
      speedX: 0,
      speedY: 0,
      sourceIndex: activeIndex,
      targetIndex: targetIdx,
      progress: 0,
      color: getRandomColor(),
      opacity: 0.6 + Math.random() * 0.4, // Brighter
      isRandomParticle: false,
      timeToLive: 1 // Will complete one full journey
    });
  };

  // Main animation loop
  useEffect(() => {
    if (!canvasRef.current || cardCenters.current.length < 2) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = (timestamp: number) => {
      if (!lastUpdateTime.current) {
        lastUpdateTime.current = timestamp;
      }
      
      const deltaTime = timestamp - lastUpdateTime.current;
      lastUpdateTime.current = timestamp;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections
      drawConnections(ctx, activeCardIndex);
      
      // Generate random particles occasionally
      generateRandomParticles(timestamp);
      
      // Generate particles from active card if there is one
      if (activeCardIndex !== null) {
        generateActiveCardParticles(timestamp, activeCardIndex);
      }
      
      // Update and draw particles
      updateParticles(deltaTime / 1000, activeCardIndex);
      drawParticles(ctx);
      
      // Continue animation loop
      animationFrameId.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animationFrameId.current = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [dimensions, activeCardIndex]);

  // Initialize connections
  useEffect(() => {
    // Function to initialize connections based on current card centers
    const initializeConnections = () => {
      if (cardCenters.current.length < 2) return;
      
      const newConnections: Connection[] = [];
      const centers = cardCenters.current;
      
      for (let i = 0; i < centers.length; i++) {
        for (let j = i + 1; j < centers.length; j++) {
          // Default opacity for all connections is 0.15
          newConnections.push({
            source: i,
            target: j,
            currentOpacity: 0.15,
            targetOpacity: 0.15
          });
        }
      }
      
      connections.current = newConnections;
    };
    
    // Initialize connections when component mounts and when cardRefs changes
    initializeConnections();
    
    // Adding cardRefs as a dependency since that's what determines the card centers
  }, [cardRefs]);
  
  // Update target opacities when active card changes
  useEffect(() => {
    if (connections.current.length === 0) return;
    
    connections.current.forEach(connection => {
      // Default opacity
      let newTargetOpacity = 0.15;
      
      if (activeCardIndex !== null) {
        // If one of the connected cards is active, make the line more visible
        if (connection.source === activeCardIndex || connection.target === activeCardIndex) {
          newTargetOpacity = 0.6; // Increased for more dramatic effect
        } else {
          newTargetOpacity = 0.03; // Even dimmer for better contrast
        }
      }
      
      // Update the target opacity
      connection.targetOpacity = newTargetOpacity;
    });
    
    // Update previous active index
    previousActiveIndex.current = activeCardIndex;
  }, [activeCardIndex]);
  
  // Draw connections between card centers
  const drawConnections = (ctx: CanvasRenderingContext2D, activeIndex: number | null) => {
    const centers = cardCenters.current;
    
    ctx.lineWidth = 1;
    
    // Update connection opacities with animation
    connections.current.forEach(connection => {
      // Animation speed - exactly 2 seconds transition
      const fadeSpeed = 0.0083; // Exactly 120 frames (2 seconds at 60fps) for full transition
      
      // Calculate the new current opacity - move towards target
      if (connection.currentOpacity < connection.targetOpacity) {
        connection.currentOpacity = Math.min(
          connection.currentOpacity + fadeSpeed,
          connection.targetOpacity
        );
      } else if (connection.currentOpacity > connection.targetOpacity) {
        connection.currentOpacity = Math.max(
          connection.currentOpacity - fadeSpeed,
          connection.targetOpacity
        );
      }
      
      // Get source and target points
      const sourcePoint = centers[connection.source];
      const targetPoint = centers[connection.target];
      
      // Create gradient with current opacity
      const gradient = ctx.createLinearGradient(
        sourcePoint.x, sourcePoint.y, 
        targetPoint.x, targetPoint.y
      );
      gradient.addColorStop(0, `rgba(102, 57, 218, ${connection.currentOpacity})`);
      gradient.addColorStop(0.5, `rgba(66, 153, 225, ${connection.currentOpacity})`);
      gradient.addColorStop(1, `rgba(236, 72, 153, ${connection.currentOpacity})`);
      
      ctx.strokeStyle = gradient;
      
      // Draw the connection line
      ctx.beginPath();
      ctx.moveTo(sourcePoint.x, sourcePoint.y);
      ctx.lineTo(targetPoint.x, targetPoint.y);
      ctx.stroke();
    });
  };

  // Update particle positions
  const updateParticles = (deltaTime: number, activeIndex: number | null) => {
    const centers = cardCenters.current;
    if (centers.length === 0) return;
    
    // Filter out expired particles
    particles.current = particles.current.filter(particle => {
      // Keep all regular particles or those with remaining lifetime
      return particle.timeToLive === undefined || particle.timeToLive > 0;
    });
    
    particles.current.forEach(particle => {
      const startIdx = particle.sourceIndex;
      const endIdx = particle.targetIndex;
      
      // Check if either endpoint is the active card
      const isActive = activeIndex !== null && 
        (startIdx === activeIndex || endIdx === activeIndex);
      
      // Speed modifier based on whether this particle is connected to active card
      let speedModifier = 0.2; // Base speed
      
      if (particle.isRandomParticle) {
        speedModifier = 0.3; // Random particles move slightly faster
      } else if (isActive) {
        speedModifier = 0.4; // Active particles move even faster
      }
      
      // Update progress along the path
      particle.progress += speedModifier * deltaTime;
      
      if (particle.progress >= 1) {
        // Handle completion based on particle type
        if (particle.timeToLive !== undefined) {
          // Decrement lifetime for special particles
          particle.timeToLive -= 1;
          
          if (particle.timeToLive <= 0) {
            // This particle will be filtered out in the next update
            return;
          }
        }
        
        // Reset to start position
        particle.progress = 0;
        
        // Randomly vary the particle appearance on reset
        particle.size = Math.random() * 2 + 1;
        particle.opacity = 0.3 + Math.random() * 0.5;
      }
      
      // Calculate new position using linear interpolation
      if (startIdx < centers.length && endIdx < centers.length) {
        const startPos = centers[startIdx];
        const endPos = centers[endIdx];
        
        particle.x = startPos.x + (endPos.x - startPos.x) * particle.progress;
        particle.y = startPos.y + (endPos.y - startPos.y) * particle.progress;
      }
    });
  };

  // Draw all particles
  const drawParticles = (ctx: CanvasRenderingContext2D) => {
    particles.current.forEach(particle => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      
      // Use the particle's color and opacity
      ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, `${particle.opacity})`);
      ctx.fill();
    });
  };

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 overflow-hidden pointer-events-none z-10"
    >
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0"
      />
    </div>
  );
}
