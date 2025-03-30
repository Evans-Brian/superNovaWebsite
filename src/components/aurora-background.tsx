"use client";
import { cn } from "../../lib/utils";
import React, { ReactNode } from "react";

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
  return (
    <main className="aurora-background-main">
      <div
        className={cn(
          "relative flex flex-col h-[100vh] items-center justify-center bg-zinc-50 dark:bg-zinc-900 text-slate-950 transition-bg",
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            //   I'm sorry but this is what peak developer performance looks like // trigger warning
            className={cn(
              `
            [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
            [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
            [--natural-light:radial-gradient(circle_at_top_right,rgba(255,255,255,0.12)_0%,rgba(255,236,210,0.08)_30%,rgba(255,213,200,0.05)_60%,rgba(0,0,0,0)_100%)]
            [--aurora:repeating-linear-gradient(100deg,var(--purple-500)_5%,var(--purple-600)_15%,var(--indigo-500)_25%,var(--blue-500)_35%,var(--indigo-300)_45%)]
            [background-image:var(--white-gradient),var(--natural-light),var(--aurora)]
            dark:[background-image:var(--dark-gradient),var(--natural-light),var(--aurora)]
            [background-size:200%,_100%,_200%]
            [background-position:0%_0%,_0%_0%,_0%_0%]
            filter blur-[10px]
            after:content-[""] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--natural-light),var(--aurora)] 
            after:dark:[background-image:var(--dark-gradient),var(--natural-light),var(--aurora)]
            after:[background-size:200%,_100%,_200%] 
            after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
            pointer-events-none
            absolute -inset-[10px] opacity-65 will-change-transform animate-aurora`,

              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
            )}
          ></div>
        </div>
        {children}
      </div>
    </main>
  );
};
