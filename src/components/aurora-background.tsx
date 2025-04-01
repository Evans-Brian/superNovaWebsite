"use client";
import { cn } from "../../lib/utils";
import React, { ReactNode, useEffect, useState } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  // Use state to track whether we're on the client
  const [isMounted, setIsMounted] = useState(false);

  // Set isMounted to true on client-side only
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Base className that's always applied
  const baseClassName = "relative flex flex-col h-[100vh] items-center justify-center bg-zinc-900 text-white transition-bg";
  
  // Aurora effect classes - only applied client-side
  const auroraEffectClass = `
    [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
    [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
    [--natural-dark:radial-gradient(circle_at_top_right,rgba(30,30,60,0.15)_0%,rgba(40,30,80,0.1)_30%,rgba(50,30,90,0.05)_60%,rgba(0,0,0,0)_100%)]
    [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_5%,var(--indigo-300)_15%,var(--indigo-500)_25%,var(--purple-600)_35%,var(--purple-500)_45%)]
    [background-image:var(--dark-gradient),var(--natural-dark),var(--aurora)]
    [background-size:200%,_100%,_200%]
    [background-position:0%_0%,_0%_0%,_0%_0%]
    filter blur-[10px]
    after:content-[""] after:absolute after:inset-0 after:[background-image:var(--dark-gradient),var(--natural-dark),var(--aurora)]
    after:[background-size:200%,_100%,_200%] 
    after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
    pointer-events-none
    absolute -inset-[10px] opacity-45 will-change-transform animate-aurora
  `;

  // Radial gradient mask
  const radialGradientMask = `[mask-image:radial-gradient(ellipse_at_100%_0%,black_5%,var(--transparent)_60%)]`;

  return (
    <main className="aurora-background-main">
      <div
        className={cn(baseClassName, className)}
        {...props}
      >
        {isMounted && (
          <div className="absolute inset-0 overflow-hidden">
            <div
              className={cn(
                auroraEffectClass,
                showRadialGradient && radialGradientMask
              )}
            ></div>
          </div>
        )}
        {children}
      </div>
    </main>
  );
};
