import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Globe, 
  Database, 
  ShieldCheck, 
  Target,
  Users,
  TrendingUp,
  Phone,
  Smartphone,
  Eye,
  Gift,
  CheckCircle,
  ArrowUp,
  Menu,
  X,
  HeadphonesIcon,
  BookOpen,
  Settings,
  BarChart3,
  Sparkles,
  Zap,
  Star,
  Play,
  Brain,
  Cpu,
  Rocket
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { JarvisLogo } from '../components/JarvisLogo';
import { AnimatedLogo } from '../components/AnimatedLogo';
import { PhoneFrameWithNotifications } from '../components/PhoneFrameWithNotifications';
// Store removed - using props instead
import { FAQItem } from '../components/FAQItem';
import { CallCenterSection } from '../components/CallCenterSection';
import { FAQSection } from '../components/FAQSection';
import { SpecialOfferPopup } from '../components/SpecialOfferPopup';
import { FloatingOfferButton } from '../components/FloatingOfferButton';


interface LandingScreenProps {
  onStartLeadGen: () => void;
}

export function LandingScreen({ onStartLeadGen }: LandingScreenProps) {
  const [priceCalculator, setPriceCalculator] = useState(1000);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState<'construction' | 'realestate' | 'renovation' | 'finance'>('construction');
  const [showSpecialOffer, setShowSpecialOffer] = useState(false);
  const [hasSeenSpecialOffer, setHasSeenSpecialOffer] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, 100]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0.8]);

  // Navigation handled via props

  // Show special offer popup after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasSeenSpecialOffer) {
        setShowSpecialOffer(true);
      }
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, [hasSeenSpecialOffer]);

  const handleSpecialOfferClose = () => {
    setShowSpecialOffer(false);
    setHasSeenSpecialOffer(true);
  };

  const handleSpecialOfferAccept = () => {
    setShowSpecialOffer(false);
    setHasSeenSpecialOffer(true);
    onStartLeadGen();
  };

  const handleFloatingOfferClick = () => {
    setShowSpecialOffer(true);
  };

  const collectionMethods = [
    {
      icon: Globe,
      title: "Сбор контактов с вашего сайта",
      description: "Установите наш пиксель на ваш сайт и получайте до 70% контактов посетителей. Превратите текущую аудиторию в клиентов.",
      highlight: "до 70% контактов"
    },
    {
      icon: Database, 
      title: "Сбор контактов с других сайтов",
      description: "Собирайте до 20% контактов пользователей, которые посещают похожие сайты в вашей нише. Привлекайте тех, кто уже интересуется вашими услугами.",
      highlight: "до 20% контактов"
    },
    {
      icon: Phone,
      title: "Сбор контактов с телефонных номеров", 
      description: "Получайте до 20% контактов, связанных со звонками на номера и с номеров, которые вас интересуют. Узнайте, кто звонит и кому звонят ваши конкуренты.",
      highlight: "до 20% контактов"
    },
    {
      icon: Target,
      title: "Готовые ниши и категории",
      description: "Используйте готовые решения для популярных ниш. Работайте с аудиторией, которая уже проявила интерес, и быстро выходите на целевой рынок.",
      highlight: "готовые решения"
    }
  ];

  const benefits = [
    {
      icon: Users,
      title: "Доступ к заинтересованной аудитории",
      description: "Вы получаете контакты пользователей, которые уже проявили интерес к вашим продуктам или услугам, что повышает вероятность конверсии."
    },
    {
      icon: TrendingUp,
      title: "Снижение стоимости привлечения клиента в 2-5 раз",
      description: "Наш сервис позволяет существенно снизить затраты на привлечение клиентов, предоставляя контакты потенциальных клиентов напрямую."
    },
    {
      icon: Target,
      title: "Максимальная эффективность за счет прямого контакта",
      description: "Вы взаимодействуете с клиентами напрямую, исключая этап рекламных ставок и конкурентной борьбы. Это позволяет сократить время привлечения."
    }
  ];

  const industryData = {
    construction: {
      title: "Строительство",
      before: {
        leads: "2 660",
        cost: "3 500 ₽",
        description: "Ранее компания использовала Яндекс.Директ и SEO для привлечения клиентов. Несмотря на определенные успехи, стоимость одного лида доходила до 3 500 рублей, что делало лидогенерацию дорогой и непредсказуемой."
      },
      after: {
        leads: "3 010", 
        cost: "700 ₽",
        description: "После перехода на Jarvis Leads стоимость лида снизилась до 700 рублей, а количество лидов увеличилось, что позволило компании эффективнее управлять бюджетом и значительно увеличить число клиентов."
      }
    },
    realestate: {
      title: "Недвижимость",
      before: {
        leads: "3 000",
        cost: "4 500 ₽", 
        description: "А��ентство недвижимости ранее работало через Google Ads и SEO-пр��движение. Лиды были дорогими — до 4 500 рублей за каждого, а конкуренция в контексте только росла."
      },
      after: {
        leads: "3 500",
        cost: "900 ₽",
        description: "С помощью Jarvis Leads агентство смогло снизить стоимость лида до 900 рублей, сохраняя при этом высокое качество поступающих заявок. Это дало возможность сэкономить на рекламных затратах и увеличить прибыль."
      }
    },
    renovation: {
      title: "Ремонт",
      before: {
        leads: "1 200",
        cost: "2 000 ₽",
        description: "Компания, занимающаяся ремонтом квартир, использовала соцсети и контекстную рекламу. Однако постоянные изменения в алгоритмах соцсетей и высокая стоимость кликов сделали лидогенерацию менее предсказуемой."
      },
      after: {
        leads: "1 380",
        cost: "500 ₽",
        description: "После перехода на Jarvis Leads стоимость лида снизилась до 500 рублей, что обеспечило более стабильный поток клиентов и предсказуемый рост бизнеса."
      }
    },
    finance: {
      title: "Финансы",
      before: {
        leads: "4 500",
        cost: "2 500 ₽",
        description: "Юридическая компания использовала SEO и публикации на специализированных сайтах для привлечения клиентов. Стоимость лида достигала 2 500 рублей, что делало расходы на привлечение клиентов чрезмерными."
      },
      after: {
        leads: "5 150",
        cost: "700 ₽",
        description: "С Jarvis Leads они смогли сократить стоимость до 700 рублей за лид, получая качественные заявки. Это позволило компании работать с большим количеством клиентов, улучшая экономическую эффективность своих рекламных вложений."
      }
    }
  };

  const handleGetStarted = () => {
    onStartLeadGen();
  };

  const calculatePrice = (amount: number) => {
    const basePrice = 249;
    const discounts = [
      { min: 0, discount: 0 },
      { min: 500, discount: 0.10 },
      { min: 1000, discount: 0.20 },
      { min: 2000, discount: 0.30 },
      { min: 3000, discount: 0.35 },
      { min: 4000, discount: 0.40 } // При 4000 цена будет 149₽ (249 * 0.6)
    ];
    
    const discount = discounts.reverse().find(d => amount >= d.min)?.discount || 0;
    return Math.round(basePrice * (1 - discount));
  };

  const calculateSavings = (amount: number) => {
    if (amount <= 100) return 0;
    const currentTotal = calculateTotal(amount);
    const originalTotal = amount <= 50 ? 0 : (amount - 50) * 249;
    const maxSavings = originalTotal - currentTotal;
    return Math.round(maxSavings * 0.7);
  };

  const calculateTotal = (amount: number) => {
    if (amount <= 50) return 0;
    const paidAmount = amount - 50;
    return paidAmount * calculatePrice(amount);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Holographic Grid Background */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(249, 115, 22, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(249, 115, 22, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        {/* Animated Gradient Orbs */}
        <motion.div
          className="absolute -top-40 -left-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -top-20 right-0 w-60 h-60 bg-orange-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 left-1/3 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl"
          animate={{
            x: [0, -120, 0],
            y: [0, -80, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Navigation */}
        <motion.nav 
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14 sm:h-16">
              {/* Logo */}
              <motion.div 
                className="flex items-center space-x-2 sm:space-x-3"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
                onClick={(e) => {
                  // Secret admin access - removed (not needed for website)
                }}
              >
                <JarvisLogo size={window.innerWidth < 640 ? 32 : 40} />
                <span className="text-xl sm:text-2xl font-bold logo-font">Jarvis Leads</span>
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <a href="#how" className="text-gray-300 hover:text-white transition-colors text-lg">Как это работает</a>
                <a href="#methods" className="text-gray-300 hover:text-white transition-colors text-lg">Способы сбора</a>
                <a href="#results" className="text-gray-300 hover:text-white transition-colors text-lg">Результаты</a>
                <a href="#support" className="text-gray-300 hover:text-white transition-colors text-lg">Поддержка</a>
              </div>

              {/* Start Button */}
              <div className="hidden md:flex items-center space-x-3">
                <Button
                  onClick={handleGetStarted}
                  className="px-6 py-2.5 rounded-2xl font-semibold transition-all duration-300 bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30 hover:shadow-lg hover:shadow-orange-500/40 text-base lg:text-lg font-bold"
                >
                  Начать
                </Button>
              </div>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden rounded-xl p-2"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {showMobileMenu && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-black/90 backdrop-blur-md border-t border-white/10"
              >
                <div className="px-4 py-5 space-y-4">
                  <a href="#how" className="block text-gray-300 hover:text-white transition-colors text-base py-2">Как это работает</a>
                  <a href="#methods" className="block text-gray-300 hover:text-white transition-colors text-base py-2">Способы сбора</a>
                  <a href="#results" className="block text-gray-300 hover:text-white transition-colors text-base py-2">Результаты</a>
                  <a href="#support" className="block text-gray-300 hover:text-white transition-colors text-base py-2">Поддержка</a>
                  <div className="flex flex-col space-y-3 pt-4 border-t border-white/10">
                    <Button
                      onClick={handleGetStarted}
                      className="px-7 py-2.5 rounded-2xl font-semibold transition-all duration-300 bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30 hover:shadow-lg hover:shadow-orange-500/40 text-base font-bold"
                    >
                      Начать
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>

        {/* Hero Section */}
        <section className="relative pt-20 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0">
            {/* Enhanced Grid Background */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(249, 115, 22, 0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(249, 115, 22, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: '80px 80px'
              }}
            />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-orange-600/10"
              style={{ y: y1, opacity }}
            />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-tl from-orange-600/5 via-transparent to-orange-500/5"
              style={{ y: y2 }}
            />
          </div>

          <div className="container mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Content */}
              <div className="space-y-6 sm:space-y-7 lg:space-y-8 text-left">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight heading-font">
                    Идентифицируйте горячих клиентов
                    <br className="hidden md:block" />
                    <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                      и растите x2–x3
                    </span>
                  </h1>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-5 lg:p-6"
                >
                  <p className="text-base sm:text-lg lg:text-xl text-gray-200 leading-relaxed">
                    Jarvis Leads находит и идентифицирует людей, которые уже интересуются вашими услугами. Вы получаете контакты — мы берём на себя идентификацию и первичную валидацию.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
                >
                  <Button
                    onClick={handleGetStarted}
                    size="lg"
                    className="px-6 sm:px-8 md:px-12 py-3 sm:py-4 rounded-2xl font-semibold transition-all duration-300 bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30 hover:shadow-lg hover:shadow-orange-500/40 text-base sm:text-lg lg:text-xl font-bold group"
                  >
                    <span className="text-center">Начать бесплатно</span>
                    <motion.div className="ml-2" animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                      <ArrowRight size={18} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                    </motion.div>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-6 sm:px-8 md:px-12 py-3 sm:py-4 rounded-2xl border-white/20 text-white hover:bg-white/10"
                    onClick={() => document.getElementById('methods')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Посмотреть как это работает
                  </Button>
                </motion.div>

                {/* Trust badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-2">
                  {[
                    '94% точность данных',
                    '50 лидов бесплатно',
                    'Оплата за результат',
                    '15 минут внедрение'
                  ].map((text, i) => (
                    <div key={i} className="text-center text-xs sm:text-sm text-gray-300 bg-white/5 border border-white/10 rounded-xl py-2">
                      {text}
                    </div>
                  ))}
                </div>
              </div>

              {/* Hero Image with iPhone */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="relative order-first lg:order-last mt-8 lg:mt-0"
              >
                <div className="relative flex justify-center">
                  {/* iPhone with Notifications */}
                  <div className="w-[280px] h-[500px] sm:w-[320px] sm:h-[580px] lg:w-[350px] lg:h-[620px]">
                    <PhoneFrameWithNotifications className="w-full h-full" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-orange-500/30 rounded-full"
                animate={{
                  x: [0, Math.random() * 800],
                  y: [0, Math.random() * 600],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 15 + Math.random() * 10,
                  repeat: Infinity,
                  delay: Math.random() * 5
                }}
                style={{
                  left: Math.random() * 800,
                  top: Math.random() * 600
                }}
              />
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-left mb-8 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 heading-font">
                У нас совершенно новый подход к{' '}
                <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                  лидогенерации
                </span>
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-4xl px-2 leading-relaxed">
                В современном мире, где рекламодатели борются за каждый клик в контекстной и таргетированной рекламе, 
                мы предлагаем инновационное решение, которое позволяет привлекать клиентов эффективнее и дешевле.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
              {[
                {
                  title: "Пользователь посещает интересующий вас ресурс",
                  description: "Когда пользователь переходит на ваш сайт или другие онлайн-площадки, связанные с вашей нишей, мы фиксируем это взаимодействие.",
                  icon: Eye
                },
                {
                  title: "Обработка данных в течение 24 часов",
                  description: "В течение суток после посещения пользователем выбранных ресурсов наши системы обрабатывают данные и готовят информацию для вас.",
                  icon: Database
                },
                {
                  title: "Доступ к контактным данным через личный кабинет",
                  description: "Вы получаете доступ к контактам потенциальных клиентов в вашем личном кабинете, где можете добавлять источники, выгружать данные и анализировать контакты.",
                  icon: Target
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ 
                    opacity: 0, 
                    x: index % 2 === 0 ? -100 : 100,
                    rotateY: index % 2 === 0 ? -15 : 15
                  }}
                  whileInView={{ 
                    opacity: 1, 
                    x: 0,
                    rotateY: 0
                  }}
                  viewport={{ once: true, margin: "-150px" }}
                  transition={{ 
                    delay: index * 0.3,
                    duration: 0.8,
                    type: "spring",
                    stiffness: 100
                  }}
                  className="group"
                >
                  <Card className="h-full bg-white/5 backdrop-blur-md border border-orange-500/20 transition-all duration-500 rounded-3xl overflow-hidden relative">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-orange-500/15 via-transparent to-amber-500/15 rounded-3xl"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                    />
                    <CardContent className="p-8 lg:p-10 text-left space-y-6 relative z-10">
                      <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-orange-500/30 to-orange-600/30 rounded-2xl flex items-center justify-center">
                        <step.icon 
                          size={32} 
                          className="lg:w-10 lg:h-10 text-orange-300" 
                        />
                      </div>
                      
                      <h3 className="text-xl lg:text-2xl font-bold text-white leading-tight heading-font">
                        {step.title}
                      </h3>
                      
                      <p className="text-gray-300 text-base lg:text-lg leading-relaxed">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mid-CTA Section */}
        <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Card className="bg-gradient-to-br from-orange-400/30 via-orange-500/25 to-orange-700/20 backdrop-blur-md border border-orange-500/30 rounded-3xl overflow-hidden">
                <CardContent className="p-8 lg:p-16">
                  <div className="space-y-8">
                    <div className="flex items-center justify-center space-x-4">
                      <Rocket className="w-8 h-8 lg:w-10 lg:h-10 text-orange-300" />
                      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white heading-font">
                        Готовы увеличить продажи?
                      </h2>
                    </div>
                    
                    <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                      Присоединяйтесь к тысячам компаний, которые уже используют Jarvis Leads для роста своего бизнеса
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                      <Button
                        onClick={handleGetStarted}
                        size="lg"
                        className="px-12 py-4 rounded-2xl font-semibold transition-all duration-300 bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30 hover:shadow-lg hover:shadow-orange-500/40 text-lg font-bold"
                      >
                        Начать бесплатно
                      </Button>
                      
                      <p className="text-sm text-gray-400">
                        Первые 50 идентификаций бесплатно
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Collection Methods Section */}
        <section id="methods" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-left mb-8 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 heading-font">
                Способы сбора контактов
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-4xl px-2 leading-relaxed">
                Jarvis Leads предлагает четыре способа получения горячих лидов для увеличения продаж и привлечения целевой аудитории
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
              {collectionMethods.map((method, index) => (
                <motion.div
                  key={index}
                  initial={{ 
                    opacity: 0, 
                    y: index < 2 ? -50 : 50,
                    x: index % 2 === 0 ? -30 : 30,
                    rotateX: 20
                  }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0,
                    x: 0,
                    rotateX: 0
                  }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: index * 0.2,
                    duration: 0.8,
                    type: "spring",
                    stiffness: 100
                  }}
                  className="group"
                >
                  <Card className="h-full bg-white/5 backdrop-blur-md border border-orange-500/20 transition-all duration-500 rounded-3xl overflow-hidden relative">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-orange-500/15 via-transparent to-orange-600/15 rounded-3xl"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                    />
                    <CardContent className="p-8 lg:p-10 text-left space-y-6 relative z-10">
                      <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-orange-500/30 to-orange-600/30 rounded-2xl flex items-center justify-center">
                        <method.icon 
                          size={32} 
                          className="lg:w-10 lg:h-10 text-orange-300" 
                        />
                      </div>
                      
                      <h3 className="text-xl lg:text-2xl font-bold text-white leading-tight heading-font">
                        {method.title}
                      </h3>
                      
                      <p className="text-gray-300 text-base lg:text-lg leading-relaxed">
                        {method.description}
                      </p>
                      
                      <div className="inline-block">
                        <Badge className="bg-gradient-to-r from-orange-500/30 to-orange-600/30 text-orange-200 border border-orange-500/50 text-base lg:text-lg px-6 py-3 rounded-2xl">
                          {method.highlight}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-left mb-8 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 heading-font">
                Преимущества <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">Jarvis Leads</span>
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-4xl px-2 leading-relaxed">
                Наш сервис предоставляет уникальные возможности для роста вашего бизнеса
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: index * 0.2,
                    duration: 0.8,
                    type: "spring",
                    stiffness: 100
                  }}
                  className="group"
                >
                  <Card className="h-full bg-white/5 backdrop-blur-md border border-orange-500/20 transition-all duration-500 rounded-3xl overflow-hidden relative">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-orange-500/15 via-transparent to-orange-600/15 rounded-3xl"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                    />
                    <CardContent className="p-8 lg:p-10 text-left space-y-6 relative z-10">
                      <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-orange-500/30 to-orange-600/30 rounded-2xl flex items-center justify-center">
                        <benefit.icon 
                          size={32} 
                          className="lg:w-10 lg:h-10 text-orange-300" 
                        />
                      </div>
                      
                      <h3 className="text-xl lg:text-2xl font-bold text-white leading-tight heading-font">
                        {benefit.title}
                      </h3>
                      
                      <p className="text-gray-300 text-base lg:text-lg leading-relaxed">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section id="results" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-left mb-8 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 heading-font">
                Результаты наших клиентов
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-4xl px-2 leading-relaxed">
                Реальные результаты использования Jarvis Leads в различных отраслях
              </p>
            </motion.div>

            {/* Industry Selector */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {Object.entries(industryData).map(([key, data]) => (
                <Button
                  key={key}
                  onClick={() => setSelectedIndustry(key as any)}
                  variant={selectedIndustry === key ? "default" : "outline"}
                  className={`px-6 py-3 rounded-2xl transition-all duration-300 ${
                    selectedIndustry === key
                      ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30"
                      : "border-orange-500/50 text-orange-300 hover:bg-orange-500/10"
                  }`}
                >
                  {data.title}
                </Button>
              ))}
            </div>

            {/* Results Display */}
            <motion.div
              key={selectedIndustry}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
            >
              {/* Before */}
              <Card className="bg-white/5 backdrop-blur-md border border-red-500/20 rounded-3xl overflow-hidden">
                <CardContent className="p-8 lg:p-10">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                      <h3 className="text-xl lg:text-2xl font-bold text-white heading-font">До Jarvis Leads</h3>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 sm:gap-6">
                      <div>
                        <p className="text-xs sm:text-sm text-gray-400 mb-1 sm:mb-2">Количество лидов</p>
                        <p className="text-lg sm:text-2xl lg:text-3xl font-bold text-white">{industryData[selectedIndustry].before.leads}</p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-400 mb-1 sm:mb-2">Стоимость лида</p>
                        <p className="text-lg sm:text-2xl lg:text-3xl font-bold text-red-400">{industryData[selectedIndustry].before.cost}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 text-base lg:text-lg leading-relaxed">
                      {industryData[selectedIndustry].before.description}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* After */}
              <Card className="bg-white/5 backdrop-blur-md border border-orange-500/20 rounded-3xl overflow-hidden">
                <CardContent className="p-8 lg:p-10">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                      <h3 className="text-xl lg:text-2xl font-bold text-white heading-font">После Jarvis Leads</h3>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-gray-400 mb-2">Количество лидов</p>
                        <p className="text-2xl lg:text-3xl font-bold text-white">{industryData[selectedIndustry].after.leads}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-2">Стоимость лида</p>
                        <p className="text-2xl lg:text-3xl font-bold text-orange-400">{industryData[selectedIndustry].after.cost}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 text-base lg:text-lg leading-relaxed">
                      {industryData[selectedIndustry].after.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Pricing Calculator Section */}
        <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 heading-font">
                Калькулятор стоимости
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Рассчитайте стоимость идентификаций с учетом скидок за объем
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <Card className="bg-white/5 backdrop-blur-md border border-orange-500/20 rounded-3xl overflow-hidden">
                <CardContent className="p-8 lg:p-10">
                  <div className="space-y-8">
                    <div>
                      <label className="block text-lg font-medium text-white mb-4">
                        Количество идентификаций: {priceCalculator.toLocaleString()}
                      </label>
                      <input
                        type="range"
                        min="100"
                        max="4000"
                        step="50"
                        value={priceCalculator}
                        onChange={(e) => setPriceCalculator(Number(e.target.value))}
                        className="w-full h-3 bg-gray-700 rounded-lg slider appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-sm text-gray-400 mt-2">
                        <span>100</span>
                        <span>4,000</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="text-center">
                        <p className="text-sm text-gray-400 mb-2">Старые способы</p>
                        <p className="text-2xl lg:text-3xl font-bold text-gray-500 line-through">
                          {(priceCalculator * 800).toLocaleString()} ₽
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-400 mb-2">Цена за идентификацию</p>
                        <p className="text-2xl lg:text-3xl font-bold text-orange-400">
                          {calculatePrice(priceCalculator)} ₽
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-400 mb-2">Общая стоимость</p>
                        <p className="text-2xl lg:text-3xl font-bold text-white">
                          {calculateTotal(priceCalculator).toLocaleString()} ₽
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-400 mb-2">Экономия</p>
                        <p className="text-2xl lg:text-3xl font-bold text-green-400">
                          {((priceCalculator * 800) - calculateTotal(priceCalculator)).toLocaleString()} ₽
                        </p>
                      </div>
                    </div>

                    <div className="text-center space-y-4">
                      <Button
                        onClick={handleGetStarted}
                        size="lg"
                        className="px-12 py-4 rounded-2xl font-semibold transition-all duration-300 bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30 hover:shadow-lg hover:shadow-orange-500/40 text-lg font-bold"
                      >
                        Начать использовать
                      </Button>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-center space-x-2">
                          <Gift className="w-5 h-5 text-green-400" />
                          <p className="text-green-400 font-medium text-lg">
                            Первые 50 лидов - бесплатно!
                          </p>
                        </div>
                        
                        {/* Акция на объем */}
                        {priceCalculator >= 500 && (
                          <div className="bg-yellow-500/20 border border-yellow-500/30 p-3 rounded-xl">
                            <div className="flex items-center justify-center space-x-2">
                              <Sparkles className="w-5 h-5 text-yellow-400" />
                              <span className="text-yellow-400 font-semibold">
                                {priceCalculator >= 4000 ? 'Максимальная скидка 40%!' : 
                                 priceCalculator >= 3000 ? 'Скидка 35% за объем!' :
                                 priceCalculator >= 2000 ? 'Скидка 30% за объем!' :
                                 priceCalculator >= 1000 ? 'Скидка 20% за объем!' :
                                 'Скидка 10% за объем!'}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section id="support" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 heading-font">
                Поддержка и помощь
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Мы всегда готовы помочь вам максимально эффективно использовать наш сервис
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Users,
                  title: "Директор по партнерству",
                  description: "Антон Залихов - персональная консультация и партнерские вопросы",
                  contact: "+7 (901) 438-93-95",
                  telegram: "t.me/man_zali",
                  email: "Jarvis.ai.ecosystem@gmail.com"
                },
                {
                  icon: HeadphonesIcon,
                  title: "Техническая поддержка",
                  description: "Круглосуточная помощь по техническим вопросам",
                  contact: "support@jarvisleads.com"
                },
                {
                  icon: BookOpen,
                  title: "База знаний",
                  description: "Подробные ��нструкции и ответы на вопросы",
                  contact: "Доступна в личном кабинете"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                >
                  <Card className="h-full bg-white/5 backdrop-blur-md border border-orange-500/20 transition-all duration-500 rounded-3xl overflow-hidden">
                    <CardContent className="p-8 text-center space-y-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-500/30 to-orange-600/30 rounded-2xl flex items-center justify-center mx-auto">
                        <item.icon size={24} className="text-orange-300" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-white heading-font">
                        {item.title}
                      </h3>
                      
                      <p className="text-gray-300 leading-relaxed">
                        {item.description}
                      </p>
                      
                      <div className="space-y-2">
                        <p className="text-orange-400 font-medium">
                          {item.contact}
                        </p>
                        {item.telegram && (
                          <a 
                            href={`https://${item.telegram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 text-sm hover:text-blue-300 transition-colors cursor-pointer"
                          >
                            Telegram: {item.telegram}
                          </a>
                        )}
                        {item.email && (
                          <p className="text-gray-400 text-sm">
                            {item.email}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call Center Section */}
        <CallCenterSection />

        {/* FAQ Section */}
        <FAQSection />

        {/* CTA Section */}
        <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Card className="bg-gradient-to-br from-orange-300/35 via-orange-500/30 to-orange-800/25 backdrop-blur-md border border-orange-500/30 rounded-3xl overflow-hidden">
                <CardContent className="p-8 lg:p-16">
                  <div className="space-y-8">
                    <div className="flex items-center justify-center space-x-4">
                      <Sparkles className="w-8 h-8 lg:w-10 lg:h-10 text-orange-300" />
                      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white heading-font">
                        Готовы увеличить продажи?
                      </h2>
                    </div>
                    
                    <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                      Присоединяйтесь к тысячам компаний, которые уже используют Jarvis Leads для роста своего бизнеса
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                      <Button
                        onClick={handleGetStarted}
                        size="lg"
                        className="px-12 py-4 rounded-2xl font-semibold transition-all duration-300 bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30 hover:shadow-lg hover:shadow-orange-500/40 text-lg font-bold"
                      >
                        Начать бесплатно
                      </Button>
                      
                      <p className="text-sm text-gray-400">
                        Первые 50 идентификаций бесплатно
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>



        {/* Footer */}
        <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <JarvisLogo size={32} />
                  <span className="text-xl font-bold logo-font">Jarvis Leads</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Современная платформа для эффективной генерации лидов
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-white mb-4">Продукт</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Возможности</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Цены</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Интеграции</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-white mb-4">Компания</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">О нас</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Блог</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Карьера</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Контакты</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-white mb-4">Поддержка</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Помощь</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Документация</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Статус</a></li>
                  <li>
                    <a 
                      href="https://t.me/man_zali" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors flex items-center gap-2"
                    >
                      📞 Связаться в Telegram
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
              <p>&copy; 2024 Jarvis Leads. Все права защищены.</p>
            </div>
          </div>
        </footer>
      </div>

      {/* Special Offer Popup */}
      <SpecialOfferPopup
        isVisible={showSpecialOffer}
        onClose={handleSpecialOfferClose}
        onAccept={handleSpecialOfferAccept}
      />

      {/* Floating Offer Button - shows when popup was closed */}
      {hasSeenSpecialOffer && !showSpecialOffer && (
        <FloatingOfferButton onClick={handleFloatingOfferClick} />
      )}



    </div>
  );
}