import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, ArrowRight, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface SpecialOfferPopupProps {
  isVisible: boolean;
  onClose: () => void;
  onAccept: () => void;
}

export function SpecialOfferPopup({ isVisible, onClose, onAccept }: SpecialOfferPopupProps) {
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds

  useEffect(() => {
    if (!isVisible) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isVisible, onClose]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleCloseClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999]"
            onClick={handleBackdropClick}
          />
          
          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-2 sm:p-4 pointer-events-none pb-safe-bottom pt-safe-top"
          >
            <Card 
              className="w-full max-w-sm sm:max-w-md bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl border-2 border-orange-500/30 rounded-2xl sm:rounded-3xl overflow-hidden relative pointer-events-auto max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCloseClick}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 z-[10001] text-gray-400 hover:text-white hover:bg-white/10 rounded-xl p-1.5 sm:p-2 pointer-events-auto"
              >
                <X size={18} className="sm:w-5 sm:h-5" />
              </Button>

              {/* Animated Background */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  className="absolute -top-20 -left-20 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl"
                  animate={{
                    x: [0, 30, 0],
                    y: [0, -20, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute -bottom-20 -right-20 w-40 h-40 bg-orange-600/20 rounded-full blur-3xl"
                  animate={{
                    x: [0, -20, 0],
                    y: [0, 20, 0],
                    scale: [1, 0.9, 1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>

              <CardContent className="p-4 sm:p-6 lg:p-8 relative z-10">
                <div className="text-center space-y-4 sm:space-y-6">
                  {/* Gift Icon */}
                  <motion.div
                    className="flex justify-center"
                    animate={{ 
                      rotate: [0, -10, 10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-500/30 to-orange-600/30 rounded-xl sm:rounded-2xl flex items-center justify-center">
                      <Gift size={24} className="sm:w-8 sm:h-8 text-orange-300" />
                    </div>
                  </motion.div>

                  {/* Title */}
                  <div className="space-y-1 sm:space-y-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-white heading-font leading-tight">
                      Уникальное предложение
                    </h2>
                    <p className="text-orange-400 font-semibold text-sm sm:text-base">
                      для 1-го заказа
                    </p>
                  </div>

                  {/* Offer Details */}
                  <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-3 sm:space-y-4">
                    <div className="text-left space-y-2 sm:space-y-3">
                      <div className="flex items-start space-x-2 sm:space-x-3">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                        <p className="text-white text-sm sm:text-lg leading-relaxed">
                          <span className="font-bold text-orange-400">50 лидов</span> + звонки по всем
                        </p>
                      </div>
                      <div className="flex items-start space-x-2 sm:space-x-3">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                        <p className="text-white text-sm sm:text-lg leading-relaxed">
                          от наших специалистов - <span className="font-bold text-green-400">бесплатно</span>
                        </p>
                      </div>
                    </div>
                    
                    <div className="border-t border-orange-500/20 pt-3 sm:pt-4 text-center">
                      <p className="text-gray-300 text-sm sm:text-base mb-1">
                        Стоимость без акции:
                      </p>
                      <p className="text-gray-400 text-lg sm:text-xl font-bold">
                        <span className="line-through">25 750₽</span>
                      </p>
                    </div>
                  </div>

                  {/* Timer */}
                  <motion.div
                    className="bg-red-500/20 border border-red-500/30 rounded-xl p-3 sm:p-4"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <div className="flex items-center justify-center space-x-2 text-red-300">
                      <Clock size={16} className="sm:w-5 sm:h-5 flex-shrink-0" />
                      <p className="font-bold text-sm sm:text-lg">
                        До окончания: {formatTime(timeLeft)}
                      </p>
                    </div>
                  </motion.div>

                  {/* Action Button */}
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Button
                      onClick={onAccept}
                      size="lg"
                      className="w-full px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30 hover:shadow-lg hover:shadow-orange-500/40 text-base sm:text-lg font-bold group"
                    >
                      <span>Получить предложение</span>
                      <motion.div
                        className="ml-2"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight size={16} className="sm:w-5 sm:h-5" />
                      </motion.div>
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}