import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { JarvisLogo } from './JarvisLogo';

interface AnimatedLogoProps {
  className?: string;
  clickable?: boolean;
}

export function AnimatedLogo({ className = '', clickable = true }: AnimatedLogoProps) {
  const [isPressed, setIsPressed] = useState(false);

  const handleLogoClick = () => {
    if (!clickable) return;
    
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 200);
    
    // Simple click effect
    console.log('Logo clicked');
  };

  // Responsive sizing
  const logoSize = (typeof window !== 'undefined' && window.innerWidth < 640) 
    ? { container: 200, logo: 150 } 
    : { container: 240, logo: 180 };

  return (
    <div 
      className={`relative flex items-center justify-center flex-shrink-0 ${className}`} 
      style={{ width: `${logoSize.container}px`, height: `${logoSize.container}px` }}
    >
      <motion.div
        className="relative z-10 logo-glow"
        style={{ 
          width: `${logoSize.logo}px`, 
          height: `${logoSize.logo}px`,
          willChange: 'transform'
        }}
        animate={{
          scale: isPressed ? 0.95 : 1
        }}
        transition={{ 
          duration: 0.3, 
          ease: 'easeOut'
        }}
      >
        <motion.button
          className={`relative w-full h-full flex items-center justify-center bg-transparent flex-shrink-0 ${
            clickable ? 'cursor-pointer' : 'cursor-default pointer-events-none'
          }`}
          onClick={clickable ? handleLogoClick : undefined}
          whileTap={clickable ? { scale: 0.95 } : {}}
        >
          <JarvisLogo 
            size={logoSize.logo} 
            isListening={false}
          />
        </motion.button>
      </motion.div>
    </div>
  );
}