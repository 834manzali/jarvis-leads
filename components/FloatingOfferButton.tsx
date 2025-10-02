import { motion } from 'framer-motion';
import { Gift } from 'lucide-react';
import { Button } from './ui/button';

interface FloatingOfferButtonProps {
  onClick: () => void;
}

export function FloatingOfferButton({ onClick }: FloatingOfferButtonProps) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: "spring", duration: 0.5 }}
      className="fixed bottom-6 right-6 z-30"
    >
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, -5, 5, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Button
          onClick={onClick}
          size="lg"
          className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/40 hover:shadow-xl hover:shadow-orange-500/50 border-2 border-orange-400/30 relative overflow-hidden group p-0"
        >
          {/* Animated Background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-orange-400/30 to-orange-600/30 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Icon */}
          <motion.div
            animate={{ 
              rotate: [0, -10, 10, 0] 
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative z-10"
          >
            <Gift size={24} className="text-white" />
          </motion.div>

          {/* Pulse Ring */}
          <motion.div
            className="absolute inset-0 border-2 border-orange-400 rounded-full"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.8, 0, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
        </Button>
      </motion.div>
    </motion.div>
  );
}