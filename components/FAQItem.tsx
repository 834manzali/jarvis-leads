import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItemProps {
  question: string;
  answer: string;
}

export function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="bg-white/5 backdrop-blur-md border border-purple-500/20 rounded-3xl overflow-hidden relative"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-500/15 via-transparent to-pink-500/15 rounded-3xl"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      />
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-white/5 transition-all duration-300 relative z-10"
      >
        <span className="text-lg lg:text-xl font-bold text-white pr-4 heading-font">{question}</span>
        <span className="text-purple-300 transform transition-transform duration-200 flex-shrink-0 text-xl">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden relative z-10"
          >
            <div className="px-8 pb-6 text-gray-300 text-base lg:text-lg leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}