import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on non-touch devices
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive = target.closest('button, a, input, select, textarea, [role="button"], .interactive-target');
      setIsPointer(!!isInteractive);

      const isCardOrImage = target.closest('.group, img, [data-cursor-expand]');
      setIsHovered(!!isCardOrImage);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Precision inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-[#0F382C] -translate-x-1/2 -translate-y-1/2 hidden md:block"
        animate={{
          x: mousePos.x,
          y: mousePos.y,
          scale: isPointer ? 1.4 : 1,
          backgroundColor: isPointer ? '#E28413' : '#0F382C',
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 400, mass: 0.1 }}
        style={{ width: 8, height: 8 }}
      />
      {/* Ambient trailing circle */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-[#0F382C]/30 -translate-x-1/2 -translate-y-1/2 hidden md:block"
        animate={{
          x: mousePos.x,
          y: mousePos.y,
          scale: isPointer ? 1.8 : isHovered ? 2.4 : 1,
          borderColor: isPointer ? 'rgba(226, 132, 19, 0.45)' : 'rgba(15, 56, 44, 0.35)',
          backgroundColor: isHovered ? 'rgba(15, 56, 44, 0.04)' : 'transparent',
        }}
        transition={{ type: 'spring', damping: 24, stiffness: 220, mass: 0.2 }}
        style={{ width: 32, height: 32 }}
      />
    </>
  );
};
