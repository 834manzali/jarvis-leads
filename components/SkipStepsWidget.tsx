import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Clock, PhoneCall } from 'lucide-react';
import { Button } from './ui/button';

interface SkipStepsWidgetProps {
  onContinueWithManager: () => void;
  onContinueForm: () => void;
  onBack: () => void;
}

export function SkipStepsWidget({ onContinueWithManager, onContinueForm, onBack }: SkipStepsWidgetProps) {
  return (
    <div className="space-y-5 sm:space-y-7 max-w-screen-sm w-full mx-auto">
      {/* Header */}
      <div className="text-center space-y-3 sm:space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
          Как бы вы хотели продолжить?
        </h2>
        <p className="text-gray-300 text-base sm:text-lg">
          Выберите наиболее удобный для вас способ оформления заявки
        </p>
      </div>

      {/* Options */}
      <div className="grid gap-3 sm:gap-5">
        {/* Quick Manager Option */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="group"
        >
          <Button
            onClick={onContinueWithManager}
            variant="outline"
            className="w-full p-4 sm:p-5 h-auto text-left border border-orange-500/40 hover:border-orange-500/60 bg-gradient-to-r from-orange-500/5 to-orange-600/5 hover:from-orange-500/15 hover:to-orange-600/15 transition-all duration-300 min-h-[108px] rounded-xl"
          >
            <div className="flex items-start space-x-3 sm:space-x-4">
              <div className="p-2 bg-orange-500/20 rounded-lg group-hover:bg-orange-500/30 transition-all duration-300 flex-shrink-0">
                <PhoneCall className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />
              </div>
              <div className="flex-1 space-y-1 sm:space-y-2 min-w-0">
                <h3 className="text-base sm:text-lg font-semibold text-white leading-tight">
                  Быстрая связь с менеджером
                </h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed line-clamp-2">
                  Оставьте только контакты - наш менеджер перезвонит и соберет всю информацию в удобном разговоре
                </p>
                <div className="flex items-center space-x-2 text-green-400 text-sm">
                  <Clock className="w-4 h-4 flex-shrink-0" />
                  <span className="font-medium">Займет 1-2 минуты</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
            </div>
          </Button>
        </motion.div>

        {/* Full Form Option */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="group"
        >
          <Button
            onClick={onContinueForm}
            variant="outline"
            className="w-full p-4 sm:p-5 h-auto text-left border border-blue-500/40 hover:border-blue-500/60 bg-gradient-to-r from-blue-500/5 to-blue-600/5 hover:from-blue-500/15 hover:to-blue-600/15 transition-all duration-300 min-h-[108px] rounded-xl"
          >
            <div className="flex items-start space-x-3 sm:space-x-4">
              <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-all duration-300 flex-shrink-0">
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
              </div>
              <div className="flex-1 space-y-1 sm:space-y-2 min-w-0">
                <h3 className="text-base sm:text-lg font-semibold text-white leading-tight">
                  Заполнить подробную анкету
                </h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed line-clamp-2">
                  Пройдите 7-этапную форму для максимально точного расчета стоимости и персонализированного предложения
                </p>
                <div className="flex items-center space-x-2 text-blue-400 text-sm">
                  <Clock className="w-4 h-4 flex-shrink-0" />
                  <span className="font-medium">Займет 5-7 минут</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
            </div>
          </Button>
        </motion.div>
      </div>

      {/* Info */}
      <div className="bg-gray-700/40 border border-gray-600 rounded-xl p-4 sm:p-5 mt-6">
        <div className="flex items-start space-x-3">
          <MessageCircle className="text-gray-400 flex-shrink-0 mt-0.5" size={18} />
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            <strong className="text-gray-300">Подсказка:</strong> В любом случае вы получите бесплатную консультацию и персональное предложение от нашего менеджера
          </p>
        </div>
      </div>
    </div>
  );
}