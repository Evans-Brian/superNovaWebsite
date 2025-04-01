"use client";

import { cn } from "../../../lib/utils";
import React, { useState, useEffect } from "react";

interface MeteorProps {
  top: string;
  left: string;
  animationDelay: string;
  animationDuration: string;
}

export const Meteors = ({
  number,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const [meteorProps, setMeteorProps] = useState<MeteorProps[]>([]);
  const meteorCount = number || 20;

  useEffect(() => {
    // Generate meteor properties only on client-side
    const newMeteorProps = Array.from({ length: meteorCount }, () => ({
      top: Math.floor(Math.random() * 100) + "%",
      left: Math.floor(Math.random() * 800 - 200) + "px",
      animationDelay: Math.random() * (0.8 - 0.2) + 0.2 + "s",
      animationDuration: Math.floor(Math.random() * (10 - 2) + 2) + "s",
    }));
    
    setMeteorProps(newMeteorProps);
  }, [meteorCount]);

  // Don't render anything during server-side rendering
  // or before the client-side effect has run
  if (meteorProps.length === 0) {
    return null;
  }

  return (
    <>
      {meteorProps.map((props, idx) => (
        <span
          key={"meteor" + idx}
          className={cn(
            "animate-meteor-effect absolute h-0.5 w-0.5 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[0]",
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent",
            className
          )}
          style={props}
        ></span>
      ))}
    </>
  );
};
