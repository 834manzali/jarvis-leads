import React from 'react';
import { motion } from 'framer-motion';
import { JarvisLogo } from './JarvisLogo';

interface JarvisLeadsLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  withGlow?: boolean;
  animated?: boolean;
  className?: string;
}

export function JarvisLeadsLogo({ 
  size = 'md', 
  showText = true, 
  withGlow = false,
  animated = false,
  className = '' 
}: JarvisLeadsLogoProps) {
  const sizes = {
    sm: { logo: 24, text: 'text-lg' },
    md: { logo: 32, text: 'text-xl' },
    lg: { logo: 48, text: 'text-2xl' },
    xl: { logo: 64, text: 'text-3xl' }
  };

  const currentSize = sizes[size];

  const LogoComponent = animated ? motion.div : 'div';
  const animationProps = animated ? {
    animate: { 
      scale: [1, 1.05, 1],
      rotate: [0, 2, -2, 0]
    },
    transition: { 
      duration: 3, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }
  } : {};

  return (
    <LogoComponent 
      className={`flex items-center space-x-2 ${withGlow ? 'logo-glow' : ''} ${className}`}
      {...animationProps}
    >
      <JarvisLogo size={currentSize.logo} />
      {showText && (
        <span className={`font-bold logo-font ${currentSize.text} text-white`}>
          Jarvis Leads
        </span>
      )}
    </LogoComponent>
  );
}