import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'image'>('default');
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const imageEl = target.closest('[data-cursor="explore"], .cursor-explore, .group-image, .destination-media');
      if (imageEl) {
        setCursorType('image');
        setCursorText('EXPLORE');
        return;
      }

      const isInteractive = target.closest('button, a, input, select, textarea, [role="button"], .cursor-pointer');
      if (isInteractive) {
        setCursorType('pointer');
        setCursorText('');
        return;
      }

      setCursorType('default');
      setCursorText('');
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
      {/* Precision Center Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full -translate-x-1/2 -translate-y-1/2 hidden md:block"
        animate={{
          x: mousePos.x,
          y: mousePos.y,
          scale: cursorType === 'image' ? 0 : cursorType === 'pointer' ? 1.6 : 1,
          backgroundColor: cursorType === 'pointer' ? '#E28413' : '#0C2B22',
        }}
        transition={{ type: 'spring', damping: 35, stiffness: 450, mass: 0.08 }}
        style={{ width: 6, height: 6 }}
      />

      {/* Outer Follower / Context Badge */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99998] rounded-full flex items-center justify-center -translate-x-1/2 -translate-y-1/2 hidden md:flex font-mono text-[9px] font-bold tracking-widest"
        animate={{
          x: mousePos.x,
          y: mousePos.y,
          width: cursorType === 'image' ? 72 : cursorType === 'pointer' ? 32 : 24,
          height: cursorType === 'image' ? 72 : cursorType === 'pointer' ? 32 : 24,
          borderColor: cursorType === 'image' ? 'rgba(226, 132, 19, 0.9)' : cursorType === 'pointer' ? 'rgba(226, 132, 19, 0.4)' : 'rgba(15, 56, 44, 0.25)',
          backgroundColor: cursorType === 'image' ? '#0C2B22' : 'transparent',
          color: '#FEF3C7',
        }}
        transition={{ type: 'spring', damping: 26, stiffness: 260, mass: 0.15 }}
        style={{ borderWidth: cursorType === 'image' ? 1.5 : 1 }}
      >
        {cursorType === 'image' && cursorText}
      </motion.div>
    </>
  );
};
