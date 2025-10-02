import React from 'react';
import { motion } from 'framer-motion';

interface JarvisLogoProps {
  size?: number;
  className?: string;
  isListening?: boolean;
}

export function JarvisLogo({ size = 120, className = '', isListening = false }: JarvisLogoProps) {
  const pulseVariants = {
    idle: {
      scale: 1,
      opacity: 1
    },
    listening: {
      scale: [1, 1.1, 1],
      opacity: [1, 0.8, 1],
    }
  };

  return (
    <div className={`relative flex-shrink-0 ${className} flex items-center justify-center`} style={{ width: size, height: size }}>
      <motion.div
        className="relative z-10 w-full h-full flex items-center justify-center"
        variants={isListening ? pulseVariants : undefined}
        initial="idle"
        animate={isListening ? "listening" : "idle"}
        transition={isListening ? {
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        } : undefined}
      >
        {/* New Orbital SVG Logo */}
        <div 
          className="w-full h-full flex items-center justify-center"
          style={{ 
            filter: isListening ? 'drop-shadow(0 0 14px rgba(255,255,255,0.6))' : 'none'
          }}
        >
          <svg
            width={size}
            height={size}
            viewBox="0 0 120 120"
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="60" cy="60" r="48" fill="none" stroke="white" strokeWidth="6" />
            <ellipse cx="60" cy="60" rx="46" ry="26" fill="none" stroke="white" strokeWidth="5" transform="rotate(45 60 60)" />
            <ellipse cx="60" cy="60" rx="46" ry="26" fill="none" stroke="white" strokeWidth="5" transform="rotate(-45 60 60)" />
          </svg>
        </div>
      </motion.div>

      {/* Эффекты свечения при listening */}
      {isListening && (
        <>
          {/* Пульсирующие кольца */}
          <motion.div
            className="absolute inset-0 border-2 border-white rounded-full opacity-40"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.6, 0, 0.6]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
          <motion.div
            className="absolute inset-0 border border-white rounded-full opacity-20"
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.4, 0, 0.4]
            }}
            transition={{
              duration: 2,
              delay: 0.5,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
        </>
      )}
    </div>
  );
}