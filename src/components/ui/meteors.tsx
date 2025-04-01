"use client";

import { cn } from "../../../lib/utils";
import React, { useState, useEffect } from "react";

export const Meteors = ({
  number,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const meteorCount = number || 20;
  const [meteors, setMeteors] = useState<Array<{
    id: number;
    top: string;
    left: string;
    duration: string;
  }>>([]);

  // Complete refresh of all meteors
  useEffect(() => {
    const generateMeteors = () => {
      return Array.from({ length: meteorCount }, (_, idx) => ({
        id: Date.now() + idx, // Use timestamp + index for unique id
        top: `${Math.floor(Math.random() * 100)}%`,
        left: `${Math.floor(Math.random() * 800) - 200}px`,
        duration: `${Math.floor(Math.random() * 8) + 2}s`,
      }));
    };
    
    setMeteors(generateMeteors());
    
    // Set an interval to randomly refresh some meteors every 2-4 seconds
    const intervalId = setInterval(() => {
      setMeteors(prev => {
        // Choose approximately 1/4 of the meteors to refresh
        const refreshCount = Math.max(1, Math.floor(prev.length / 4));
        const indexes = new Set<number>();
        
        // Select random indexes to refresh
        while (indexes.size < refreshCount) {
          indexes.add(Math.floor(Math.random() * prev.length));
        }
        
        // Create a new array with refreshed meteors
        return prev.map((meteor, idx) => 
          indexes.has(idx) ? {
            id: Date.now() + idx,
            top: `${Math.floor(Math.random() * 100)}%`,
            left: `${Math.floor(Math.random() * 800) - 200}px`,
            duration: `${Math.floor(Math.random() * 8) + 2}s`,
          } : meteor
        );
      });
    }, 3000);
    
    return () => clearInterval(intervalId);
  }, [meteorCount]);

  if (meteors.length === 0) {
    return null;
  }

  return (
    <>
      {meteors.map((meteor) => (
        <span
          key={meteor.id}
          className={cn(
            "animate-meteor-effect absolute h-0.5 w-0.5 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[0]",
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent",
            className
          )}
          style={{
            top: meteor.top,
            left: meteor.left,
            animationDuration: meteor.duration,
          }}
        />
      ))}
    </>
  );
};
