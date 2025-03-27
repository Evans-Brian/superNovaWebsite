"use client";

import React, { useEffect, useRef } from 'react';

interface AsteroidEffectProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function AsteroidEffect({ 
  width = 300, 
  height = 300,
  className = ""
}: AsteroidEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Fix: Add initial value to useRef<number>
  const animationFrameId = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number>(Date.now());

  // Fragment shader for the asteroid effect - exact original from Star Trek shader
  const fragmentShaderSource = `
    precision highp float;

    uniform vec2 u_resolution;
    uniform float u_time;

    // Returns a pseudo random number for a given point (white noise)
    float rnd(vec2 p) {
      p=fract(p*vec2(12.9898,78.233));
      p+=dot(p,p+34.56);
      return fract(p.x*p.y);
    }

    // Returns a pseudo random number for a given point (value noise)
    float noise(in vec2 p) {
      vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);
      float
      a=rnd(i),
      b=rnd(i+vec2(1,0)),
      c=rnd(i+vec2(0,1)),
      d=rnd(i+1.);
      return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
    }

    // Returns a pseudo random number for a given point (fractal noise)
    float fbm(vec2 p) {
      float t=.0, a=1.; mat2 m=mat2(1.,-.5,.2,1.2);
      for (int i=0; i<5; i++) {
        t+=a*noise(p);
        p*=2.*m;
        a*=.5;
      }
      return t;
    }

    float clouds(vec2 p) {
      float d=1., t=.0;
      for (float i=.0; i<3.; i++) {
        float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);
        t=mix(t,d,a);
        d=a;
        p*=2./(i+1.);
      }
      return t;
    }

    void main() {
      vec2 uv=(gl_FragCoord.xy-.5*u_resolution)/min(u_resolution.x,u_resolution.y);
      vec2 st=uv*vec2(2,1);
      vec3 col=vec3(0);
      float bg=clouds(vec2(st.x+u_time*.5,-st.y));
      uv*=1.-.3*(sin(u_time*.2)*.5+.5);
      for (float i=1.; i<12.; i++) {
        uv+=.1*cos(i*vec2(.1+.01*i, .8)+i*i+u_time*.5+.1*uv.x);
        vec2 p=uv;
        float d=length(p);
        // Change glow color to be more blue/purple
        col+=.00125/d*(cos(sin(i)*vec3(0.5,1.0,2.5))+1.);
        float b=noise(i+p+bg*1.731);
        // Enhance blue/purple coloring in trail details
        col+=.002*b/length(max(p,vec2(b*p.x*.02,p.y))) * vec3(0.4, 0.6, 1.0);
        
        // Stronger blue and purple tones in the background blend
        col=mix(col,vec3(bg*.1,bg*.05,bg*.3),d);
      }
      gl_FragColor=vec4(col,1);
    }
  `;

  // Vertex shader (basic passthrough)
  const vertexShaderSource = `
    attribute vec2 a_position;
    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    // Resize canvas to match display size
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;
    canvas.width = displayWidth;
    canvas.height = displayHeight;
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Create shaders
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    if (!vertexShader || !fragmentShader) {
      console.error('Could not create shaders');
      return;
    }

    // Set shader source and compile
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      console.error('Vertex shader compilation failed:', gl.getShaderInfoLog(vertexShader));
      return;
    }

    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      console.error('Fragment shader compilation failed:', gl.getShaderInfoLog(fragmentShader));
      return;
    }

    // Create and link program
    const program = gl.createProgram();
    if (!program) {
      console.error('Could not create program');
      return;
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking failed:', gl.getProgramInfoLog(program));
      return;
    }

    // Create a buffer for the positions
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    
    // Define a rectangle that covers the viewport
    const positions = [
      -1, -1,  // bottom left
       1, -1,  // bottom right
      -1,  1,  // top left
       1,  1,  // top right
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // Get attribute and uniform locations
    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');
    const timeUniformLocation = gl.getUniformLocation(program, 'u_time');

    // Animation loop
    const render = (timestamp: number) => {
      // Update time uniform
      const elapsedTime = (Date.now() - startTimeRef.current) / 1000; // Seconds
      
      // Clear the canvas with a deep blue/purple background
      gl.clearColor(0.02, 0.01, 0.05, 1); // Deep blue/purple background
      gl.clear(gl.COLOR_BUFFER_BIT);

      // Tell WebGL to use our program
      gl.useProgram(program);

      // Set the resolution uniform
      gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
      
      // Set the time uniform
      gl.uniform1f(timeUniformLocation, elapsedTime);

      // Setup position attribute
      gl.enableVertexAttribArray(positionAttributeLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(
        positionAttributeLocation,
        2,          // 2 components per vertex
        gl.FLOAT,   // data type
        false,      // don't normalize
        0,          // stride (0 = use type and size)
        0           // offset into buffer
      );

      // Draw the rectangle
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      
      // Request next frame
      animationFrameId.current = requestAnimationFrame(render);
    };

    // Start animation
    animationFrameId.current = requestAnimationFrame(render);

    // Cleanup
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      
      // Clean up WebGL resources
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, []);

  // This useEffect handles the canvas resize based on its container
  useEffect(() => {
    // Get WebGL context reference
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const gl = canvas.getContext('webgl');
    if (!gl) return;
    
    const handleResize = () => {
      // Get actual dimensions from the container element
      const container = canvas.parentElement;
      if (!container) return;
      
      // Get the device pixel ratio for high DPI displays
      const dpr = window.devicePixelRatio || 1;
      
      // Use the dimensions of the container multiplied by device pixel ratio
      const displayWidth = Math.floor(container.clientWidth);
      const displayHeight = Math.floor(container.clientHeight);
      
      // Update canvas size if it's changed
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        // Set canvas rendering dimensions (scaled by DPR for high-resolution)
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        
        // Update WebGL viewport to match
        gl.viewport(0, 0, displayWidth, displayHeight);
      }
    };
    
    // Initial resize
    handleResize();
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className={className}
      style={{ 
        width: '100%', 
        height: '100%', 
        backgroundColor: 'black',
        display: 'block',
      }}
    />
  );
}
