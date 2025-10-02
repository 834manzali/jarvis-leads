import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HelpCircle, 
  ChevronDown, 
  MessageCircle,
  Settings,
  CreditCard,
  Shield
} from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

export function FAQSection() {
  const [activeTab, setActiveTab] = useState('general');
  const [openQuestion, setOpenQuestion] = useState<string | null>('how-it-works');

  const tabs = [
    { id: 'general', label: 'Общие', icon: MessageCircle },
    { id: 'technical', label: 'Технические', icon: Settings },
    { id: 'pricing', label: 'Цены', icon: CreditCard },
    { id: 'legal', label: 'Правовые', icon: Shield }
  ];

  const faqData = {
    general: [
      {
        id: 'how-it-works',
        question: 'Как работает сервис Jarvis Leads?',
        answer: 'Наш сервис собирает контакты пользователей, которые проявили интерес к продуктам или услугам в вашей нише. Мы анализируем их поведение на различных интернет-ресурсах и предоставляем вам контактные данные потенциальных клиентов, готовых к покупке.'
      },
      {
        id: 'collection-methods',
        question: 'Какие способы сбора контактов доступны?',
        answer: 'Мы предлагаем четыре основных способа: сбор с вашего сайта (до 70% контактов), сбор с других сайтов в вашей нише (до 20%), сбор контактов по телефонным номерам (до 20%), и готовые ниши с предустановленными категориями.'
      },
      {
        id: 'how-fast',
        question: 'Как быстро я получу результаты?',
        answer: 'Обработка данных происходит в течение 24 часов после регистрации активности пользователей. Контакты становятся доступны в вашем личном кабинете сразу после обработки.'
      },
      {
        id: 'getting-started',
        question: 'Как начать работу с сервисом?',
        answer: 'Зарегистрируйтесь в системе, получите 50 бесплатных идентификаций, настройте источники сбора данных и начните получать контакты. Наша служба поддержки поможет с настройкой.'
      }
    ],
    technical: [
      {
        id: 'data-accuracy',
        question: 'Какая точность контактных данных?',
        answer: 'Точность наших данных составляет 94%. Мы используем множественную проверку источников и регулярно обновляем базы данных для поддержания высокого качества информации.'
      },
      {
        id: 'crm-integration',
        question: 'Можно ли интегрировать сервис с CRM?',
        answer: 'Да, мы поддерживаем интеграцию с популярными CRM-системами через API. Также доступен экспорт данных в форматах CSV, Excel и прямая синхронизация с вашими системами.'
      },
      {
        id: 'data-format',
        question: 'В каком формате предоставляются данные?',
        answer: 'Контакты предоставляются с полной информацией: имя, телефон, email, источник, время активности, дополнительные данные профиля. Экспорт возможен в CSV, Excel, JSON форматах.'
      }
    ],
    pricing: [
      {
        id: 'identification-cost',
        question: 'Сколько стоят идентификации?',
        answer: 'Базовая стоимость 249₽ за идентификацию. Действуют скидки: от 500 шт. — 10%, от 1000 шт. — 20%, от 2000 шт. — 30%, от 3000 шт. — 35%, от 4000 шт. — 40%. Первые 50 идентификаций бесплатно.'
      },
      {
        id: 'call-center-cost',
        question: 'Что включает услуга колл-центра?',
        answer: 'Услуга включает до 3 попыток дозвона, работу профессиональных операторов, полный отчет по каждому звонку. Стоимость 249₽ за успешный контакт. Оплата только за результат.'
      },
      {
        id: 'payment-methods',
        question: 'Какие способы оплаты доступны?',
        answer: 'Принимаем банковские карты, переводы, электронные кошельки. Доступна оплата через юридическое лицо с выставлением счета и предоставлением документов.'
      }
    ],
    legal: [
      {
        id: 'data-legality',
        question: 'Законно ли использование таких данных?',
        answer: 'Да, мы работаем в полном соответствии с законодательством РФ и международными стандартами защиты данных. Все данные получены из открытых источников или с согласия пользователей.'
      },
      {
        id: 'quality-guarantee',
        question: 'Есть ли гарантия качества лидов?',
        answer: 'Мы гарантируем актуальность данных и предоставляем замену неактивных контактов. Также действует политика возврата средств при несоответствии заявленному качеству.'
      },
      {
        id: 'data-privacy',
        question: 'Как обеспечивается конфиденциальность?',
        answer: 'Все данные хранятся на защищенных серверах с шифрованием. Доступ имеют только авторизованные сотрудники. Мы соблюдаем все требования по защите персональных данных.'
      }
    ]
  };

  const toggleQuestion = (questionId: string) => {
    setOpenQuestion(openQuestion === questionId ? null : questionId);
  };

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
            Часто задаваемые{' '}
            <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
              вопросы
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-4xl px-2 leading-relaxed">
            Ответы на самые популярные вопросы о работе с Jarvis Leads
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-2 mb-8 p-2 bg-white/5 rounded-2xl border border-orange-500/20"
          >
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </Button>
            ))}
          </motion.div>

          {/* All Questions Button */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-right mb-6"
          >
            <Button
              variant="ghost"
              className="text-orange-400 hover:text-orange-300 hover:bg-orange-500/10"
            >
              Все вопросы
            </Button>
          </motion.div>

          {/* FAQ Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {faqData[activeTab as keyof typeof faqData].map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-white/5 backdrop-blur-md border border-orange-500/20 rounded-2xl overflow-hidden">
                  <CardContent className="p-0">
                    <button
                      onClick={() => toggleQuestion(faq.id)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500/30 to-orange-600/30 rounded-xl flex items-center justify-center flex-shrink-0">
                          <HelpCircle className="w-5 h-5 text-orange-300" />
                        </div>
                        <h3 className="text-lg font-semibold text-white pr-4">
                          {faq.question}
                        </h3>
                      </div>
                      <motion.div
                        animate={{ rotate: openQuestion === faq.id ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      </motion.div>
                    </button>
                    
                    <AnimatePresence>
                      {openQuestion === faq.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pl-20">
                            <p className="text-gray-300 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}