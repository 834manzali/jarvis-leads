import React, { useState, useEffect } from 'react';
import { LandingScreen } from './screens/LandingScreen';
import { SevenStepLeadForm } from './components/SevenStepLeadForm';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Toaster } from 'sonner@2.0.3';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function JarvisLeadsSite() {
  const [showLeadForm, setShowLeadForm] = useState(false);

  // Apply dark theme to website
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // Handle opening lead generation form
  const openLeadForm = () => {
    setShowLeadForm(true);
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  };

  // Handle closing lead generation form
  const closeLeadForm = () => {
    setShowLeadForm(false);
    document.body.style.overflow = 'unset'; // Restore scroll
  };

  // Handle form completion
  const handleFormComplete = () => {
    closeLeadForm();
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background text-foreground font-nunito">
        {/* Main Website Content */}
        <LandingScreen onStartLeadGen={openLeadForm} />

        {/* Modal Lead Generation Form */}
        <AnimatePresence>
          {showLeadForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={closeLeadForm}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative w-full max-w-4xl max-h-[90vh] bg-card rounded-lg overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={closeLeadForm}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Form Content */}
                <div className="h-full overflow-y-auto">
                  <SevenStepLeadForm 
                    onComplete={handleFormComplete}
                    onClose={closeLeadForm}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toast Notifications */}
        <Toaster />
      </div>
    </ErrorBoundary>
  );
}