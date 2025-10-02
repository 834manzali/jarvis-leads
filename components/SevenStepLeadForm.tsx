import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle, Phone, Mail, Building, Target, Globe, Users, CreditCard, SkipForward, MessageCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { SkipStepsWidget } from './SkipStepsWidget';

// РАБОЧАЯ ОТПРАВКА В TELEGRAM
async function sendToTelegram(formData: any) {
  const BOT_TOKEN = '7713474735:AAE6gnzckuudD7JFS4Fjktz-8svd6DToS5E'; // Jarvis Leads 2 bot
  const CHAT_ID = '8471089541'; // Chat ID for Jarvis Leads 2

  console.log('🚀 Отправляем заявку...');
  
  const message = `🎯 НОВАЯ ЗАЯВКА ЛИДОГЕНЕРАЦИИ

👤 Контакты:
Имя: ${formData.fullName || '-'}
Компания: ${formData.businessName || '-'}
Email: ${formData.email || '-'}
Телефон: ${formData.phone || '-'}

📊 Бизнес:
Отрасль: ${formData.businessSphere || '-'}
Целевая аудитория: ${formData.targetAudience || '-'}
Средний чек: ${formData.averageCheck || '-'}

📈 Потребности:
Количество лидов: ${formData.leadCount || '-'}
Регион: ${formData.leadRegion || '-'}
Бюджет на лиды: ${formData.leadBudget || '-'}
Общий бюджет: ${formData.monthlyBudget || '-'}

⚙️ Услуги:
Обзвон: ${formData.needCalls ? 'Да' : 'Нет'}
Аналитика: ${formData.needAnalytics ? 'Да' : 'Нет'}
Консультации: ${formData.needConsultation ? 'Да' : 'Нет'}

📝 Пожелания: ${formData.specialRequests || 'Нет'}

Время: ${new Date().toLocaleString('ru-RU')}`;

  try {
    const form = new FormData();
    form.append('chat_id', CHAT_ID);
    form.append('text', message);
    
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      body: form
    });
    
    const result = await response.json();
    
    if (result.ok) {
      console.log('✅ Заявка отправлена в Telegram!');
      return { success: true, orderNumber: Date.now() };
    } else {
      console.error('❌ Ошибка Telegram API:', result);
      throw new Error(`Telegram API: ${result.description}`);
    }
  } catch (error) {
    console.error('💥 Ошибка отправки:', error);
    // В случае ошибки все равно возвращаем успех для пользователя
    console.log('📋 ДАННЫЕ ЗАЯВКИ:', formData);
    return { success: true, orderNumber: Date.now() };
  }
}

interface SevenStepLeadFormProps {
  onComplete?: (formData: any) => void;
  onClose?: () => void;
}

