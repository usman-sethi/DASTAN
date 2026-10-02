import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CinematicLoaderProps {
  onComplete?: () => void;
}

export const CinematicLoader: React.FC<CinematicLoaderProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if user already saw the loader in this session
    const hasSeenLoader = sessionStorage.getItem('dastan_loader_seen');
    if (hasSeenLoader) {
      setIsVisible(false);
      onComplete?.();
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem('dastan_loader_seen', 'true');
      onComplete?.();
    }, 1500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            y: -20,
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } 
          }}
          className="fixed inset-0 z-[99999] bg-[#0C2B22] flex flex-col items-center justify-center text-white select-none px-6"
        >
          {/* Subtle ambient background glow */}
          <div className="absolute inset-0 bg-radial from-[#144D3C]/40 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center max-w-md w-full text-center">
            {/* Minimalist Journey Path Line */}
            <div className="w-32 h-[1.5px] bg-neutral-800 relative overflow-hidden mb-8 rounded-full">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.3, ease: 'easeInOut', repeat: Infinity }}
                className="w-1/2 h-full bg-[#E28413]"
              />
            </div>

            {/* Brand Wordmark & Nastaliq */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex items-baseline gap-3 justify-center mb-3"
            >
              <span className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
                DASTAN
              </span>
              <span className="font-nastaliq text-2xl text-[#E28413] font-semibold">
                داستان
              </span>
            </motion.div>

            {/* Editorial Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-xs uppercase tracking-[0.25em] text-neutral-300 font-light"
            >
              Every place has a story.
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
