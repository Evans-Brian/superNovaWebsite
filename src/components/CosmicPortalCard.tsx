'use client';

import Link from 'next/link';
import { useState, useRef, useEffect, MouseEvent } from 'react';
import * as THREE from 'three';

interface CosmicPortalCardProps {
  title: string;
  description: string;
  icon: string;
  link: string;
}

export default function CosmicPortalCard({ title, description, icon, link }: CosmicPortalCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const animationRef = useRef<number | null>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene | null;
    camera: THREE.PerspectiveCamera | null;
    renderer: THREE.WebGLRenderer | null;
    material: THREE.ShaderMaterial | null;
    geometry: THREE.BufferGeometry | null;
    particles: THREE.Points | null;
    time: number;
  }>({
    scene: null,
    camera: null,
    renderer: null,
    material: null,
    geometry: null,
    particles: null,
    time: 0
  });

  // Initialize Three.js scene - wrapped in try-catch for error handling
  useEffect(() => {
    try {
    if (!canvasRef.current || !cardRef.current) return;

    const canvas = canvasRef.current;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Set canvas size
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, rect.width / rect.height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas,
      alpha: true,
      antialias: true
    });
    
    renderer.setSize(rect.width, rect.height);
    camera.position.z = 5;
    
    // Create shader for vortex/portal effect
    const portalShader = {
      uniforms: {
        time: { value: 0.0 },
        intensity: { value: 0.5 },
        resolution: { value: new THREE.Vector2(rect.width, rect.height) }
      },
      vertexShader: `
        uniform float time;
        uniform float intensity;
        
        attribute float size;
        attribute vec3 customColor;
        
        varying vec3 vColor;
        
        void main() {
          vColor = customColor;
          
          // Vortex effect - spiral motion
          float angle = time * 0.2;
          float radius = length(position.xy);
          float spiralFactor = radius * 0.5;
          
          vec3 pos = position;
          
          // Apply vortex rotation
          pos.x = position.x * cos(angle + spiralFactor) - position.y * sin(angle + spiralFactor);
          pos.y = position.x * sin(angle + spiralFactor) + position.y * cos(angle + spiralFactor);
          
          // Apply z-axis oscillation
          pos.z = position.z + sin(time * 0.5 + radius * 3.0) * intensity * 0.2;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (intensity + 0.5) * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float intensity;
        
        varying vec3 vColor;
        
        void main() {
          // Calculate distance from center of point
          float r = 0.0, delta = 0.0, alpha = 1.0;
          vec2 cxy = 2.0 * gl_PointCoord - 1.0;
          r = dot(cxy, cxy);
          
          // Soft circle shape with glow
          if (r > 1.0) {
            discard;
          }
          
          // Add glow effect
          delta = fwidth(r);
          alpha = 1.0 - smoothstep(1.0 - delta, 1.0 + delta, r);
          
          // Apply color with time-based hue shift for some particles
          vec3 finalColor = vColor;
          finalColor.r += sin(time * 1.2) * 0.1 * intensity;
          finalColor.b += cos(time * 0.8) * 0.1 * intensity;
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `
    };
    
    // Create particle system
    const particleCount = 2000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    const colorOptions = [
      new THREE.Color(0x6639da), // Purple
      new THREE.Color(0x4299e1), // Blue
      new THREE.Color(0xec4899), // Pink
      new THREE.Color(0x312e81), // Indigo
      new THREE.Color(0x701a75)  // Violet
    ];
    
    // Distribute particles in a disc/spiral shape
    for (let i = 0; i < particleCount; i++) {
      // Create spiral pattern
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 4.0;
      
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2.0;
      
      // Assign random colors from our color options
      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      
      // Random sizes for particles
      sizes[i] = Math.random() * 20 + 5;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('customColor', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    const material = new THREE.ShaderMaterial({
      uniforms: portalShader.uniforms,
      vertexShader: portalShader.vertexShader,
      fragmentShader: portalShader.fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    
    // Store references for animation
    sceneRef.current = {
      scene,
      camera,
      renderer,
      material,
      geometry,
      particles,
      time: 0
    };
    
    // Start animation
    startAnimation();
    
    // Handle window resize
    const handleResize = () => {
      if (!cardRef.current || !sceneRef.current.camera || !sceneRef.current.renderer) return;
      
      const newRect = cardRef.current.getBoundingClientRect();
      const width = newRect.width;
      const height = newRect.height;
      
      sceneRef.current.camera.aspect = width / height;
      sceneRef.current.camera.updateProjectionMatrix();
      sceneRef.current.renderer.setSize(width, height);
      
      if (sceneRef.current.material?.uniforms.resolution) {
        sceneRef.current.material.uniforms.resolution.value.set(width, height);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup function
    return () => {
      stopAnimation();
      window.removeEventListener('resize', handleResize);
      
      if (sceneRef.current.geometry) sceneRef.current.geometry.dispose();
      if (sceneRef.current.material) sceneRef.current.material.dispose();
      if (sceneRef.current.renderer) sceneRef.current.renderer.dispose();
    };
    } catch (error) {
      console.error("Error initializing Three.js scene:", error);
    }
  }, []);
  
  // Animation function - wrapped in try-catch for error handling
  const animate = () => {
    try {
      if (!sceneRef.current.scene || !sceneRef.current.camera || !sceneRef.current.renderer) return;
    
    sceneRef.current.time += 0.01;
    
    // Update uniforms
    if (sceneRef.current.material?.uniforms) {
      sceneRef.current.material.uniforms.time.value = sceneRef.current.time;
      sceneRef.current.material.uniforms.intensity.value = isHovered ? 1.0 : 0.5;
    }
    
    // Render scene
    sceneRef.current.renderer.render(sceneRef.current.scene, sceneRef.current.camera);
    
      // Continue animation loop
      animationRef.current = requestAnimationFrame(animate);
    } catch (error) {
      console.error("Error in animation loop:", error);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    }
  };
  
  // Start animation
  const startAnimation = () => {
    if (animationRef.current === null) {
      animationRef.current = requestAnimationFrame(animate);
    }
  };
  
  // Stop animation
  const stopAnimation = () => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Link 
      href={link}
      className="block h-full"
    >
      <div 
        ref={cardRef}
        className="relative h-full overflow-hidden rounded-lg transition-all duration-300 cursor-pointer bg-neutral-900"
        style={{
          boxShadow: isHovered 
            ? '0 0 25px rgba(102, 57, 218, 0.6), inset 0 0 15px rgba(102, 57, 218, 0.4)' 
            : '0 0 15px rgba(102, 57, 218, 0.3), inset 0 0 5px rgba(102, 57, 218, 0.2)',
          transition: 'all 0.5s ease'
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Portal canvas background */}
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.6,
            transition: 'opacity 0.5s ease',
            filter: `blur(${isHovered ? '0px' : '1px'})`
          }}
        />
        
        {/* Event horizon effect - edge glow */}
        <div 
          className="absolute inset-0 rounded-lg pointer-events-none"
          style={{
            boxShadow: 'inset 0 0 25px rgba(102, 57, 218, 0.5)',
            opacity: isHovered ? 0.8 : 0.3,
            transition: 'opacity 0.5s ease'
          }}
        />
        
        {/* Content container with glass effect */}
        <div 
          className="absolute inset-0 rounded-lg overflow-hidden"
          style={{
            background: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(4px)',
            opacity: isHovered ? 0.8 : 1,
            transition: 'opacity 0.5s ease'
          }}
        >
          {/* Actual content */}
          <div className="relative p-6 h-full flex flex-col z-10">
            <div 
              className="flex items-center justify-center w-12 h-12 rounded-md text-white mb-4 relative"
              style={{ 
                backgroundColor: 'rgb(102, 57, 218)',
                boxShadow: isHovered 
                  ? '0 0 15px rgba(102, 57, 218, 0.8)' 
                  : '0 0 5px rgba(102, 57, 218, 0.4)',
                transition: 'box-shadow 0.5s ease'
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
                textShadow: isHovered 
                  ? '0 0 8px rgba(255,255,255,0.5)' 
                  : '0 0 5px rgba(255,255,255,0.3)'
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