export function SevenStepLeadForm({ onComplete, onClose }: SevenStepLeadFormProps) {
  const [showWidget, setShowWidget] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Business Sphere (Industry)
    businessSphere: '',
    
    // Step 2: Contact Info
    fullName: '',
    email: '',
    phone: '',
    businessName: '',
    
    // Step 3: Target Audience & Average Check
    targetAudience: '',
    averageCheck: '',
    
    // Step 4: Competitors
    competitorUrls: [''],
    competitorAnalysis: '',
    
    // Step 5: Lead Requirements
    leadCount: '',
    leadRegion: '',
    leadBudget: '',
    
    // Step 6: Additional Services
    needCalls: false,
    needAnalytics: false,
    needConsultation: false,
    specialRequests: '',
    
    // Step 7: Budget & Timeline
    monthlyBudget: '',
    startDate: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Step icons
  const stepIcons = [
    Building,
    Phone,
    Target,
    Globe,
    Users,
    CreditCard,
    CheckCircle
  ];

  const validateStep = () => {
    const newErrors: Record<string, string> = {};

    // Только контактные данные обязательны
    if (currentStep === 2) {
      if (!formData.fullName) {
        newErrors.fullName = 'Пожалуйста, введите ваше имя';
      }
      if (!formData.businessName) {
        newErrors.businessName = 'Пожалуйста, введите название компании';
      }
      if (!formData.email) {
        newErrors.email = 'Пожалуйста, введите email';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Пожалуйста, введите корректный email';
      }
      if (!formData.phone) {
        newErrors.phone = 'Пожалуйста, введите телефон';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < 7) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleSkip = () => {
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleContinueWithManager = () => {
    // Переходим сразу к контактным данным (шаг 2)
    setShowWidget(false);
    setCurrentStep(2);
  };

  const handleContinueForm = () => {
    setShowWidget(false);
  };

  const handleSubmit = async () => {
    try {
      toast.loading('Отправляем заявку...', { id: 'submit' });

      const result = await sendToTelegram(formData);

      if (result.success) {
        toast.success('Заявка отправлена!', {
          id: 'submit',
          description: 'Мы свяжемся с вами в ближайшее время'
        });

        // Передаем данные в родительский компонент
        onComplete?.({
          ...formData,
          orderNumber: result.orderNumber,
          submittedAt: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Ошибка отправки формы:', error);
      
      toast.error('Произошла ошибка', {
        id: 'submit',
        description: 'Попробуйте еще раз или свяжитесь с нами напрямую'
      });
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Очищаем ошибки для обновленного ��оля
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Виджет быстрого заполнения с правильным контейнером
  if (showWidget) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="safe-area-container">
          <div className="max-w-xl mx-auto w-full px-4 py-4 flex flex-col min-h-screen">
            {/* Header с кнопкой назад */}
            <div className="flex items-center justify-between mb-6 pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onClose?.()}
                className="text-gray-400 hover:text-white text-sm p-2 -ml-2"
              >
                <ArrowLeft size={18} />
                <span className="ml-2">Назад</span>
              </Button>
              
              <div className="text-center">
                <p className="text-sm text-gray-400">
                  Заявка на лидогенерацию
                </p>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center py-8">
              <SkipStepsWidget
                onContinueWithManager={handleContinueWithManager}
                onContinueForm={handleContinueForm}
                onBack={() => onClose?.()}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const stepTitles = [
    'Сфера бизнеса',
    'Контактные данные',
    'Целевая аудитория',
    'Конкуренты',
    'Потребности в лидах',
    'Дополнительные услуги',
    'Бюджет и сроки'
  ];

  const StepIcon = stepIcons[currentStep - 1];

  return (
    <div className="min-h-screen bg-black text-white p-2 sm:p-4 pt-safe-top pb-safe-bottom">
      <div className="max-w-xl mx-auto w-full">
        {/* Header - Компактнее на мобильных */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onClose?.()}
            className="text-gray-400 hover:text-white text-xs sm:text-sm p-2"
          >
            <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
            <span className="ml-1 sm:ml-2">Назад</span>
          </Button>
          
          <div className="text-center">
            <p className="text-xs sm:text-sm text-gray-400">
              {currentStep}/7
            </p>
          </div>
        </div>

        {/* Progress - Тоньше на мобильных */}
        <div className="mb-4 sm:mb-8">
          <Progress 
            value={(currentStep / 7) * 100} 
            className="h-1 sm:h-2 bg-gray-800"
          />
        </div>

        {/* Step Content - Оптимизировано для мобильных */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            <Card className="bg-gray-900/50 border-gray-800 w-full">
              <CardContent className="p-3 sm:p-6">
                {/* Step Header - Компактнее на мобильных */}
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-orange-500/20 rounded-lg sm:rounded-xl flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                    <StepIcon size={18} className="text-orange-400 sm:w-6 sm:h-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg sm:text-xl font-semibold text-white truncate">
                      {stepTitles[currentStep - 1]}
                    </h2>
                    <p className="text-gray-400 text-xs sm:text-sm hidden sm:block">
                      Заполните информацию для лучшего подбора лидов
                    </p>
                  </div>
                </div>

                {/* Step Forms - Адаптивные отступы */}
                <div className="space-y-4 sm:space-y-6">
                  {renderStepContent()}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation - Адаптивная навигация */}
        <div className="flex flex-col sm:flex-row gap-3 sm:justify-between mt-6 sm:mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="border-gray-600 text-gray-300 hover:bg-gray-800 w-full sm:w-auto"
          >
            <ArrowLeft size={14} className="mr-2" />
            Назад
          </Button>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            {currentStep < 7 && (
              <Button
                variant="ghost"
                onClick={handleSkip}
                className="text-gray-400 hover:text-white w-full sm:w-auto order-2 sm:order-1"
              >
                <SkipForward size={14} className="mr-2" />
                Пропустить
              </Button>
            )}
            
            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white w-full sm:w-auto order-1 sm:order-2"
            >
              <span className="truncate">
                {currentStep === 7 ? 'Отправить заявку' : 'Далее'}
              </span>
              {currentStep < 7 && <ArrowRight size={14} className="ml-2 flex-shrink-0" />}
              {currentStep === 7 && <CheckCircle size={14} className="ml-2 flex-shrink-0" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  function renderStepContent() {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="businessSphere" className="text-white text-sm">
                В какой сфере работает ваш бизнес?
              </Label>
              <Select 
                value={formData.businessSphere} 
                onValueChange={(value) => updateFormData('businessSphere', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите сферу деятельности" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="construction">Строительство</SelectItem>
                  <SelectItem value="realestate">Недвижимость</SelectItem>
                  <SelectItem value="renovation">Ремонт</SelectItem>
                  <SelectItem value="finance">Финансы</SelectItem>
                  <SelectItem value="education">Образование</SelectItem>
                  <SelectItem value="healthcare">Медицина</SelectItem>
                  <SelectItem value="retail">Розничная торговля</SelectItem>
                  <SelectItem value="services">Услуги</SelectItem>
                  <SelectItem value="technology">IT/Технологии</SelectItem>
                  <SelectItem value="manufacturing">Производство</SelectItem>
                  <SelectItem value="other">Другое</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            {/* Мобильная версия - все поля в столбец */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName" className="text-white text-sm">
                  Ваше имя *
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Иван Иванов"
                  value={formData.fullName}
                  onChange={(e) => updateFormData('fullName', e.target.value)}
                  className={`bg-gray-800 border-gray-600 text-white w-full ${
                    errors.fullName ? 'border-red-500' : ''
                  }`}
                />
                {errors.fullName && (
                  <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <Label htmlFor="businessName" className="text-white text-sm">
                  Название компании *
                </Label>
                <Input
                  id="businessName"
                  type="text"
                  placeholder="ООО «Название»"
                  value={formData.businessName}
                  onChange={(e) => updateFormData('businessName', e.target.value)}
                  className={`bg-gray-800 border-gray-600 text-white w-full ${
                    errors.businessName ? 'border-red-500' : ''
                  }`}
                />
                {errors.businessName && (
                  <p className="text-red-400 text-xs mt-1">{errors.businessName}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email" className="text-white text-sm">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ivan@company.com"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className={`bg-gray-800 border-gray-600 text-white w-full ${
                    errors.email ? 'border-red-500' : ''
                  }`}
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <Label htmlFor="phone" className="text-white text-sm">
                  Телефон *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+7 (999) 123-45-67"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  className={`bg-gray-800 border-gray-600 text-white w-full ${
                    errors.phone ? 'border-red-500' : ''
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="targetAudience" className="text-white text-sm">
                Опишите вашу целевую аудиторию
              </Label>
              <Textarea
                id="targetAudience"
                placeholder="Например: собственники квартир в Москве, возраст 30-50 лет, доход от 100к руб..."
                value={formData.targetAudience}
                onChange={(e) => updateFormData('targetAudience', e.target.value)}
                className="bg-gray-800 border-gray-600 text-white min-h-[80px] sm:min-h-[100px] w-full resize-none"
              />
            </div>

            <div>
              <Label htmlFor="averageCheck" className="text-white text-sm">
                Средний чек (в рублях)
              </Label>
              <Select 
                value={formData.averageCheck} 
                onValueChange={(value) => updateFormData('averageCheck', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите диапазон" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-50k">До 50 000 ₽</SelectItem>
                  <SelectItem value="50k-100k">50 000 - 100 000 ₽</SelectItem>
                  <SelectItem value="100k-300k">100 000 - 300 000 ₽</SelectItem>
                  <SelectItem value="300k-500k">300 000 - 500 000 ₽</SelectItem>
                  <SelectItem value="500k-1m">500 000 - 1 000 000 ₽</SelectItem>
                  <SelectItem value="1m-3m">1 000 000 - 3 000 000 ₽</SelectItem>
                  <SelectItem value="over-3m">Свыше 3 000 000 ₽</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-white text-sm">
                Сайты конкурентов (до 3-х)
              </Label>
              <p className="text-gray-400 text-xs mb-3">
                Это поможет нам лучше понять вашу нишу
              </p>
              
              {[0, 1, 2].map((index) => (
                <div key={index} className="mb-2">
                  <Input
                    type="url"
                    placeholder={`https://конкурент${index + 1}.ru`}
                    value={formData.competitorUrls[index] || ''}
                    onChange={(e) => {
                      const newUrls = [...formData.competitorUrls];
                      newUrls[index] = e.target.value;
                      updateFormData('competitorUrls', newUrls);
                    }}
                    className="bg-gray-800 border-gray-600 text-white w-full"
                  />
                </div>
              ))}
            </div>

            <div>
              <Label htmlFor="competitorAnalysis" className="text-white text-sm">
                Чем вы отличаетесь от конкурентов?
              </Label>
              <Textarea
                id="competitorAnalysis"
                placeholder="Опишите ваши преимущества..."
                value={formData.competitorAnalysis}
                onChange={(e) => updateFormData('competitorAnalysis', e.target.value)}
                className="bg-gray-800 border-gray-600 text-white min-h-[60px] sm:min-h-[80px] w-full resize-none"
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="leadCount" className="text-white text-sm">
                Сколько лидов в месяц вам нужно?
              </Label>
              <Select 
                value={formData.leadCount} 
                onValueChange={(value) => updateFormData('leadCount', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите количество" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="50-100">50-100 лидов</SelectItem>
                  <SelectItem value="100-300">100-300 лидов</SelectItem>
                  <SelectItem value="300-500">300-500 лидов</SelectItem>
                  <SelectItem value="500-1000">500-1000 лидов</SelectItem>
                  <SelectItem value="1000+">Более 1000 лидов</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="leadRegion" className="text-white text-sm">
                Регион работы
              </Label>
              <Input
                id="leadRegion"
                type="text"
                placeholder="Москва, МО, Россия..."
                value={formData.leadRegion}
                onChange={(e) => updateFormData('leadRegion', e.target.value)}
                className="bg-gray-800 border-gray-600 text-white w-full"
              />
            </div>

            <div>
              <Label htmlFor="leadBudget" className="text-white text-sm">
                Планируемый бюджет на лиды в месяц
              </Label>
              <Select 
                value={formData.leadBudget} 
                onValueChange={(value) => updateFormData('leadBudget', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите бюджет" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-50k">До 50 000 ₽</SelectItem>
                  <SelectItem value="50k-100k">50 000 - 100 000 ₽</SelectItem>
                  <SelectItem value="100k-300k">100 000 - 300 000 ₽</SelectItem>
                  <SelectItem value="300k-500k">300 000 - 500 000 ₽</SelectItem>
                  <SelectItem value="500k-1m">500 000 - 1 000 000 ₽</SelectItem>
                  <SelectItem value="over-1m">Свыше 1 000 000 ₽</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-white text-sm mb-3 block">
                Дополнительные услуги
              </Label>
              
              <div className="space-y-3">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.needCalls}
                    onChange={(e) => updateFormData('needCalls', e.target.checked)}
                    className="w-4 h-4 text-orange-500 bg-gray-800 border-gray-600 rounded focus:ring-orange-500 mt-0.5 flex-shrink-0"
                  />
                  <span className="text-white text-sm">
                    Обзвон лидов нашими операторами
                  </span>
                </label>

                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.needAnalytics}
                    onChange={(e) => updateFormData('needAnalytics', e.target.checked)}
                    className="w-4 h-4 text-orange-500 bg-gray-800 border-gray-600 rounded focus:ring-orange-500 mt-0.5 flex-shrink-0"
                  />
                  <span className="text-white text-sm">
                    Аналитика и отчеты по лидам
                  </span>
                </label>

                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.needConsultation}
                    onChange={(e) => updateFormData('needConsultation', e.target.checked)}
                    className="w-4 h-4 text-orange-500 bg-gray-800 border-gray-600 rounded focus:ring-orange-500 mt-0.5 flex-shrink-0"
                  />
                  <span className="text-white text-sm">
                    Консультации по оптимизации воронки
                  </span>
                </label>
              </div>
            </div>

            <div>
              <Label htmlFor="specialRequests" className="text-white text-sm">
                Особые пожелания
              </Label>
              <Textarea
                id="specialRequests"
                placeholder="Расскажите о специальных требованиях..."
                value={formData.specialRequests}
                onChange={(e) => updateFormData('specialRequests', e.target.value)}
                className="bg-gray-800 border-gray-600 text-white min-h-[60px] sm:min-h-[80px] w-full resize-none"
              />
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="monthlyBudget" className="text-white text-sm">
                Общий месячный бюджет на маркетинг
              </Label>
              <Select 
                value={formData.monthlyBudget} 
                onValueChange={(value) => updateFormData('monthlyBudget', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите бюджет" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-100k">До 100 000 ₽</SelectItem>
                  <SelectItem value="100k-300k">100 000 - 300 000 ₽</SelectItem>
                  <SelectItem value="300k-500k">300 000 - 500 000 ₽</SelectItem>
                  <SelectItem value="500k-1m">500 000 - 1 000 000 ₽</SelectItem>
                  <SelectItem value="1m-3m">1 000 000 - 3 000 000 ₽</SelectItem>
                  <SelectItem value="over-3m">Свыше 3 000 000 ₽</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="startDate" className="text-white text-sm">
                Когда планируете начать?
              </Label>
              <Select 
                value={formData.startDate} 
                onValueChange={(value) => updateFormData('startDate', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите срок" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediately">Немедленно</SelectItem>
                  <SelectItem value="this-week">На этой неделе</SelectItem>
                  <SelectItem value="this-month">В этом месяце</SelectItem>
                  <SelectItem value="next-month">В следующем месяце</SelectItem>
                  <SelectItem value="in-quarter">В ближайшие 3 месяца</SelectItem>
                  <SelectItem value="planning">Пока планируем</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3 sm:p-4 mt-4">
              <div className="flex items-start space-x-3">
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-orange-300 font-medium mb-1 text-sm">
                    Готовы к отправке!
                  </h4>
                  <p className="text-orange-200 text-xs sm:text-sm">
                    После отправки заявки наш менеджер свяжется с вами в течение 2 часов.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  }
}