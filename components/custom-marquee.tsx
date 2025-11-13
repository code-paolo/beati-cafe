"use client";

import { ReactNode, useId } from "react";

interface CustomMarqueeProps {
  children: ReactNode;
  direction?: "left" | "right";
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
  gap?: string;
}

export function CustomMarquee({
  children,
  direction = "left",
  speed = 40,
  pauseOnHover = false,
  className = "",
  gap = "1.5rem",
}: CustomMarqueeProps) {
  const animationName = direction === "left" ? "scrollLeft" : "scrollRight";
  const uniqueId = useId().replace(/:/g, "");

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
      }}
    >
      <style>
        {`
          @keyframes scrollLeft-${uniqueId} {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-100%);
            }
          }

          @keyframes scrollRight-${uniqueId} {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(0);
            }
          }

          .marquee-${uniqueId} .marquee-track {
            animation: ${animationName}-${uniqueId} ${speed}s linear infinite;
          }

          ${
            pauseOnHover
              ? `
            .marquee-${uniqueId}:hover .marquee-track {
              animation-play-state: paused !important;
            }
          `
              : ""
          }
        `}
      </style>

      <div className={`marquee-${uniqueId} flex py-4`} style={{ gap }}>
        <div
          className="marquee-track flex shrink-0 min-w-full items-center"
          style={{ gap }}
        >
          {children}
        </div>
        <div
          className="marquee-track flex shrink-0 min-w-full items-center"
          style={{ gap }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
