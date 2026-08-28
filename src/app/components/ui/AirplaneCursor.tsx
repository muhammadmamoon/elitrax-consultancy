"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

export default function AirplaneCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false); // Track if hovering on button/link
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 1024) {
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    // Check karna ke mouse kisi button ya link ke upar hai ya nahi
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Agar target 'a' (link), 'button', ya koi input field hai
      const isClickable = target.closest('a, button, [role="button"], input, textarea, select');
      setIsHovering(!!isClickable);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Yeh line globally poori website se default Finger (Pointer) ko hamesha ke liye hide kar degi */}
      <style>{`* { cursor: none !important; }`}</style>
      
      <motion.div 
        className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden" 
        style={{ left: 0, top: 0 }}
      >
        <motion.div style={{ x: cursorX, y: cursorY }} className="absolute">
          <div className="relative -left-1 -top-1 flex items-center justify-center">
            
            {/* Airplane SVG - Size 32x32 kar diya hai (pehle 24 tha) */}
            <svg 
              width="32" 
              height="32" 
              viewBox="0 0 24 24" 
              fill="none" 
              className={`transform -rotate-45 transition-all duration-300 ${
                isHovering 
                  ? "text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.8)] scale-110" // Jab link par hover hoga (White + Glow + Bada)
                  : "text-gold-400 drop-shadow-[0_0_8px_rgba(212,175,55,0.7)]" // Normal halat mein (Gold)
              }`}
            >
              <path 
                d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" 
                fill="currentColor" 
              />
            </svg>
            
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}