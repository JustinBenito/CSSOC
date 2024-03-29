"use client"
import { cn } from "./utils/cn";
import clsx from "clsx";
import React from "react";

export const Meteors = ({
  number,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const meteors = new Array(number || 20).fill(true);

  // Define keyframes for the meteor animation
  const meteorKeyframes = `
    @keyframes meteor {
      0% { transform: rotate(215deg) translateX(0); opacity: 1; }
      70% { opacity: 1; }
      100% { transform: rotate(215deg) translateX(-500px); opacity: 0; }
    }
  `;

  // Dynamically create a style tag to include keyframes
  React.useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.textContent = meteorKeyframes;
    document.head.appendChild(styleTag);
    
    // Cleanup function
    return () => {
      document.head.removeChild(styleTag);
    };
  }, []); // Empty dependency array indicates this effect runs only once

  return (
    <>
      {meteors.map((el, idx) => {
        const leftPosition = Math.floor(Math.random() * (400 - -400) + -400);
        const size = 1 + 'px';
        const animationDuration = Math.floor(Math.random() * (10 - 2) + 2) + 's';

        const meteorStyle: React.CSSProperties = {
          position: 'absolute',
          top: 0,
          width: size,
          height: size,
          left: `calc(-50% + ${leftPosition}px)`,
          borderRadius: '9999px',
          backgroundColor: '#64748b',
          boxShadow: '0 0 0 1px #ffffff10',
          animation: 'meteor linear infinite',
          animationDuration: animationDuration,
        };

        return (
          <span
            key={"meteor" + idx}
            className={cn(
              "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent",
              className
            )}
            style={meteorStyle}
          ></span>
        );
      })}
    </>
  );
};
