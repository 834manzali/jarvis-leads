import React from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  CheckCircle, 
  Clock, 
  Users, 
  Badge,
  Star,
  ArrowRight,
  HeadphonesIcon,
  UserCheck,
  Shield,
  Zap
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

export function CallCenterSection() {
  const features = [
    {
      icon: Phone,
      title: "3 попытки дозвона",
      description: "Мы делаем до 3 попыток связаться с каждым контактом для максимальной эффективности"
    },
    {
      icon: HeadphonesIcon,
      title: "Профессиональные операторы", 
      description: "Обученные специалисты с опытом работы в продажах и клиентском сервисе"
    },
    {
      icon: Shield,
      title: "Собственный колл-центр",
      description: "Полный контроль качества и конфиденциальности ваших данных"
    },
    {
      icon: Zap,
      title: "Быстрая обработка",
      description: "Звонки выполняются в течение 24 часов после получения контактов"
    }
  ];

  const stats = [
    { value: "87%", label: "Успешных дозвонов" },
    { value: "< 24ч", label: "Время отклика" },
    { value: "94%", label: "Довольных клиентов" },
    { value: "249₽", label: "за успешный звонок" }
  ];

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-left mb-8 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 heading-font">
            Профессиональный{' '}
            <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
              колл-центр
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-4xl px-2 leading-relaxed">
            Получите не только контакты, но также воспользуйтесь услугами нашего профессионального колл-центра для максимальной конверсии
          </p>
        </motion.div>

        {/* Main Call Center Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-br from-orange-400/20 via-orange-500/15 to-orange-700/10 backdrop-blur-md border border-orange-500/30 rounded-3xl overflow-hidden">
            <CardContent className="p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Left Content */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <span className="bg-orange-500/20 text-orange-300 px-4 py-2 rounded-full font-medium">
                      Премиум услуга
                    </span>
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-bold text-white heading-font">
                    Звонки по вашим лидам
                  </h3>

                  <p className="text-gray-300 text-lg leading-relaxed">
                    Наши профессиональные операторы свяжутся с вашими потенциальными клиентами и передадут вам только заинтересованных и готовых к покупке
                  </p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="text-center p-4 bg-white/5 rounded-xl border border-orange-500/20"
                      >
                        <div className="text-2xl font-bold text-orange-400">{stat.value}</div>
                        <div className="text-sm text-gray-400">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-green-400">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Оплата только за результат</span>
                    </div>
                    <div className="flex items-center space-x-3 text-green-400">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Без успеха — без платы</span>
                    </div>
                    <div className="flex items-center space-x-3 text-green-400">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Полный отчет по каждому звонку</span>
                    </div>
                  </div>

                  <Button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-semibold text-lg shadow-lg shadow-orange-500/30 transition-all duration-300">
                    Заказать звонки
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>

                {/* Right Content - Features */}
                <div className="space-y-6">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-4 p-4 bg-white/5 rounded-xl border border-orange-500/20"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500/30 to-orange-600/30 rounded-xl flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-6 h-6 text-orange-300" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-2">{feature.title}</h4>
                        <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Bottom Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/20 rounded-2xl overflow-hidden">
            <CardContent className="p-6 lg:p-8">
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 heading-font">
                Максимальная эффективность
              </h3>
              <p className="text-gray-300 leading-relaxed max-w-3xl mx-auto">
                Комбинирование качественных лидов с профессиональными звонками увеличивает конверсию в среднем на{' '}
                <span className="text-orange-400 font-bold">340%</span>. 
                Вы получаете не просто контакты, а готовых к покупке клиентов.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}