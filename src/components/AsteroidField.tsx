"use client";

import React, { useEffect, useRef } from 'react';

interface AsteroidFieldProps {
  className?: string;
}

export default function AsteroidField({ 
  className = ""
}: AsteroidFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number>(Date.now());

  // Fragment shader focused on asteroid effects
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
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f*f*(3.0-2.0*f);
      
      float a = rnd(i);
      float b = rnd(i + vec2(1.0, 0.0));
      float c = rnd(i + vec2(0.0, 1.0));
      float d = rnd(i + vec2(1.0, 1.0));
      
      return mix(mix(a, b, u.x), 
                mix(c, d, u.x), 
                u.y);
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

    void main() {
      vec2 uv=(gl_FragCoord.xy-.5*u_resolution)/min(u_resolution.x,u_resolution.y);
      vec3 col=vec3(0);
      uv*=1.-.3*(sin(u_time*.2)*.5+.5);
      
      for (float i=1.; i<12.; i++) {
        uv+=.1*cos(i*vec2(.1+.01*i, .8)+i*i+u_time*.5+.1*uv.x);
        vec2 p=uv;
        float d=length(p);
        // Asteroid glow colors
        col+=.00125/d*(cos(sin(i)*vec3(0.5,1.0,2.5))+1.);
        float b=noise(i+p);
        // Asteroid trail details
        col+=.002*b/length(max(p,vec2(b*p.x*.02,p.y))) * vec3(0.4, 0.6, 1.0);
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
    if (!canvas) {
      console.log('AsteroidField: Canvas ref not available');
      return;
    }

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.error('WebGL not supported');
      console.log('AsteroidField: WebGL context creation failed');
      return;
    }

    console.log('AsteroidField: WebGL context created successfully');

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
    const render = () => {
      const elapsedTime = (Date.now() - startTimeRef.current) / 1000;
      
      // Clear with transparent background
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);
      gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
      gl.uniform1f(timeUniformLocation, elapsedTime);

      gl.enableVertexAttribArray(positionAttributeLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(
        positionAttributeLocation,
        2,
        gl.FLOAT,
        false,
        0,
        0
      );

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId.current = requestAnimationFrame(render);
    };

    animationFrameId.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, [fragmentShaderSource, vertexShaderSource]);

  // Handle canvas resize
   
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const gl = canvas.getContext('webgl');
    if (!gl) return;
    
    const handleResize = () => {
      const container = canvas.parentElement;
      if (!container) return;
      
      const displayWidth = Math.floor(container.clientWidth);
      const displayHeight = Math.floor(container.clientHeight);
      
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, displayWidth, displayHeight);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [fragmentShaderSource, vertexShaderSource]);

  const [webGLAvailable, setWebGLAvailable] = React.useState(true);

  useEffect(() => {
    if (canvasRef.current) {
      const gl = canvasRef.current.getContext('webgl');
      setWebGLAvailable(!!gl);
    }
  }, []);

  return (
    <>
      <canvas 
        ref={canvasRef}
        className={className}
        style={{ 
          width: '100%', 
          height: '100%', 
          backgroundColor: 'transparent',
          display: 'block',
        }}
      />
      {!webGLAvailable && (
        <div className="absolute inset-0 bg-purple-900 text-white flex items-center justify-center">
          WebGL not supported - Asteroid effect unavailable
        </div>
      )}
    </>
  );
}
