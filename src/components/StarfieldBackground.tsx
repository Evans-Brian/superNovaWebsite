'use client';

import React, { useEffect, useRef } from 'react';

interface StarfieldBackgroundProps {
  children: React.ReactNode;
}

export default function StarfieldBackground({ children }: StarfieldBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const c = canvas.getContext('2d');
    if (!c) return;
    
    // Configuration
    const numStars = 1200;
    const radius = '0.' + Math.floor(Math.random() * 9) + 1;
    let focalLength = canvas.width * 2;
    let centerX: number, centerY: number;
    
    // Stars array
    let stars: Array<{
      x: number;
      y: number;
      z: number;
      o: string;
    }> = [];
    
    // Initialize the stars
    const initializeStars = () => {
      centerX = canvas.width / 2;
      centerY = canvas.height / 2;
      
      stars = [];
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * canvas.width,
          o: '0.' + Math.floor(Math.random() * 99) + 1
        });
      }
    };
    
    // Move the stars
    const moveStars = () => {
      for (let i = 0; i < numStars; i++) {
        const star = stars[i];
        // Move at a moderate speed (0.3 instead of 0.2 - 50% faster)
        star.z -= 0.3;
        
        if (star.z <= 0) {
          star.z = canvas.width;
        }
      }
    };
    
    // Draw the stars
    const drawStars = () => {
      let pixelX, pixelY, pixelRadius;
      
      // Check if parent element size has changed
      if (canvas.parentElement && 
         (canvas.width !== canvas.parentElement.offsetWidth || 
          canvas.height !== canvas.parentElement.offsetHeight)) {
        updateCanvasSize();
      }
      
      // Fill the background
      c.fillStyle = "rgba(0,10,20,1)";
      c.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw each star
      for (let i = 0; i < numStars; i++) {
        const star = stars[i];
        
        pixelX = (star.x - centerX) * (focalLength / star.z);
        pixelX += centerX;
        pixelY = (star.y - centerY) * (focalLength / star.z);
        pixelY += centerY;
        
        // Make stars smaller overall, especially when they appear closer
        pixelRadius = Math.min(0.8 * (focalLength / star.z), 2);
        
        // Draw circular stars instead of squares
        c.beginPath();
        c.arc(pixelX, pixelY, pixelRadius, 0, Math.PI * 2);
        c.fillStyle = "rgba(209, 255, 255, " + star.o + ")";
        c.fill();
      }
    };
    
    // Animation frame
    const executeFrame = () => {
      requestAnimationFrame(executeFrame);
      moveStars();
      drawStars();
    };
    
    // Get the actual dimensions of the container rather than the window
    const updateCanvasSize = () => {
      if (canvas && canvas.parentElement) {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
        focalLength = canvas.width * 2;
        initializeStars();
      }
    };
    
    // Set initial size
    updateCanvasSize();
    
    // Start the animation
    initializeStars();
    executeFrame();
    
    // Handle window resize
    const handleResize = () => {
      updateCanvasSize();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div className="relative overflow-hidden min-h-[500px]">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
}
