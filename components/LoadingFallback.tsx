import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { JarvisLeadsLogo } from './JarvisLeadsLogo';

interface LoadingFallbackProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  showLogo?: boolean;
}

export function LoadingFallback({ 
  message = 'Загрузка...', 
  size = 'md',
  showLogo = false
}: LoadingFallbackProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12'
  };

  const isWelcomeMessage = message.includes('Добро пожаловать') || message.includes('Jarvis Leads') || message.includes('Добро пожаловать в Jarvis Leads');

  return (
    <div className="flex items-center justify-center min-h-[200px] p-8 pt-safe-top pb-safe-bottom">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center"
      >
        {/* Показываем логотип со свечением для приветственных сообщений */}
        {(showLogo || isWelcomeMessage) ? (
          <div className="mb-6 flex justify-center">
            <JarvisLeadsLogo 
              size="lg" 
              showText={true} 
              withGlow={true} 
              animated={true}
              className="scale-125"
            />
          </div>
        ) : (
          <Loader2 
            className={`${sizeClasses[size]} animate-spin text-orange-500 mx-auto mb-3`}
          />
        )}
        
        <motion.p 
          className={`text-muted-foreground text-sm ${isWelcomeMessage ? 'text-white font-medium' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {message}
        </motion.p>

        {/* Анимированные точки для приветственных сообщений */}
        {(showLogo || isWelcomeMessage) && (
          <motion.div
            className="mt-4 flex justify-center space-x-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 bg-orange-400 rounded-full"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 1.2,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}