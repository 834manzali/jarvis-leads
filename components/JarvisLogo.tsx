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
        {/* Jarvis Leads SVG Logo */}
        <div 
          className="w-full h-full flex items-center justify-center"
          style={{ 
            filter: isListening ? 'drop-shadow(0 0 20px rgba(249, 115, 22, 0.8))' : 'drop-shadow(0 0 10px rgba(249, 115, 22, 0.3))'
          }}
        >
          <svg
            width={size}
            height={size}
            viewBox="0 0 120 120"
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer Circle with Gradient */}
            <defs>
              <linearGradient id="jarvisGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="50%" stopColor="#ea580c" />
                <stop offset="100%" stopColor="#dc2626" />
              </linearGradient>
              <linearGradient id="innerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fb923c" />
                <stop offset="100%" stopColor="#f97316" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Background Circle */}
            <circle 
              cx="60" 
              cy="60" 
              r="56" 
              fill="url(#jarvisGradient)"
              filter="url(#glow)"
            />
            
            {/* Inner Circle for depth */}
            <circle 
              cx="60" 
              cy="60" 
              r="48" 
              fill="none"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="1"
            />
            
            {/* AI Neural Network Pattern */}
            <g opacity="0.3">
              {/* Neural nodes */}
              <circle cx="40" cy="35" r="2" fill="white" />
              <circle cx="60" cy="30" r="2" fill="white" />
              <circle cx="80" cy="35" r="2" fill="white" />
              <circle cx="35" cy="60" r="2" fill="white" />
              <circle cx="85" cy="60" r="2" fill="white" />
              <circle cx="40" cy="85" r="2" fill="white" />
              <circle cx="80" cy="85" r="2" fill="white" />
              
              {/* Neural connections */}
              <line x1="40" y1="35" x2="60" y2="30" stroke="white" strokeWidth="0.5" />
              <line x1="60" y1="30" x2="80" y2="35" stroke="white" strokeWidth="0.5" />
              <line x1="40" y1="35" x2="35" y2="60" stroke="white" strokeWidth="0.5" />
              <line x1="80" y1="35" x2="85" y2="60" stroke="white" strokeWidth="0.5" />
              <line x1="35" y1="60" x2="40" y2="85" stroke="white" strokeWidth="0.5" />
              <line x1="85" y1="60" x2="80" y2="85" stroke="white" strokeWidth="0.5" />
              <line x1="40" y1="85" x2="80" y2="85" stroke="white" strokeWidth="0.5" />
            </g>
            
            {/* Central "J" Letter */}
            <path 
              d="M 45 40 
                 L 45 70 
                 Q 45 80 55 80 
                 Q 65 80 65 70 
                 L 65 65
                 M 40 40 
                 L 50 40"
              fill="none"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            
            {/* Central "L" Letter */}
            <path 
              d="M 70 40 
                 L 70 75 
                 L 85 75"
              fill="none"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            
            {/* Tech accent lines */}
            <g opacity="0.6">
              <line x1="25" y1="45" x2="30" y2="45" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <line x1="90" y1="45" x2="95" y2="45" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <line x1="25" y1="75" x2="30" y2="75" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <line x1="90" y1="75" x2="95" y2="75" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </g>
            
            {/* Outer glow ring for listening state */}
            {isListening && (
              <circle 
                cx="60" 
                cy="60" 
                r="58" 
                fill="none"
                stroke="rgba(249, 115, 22, 0.4)"
                strokeWidth="2"
                className="animate-pulse"
              />
            )}
          </svg>
        </div>
        
        {/* Эффекты свечения при listening */}
        {isListening && (
          <>
            {/* Пульсирующие кольца */}
            <motion.div
              className="absolute inset-0 border-2 border-orange-400 rounded-full opacity-60"
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
              className="absolute inset-0 border border-orange-300 rounded-full opacity-40"
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
      </motion.div>

      {/* Базовое свечение для стандартного состояния */}
      {!isListening && (
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            background: 'radial-gradient(circle, rgba(249, 115, 22, 0.3) 0%, transparent 70%)',
            borderRadius: '50%'
          }}
        />
      )}
    </div>
  );
}