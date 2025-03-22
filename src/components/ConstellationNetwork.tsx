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
  progress: number;
  color: string;
  opacity: number;
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
    const particleCount = 24; // 2 particles per connection
    
    // Create particles for each connection between cards
    for (let i = 0; i < centers.length; i++) {
      for (let j = i + 1; j < centers.length; j++) {
        // Create particles going from i to j
        for (let k = 0; k < 3; k++) {
          newParticles.push({
            x: centers[i].x,
            y: centers[i].y,
            size: Math.random() * 2 + 1,
            speedX: 0,
            speedY: 0,
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

  // Draw connections between card centers
  const drawConnections = (ctx: CanvasRenderingContext2D, activeIndex: number | null) => {
    const centers = cardCenters.current;
    
    ctx.lineWidth = 1;
    
    for (let i = 0; i < centers.length; i++) {
      for (let j = i + 1; j < centers.length; j++) {
        // Calculate connection opacity based on active card
        let opacity = 0.15;
        
        if (activeIndex !== null) {
          // If one of the connected cards is active, make the line more visible
          if (i === activeIndex || j === activeIndex) {
            opacity = 0.4;
          } else {
            opacity = 0.05; // Dim other lines
          }
        }
        
        // Create gradient
        const gradient = ctx.createLinearGradient(
          centers[i].x, centers[i].y, 
          centers[j].x, centers[j].y
        );
        gradient.addColorStop(0, `rgba(102, 57, 218, ${opacity})`);
        gradient.addColorStop(0.5, `rgba(66, 153, 225, ${opacity})`);
        gradient.addColorStop(1, `rgba(236, 72, 153, ${opacity})`);
        
        ctx.strokeStyle = gradient;
        
        // Draw the connection line
        ctx.beginPath();
        ctx.moveTo(centers[i].x, centers[i].y);
        ctx.lineTo(centers[j].x, centers[j].y);
        ctx.stroke();
      }
    }
  };

  // Update particle positions
  const updateParticles = (deltaTime: number, activeIndex: number | null) => {
    const centers = cardCenters.current;
    
    particles.current.forEach(particle => {
      const startIdx = getParticleStartIndex(particle);
      const endIdx = particle.targetIndex;
      
      // Check if either endpoint is the active card
      const isActive = activeIndex !== null && 
        (startIdx === activeIndex || endIdx === activeIndex);
      
      // Speed modifier based on whether this particle is connected to active card
      const speedModifier = isActive ? 0.4 : 0.2;
      
      // Update progress along the path
      particle.progress += speedModifier * deltaTime;
      if (particle.progress >= 1) {
        // Reset to start position when reaching end
        particle.progress = 0;
        
        // Randomly vary the particle appearance on reset
        particle.size = Math.random() * 2 + 1;
        particle.opacity = 0.3 + Math.random() * 0.5;
      }
      
      // Calculate new position using linear interpolation
      const startPos = centers[startIdx];
      const endPos = centers[endIdx];
      
      particle.x = startPos.x + (endPos.x - startPos.x) * particle.progress;
      particle.y = startPos.y + (endPos.y - startPos.y) * particle.progress;
    });
  };

  // Get the starting index for a particle based on its current position
  const getParticleStartIndex = (particle: Particle): number => {
    // Find all cards that are not the target
    const possibleIndices = cardCenters.current
      .map((_, idx) => idx)
      .filter(idx => idx !== particle.targetIndex);
    
    // Use the first one (this is simplified - in a more complex implementation
    // we would need to track the actual starting index)
    return possibleIndices[0] || 0;
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
