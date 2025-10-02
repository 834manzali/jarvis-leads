import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, TrendingUp, Users, Phone, Mail, Star } from 'lucide-react';
import { JarvisLogo } from './JarvisLogo';

interface Notification {
  id: string;
  title: string;
  message: string;
  delay: number;
  icon: 'message' | 'trending' | 'users' | 'phone' | 'mail' | 'star';
  color: 'orange' | 'green' | 'blue' | 'purple' | 'red' | 'yellow';
}

// Выносим данные за пределы компонента для предотвращения пересоздания
const NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'Новый лид получен!',
    message: 'Компания "ТехСтрой" интересуется оборудованием',
    delay: 1000,
    icon: 'message',
    color: 'orange'
  },
  {
    id: '2', 
    title: 'Заявка обработана',
    message: 'Клиент "Мега Маркет" готов к переговорам',
    delay: 4000,
    icon: 'trending',
    color: 'green'
  },
  {
    id: '3',
    title: 'Горячий лид!',
    message: 'Ресторан "Вкусно & Точка" ищет поставщика',
    delay: 7000,
    icon: 'star',
    color: 'red'
  },
  {
    id: '4',
    title: 'Успешная конверсия',
    message: 'Автосервис стал клиентом',
    delay: 10000,
    icon: 'users',
    color: 'blue'
  },
  {
    id: '5',
    title: 'VIP заявка',
    message: 'IT компания запросила презентацию',
    delay: 13000,
    icon: 'mail',
    color: 'purple'
  },
  {
    id: '6',
    title: 'Входящий звонок',
    message: 'Фармкомпания "Здоровье+" звонит',
    delay: 16000,
    icon: 'phone',
    color: 'green'
  }
];

// Статические мапы вне компонента
const ICON_MAP = {
  message: MessageCircle,
  trending: TrendingUp,
  users: Users,
  phone: Phone,
  mail: Mail,
  star: Star
} as const;

const COLOR_MAP = {
  orange: 'from-orange-500 to-orange-600',
  green: 'from-green-500 to-green-600',
  blue: 'from-blue-500 to-blue-600',
  purple: 'from-purple-500 to-purple-600',
  red: 'from-red-500 to-red-600',
  yellow: 'from-yellow-500 to-yellow-600'
} as const;

export function PhoneFrameWithNotifications({ className = "" }: { className?: string }) {
  const [currentNotification, setCurrentNotification] = useState<string | null>(null);

  // Мемоизируем активное уведомление
  const activeNotification = useMemo(() => 
    NOTIFICATIONS.find(n => n.id === currentNotification),
    [currentNotification]
  );

  // Оптимизированный колбэк для установки уведомления
  const setNotification = useCallback((id: string | null) => {
    setCurrentNotification(id);
  }, []);

  useEffect(() => {
    let timers: NodeJS.Timeout[] = [];
    let cycleTimer: NodeJS.Timeout;

    const startNotificationCycle = () => {
      // Очищаем предыдущие таймеры
      timers.forEach(timer => clearTimeout(timer));
      timers = [];

      NOTIFICATIONS.forEach((notification) => {
        // Показать уведомление
        const showTimer = setTimeout(() => {
          setNotification(notification.id);
        }, notification.delay);

        // Скрыть уведомление через 2.5 секунды
        const hideTimer = setTimeout(() => {
          setNotification(null);
        }, notification.delay + 2500);

        timers.push(showTimer, hideTimer);
      });

      // Повторить цикл через 20 секунд
      cycleTimer = setTimeout(startNotificationCycle, 20000);
    };

    startNotificationCycle();

    return () => {
      timers.forEach(timer => clearTimeout(timer));
      clearTimeout(cycleTimer);
    };
  }, [setNotification]);

  return (
    <div className={`flex flex-col items-center justify-center py-12 ${className}`}>
      {/* Статичный логотип - никаких анимаций */}
      <div className="mb-4">
        <JarvisLogo size={240} isListening={false} />
      </div>
      
      {/* Название под логотипом - ближе к логотипу */}
      <div className="text-center mb-6">
        <h2 className="text-4xl font-bold text-white logo-font mb-1">
          Jarvis Leads
        </h2>
        <p className="text-lg text-gray-400">
          Генерация лидов в режиме реального времени
        </p>
      </div>

      {/* Место для уведомлений - ближе к тексту */}
      <div className="w-full max-w-md h-20 flex items-start justify-center">
        <AnimatePresence mode="wait">
          {activeNotification && (
            <motion.div
              key={activeNotification.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ 
                duration: 0.3,
                ease: "easeOut"
              }}
              className="w-full bg-white rounded-xl p-3 shadow-lg border border-gray-200"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 bg-gradient-to-r ${COLOR_MAP[activeNotification.color]} rounded-full flex items-center justify-center flex-shrink-0`}>
                  {React.createElement(ICON_MAP[activeNotification.icon], { 
                    size: 16, 
                    className: "text-white" 
                  })}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 text-sm">
                    {activeNotification.title}
                  </h4>
                  <p className="text-gray-600 text-xs mt-0.5 line-clamp-2">
                    {activeNotification.message}
                  </p>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}