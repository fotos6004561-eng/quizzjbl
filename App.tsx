import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { QUIZ_DATA } from './constants';
import { QuizOption } from './types';
import Background from './components/Background';
import QuizCard from './components/QuizCard';
import FeedbackOverlay from './components/FeedbackOverlay';
import FinalCTA from './components/FinalCTA';
import VerificationScreen from './components/VerificationScreen';
import Logo from './components/Logo';
import { preloadSounds } from './utils/audio';

const App: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastFeedback, setLastFeedback] = useState({ message: '', isCorrect: false });

  // Preload sounds on mount
  useEffect(() => {
    preloadSounds();
  }, []);

  const currentStepData = QUIZ_DATA[currentStepIndex];

  const handleOptionSelect = (option: QuizOption) => {
    if (currentStepData.type === 'intro') {
      handleNextStep();
      return;
    }

    let message = currentStepData.feedback_hype;
    if (!option.isCorrect) {
      message = "¡Casi! Pero aquí queremos calidad suprema.";
    }

    setLastFeedback({
      message: option.isCorrect ? message : "¡Venga ya! Tú sabes que necesitas más power.",
      isCorrect: option.isCorrect
    });
    setShowFeedback(true);
  };

  const handleNextStep = () => {
    setShowFeedback(false);
    if (currentStepIndex < QUIZ_DATA.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      setIsVerifying(true);
    }
  };

  const handleVerificationComplete = () => {
    setIsVerifying(false);
    setIsCompleted(true);
  };

  const bgStepIndex = isCompleted ? 7 : (isVerifying ? 6 : currentStepIndex);
  const progressPercentage = (currentStepIndex / (QUIZ_DATA.length - 1)) * 100;

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col">
      <Background stepIndex={bgStepIndex} />
      <Logo />

      {!isCompleted && !isVerifying && currentStepIndex > 0 && (
        <div className="absolute top-28 md:top-36 left-0 w-full h-1.5 bg-gray-800/50 backdrop-blur-sm z-30">
          <motion.div 
            className="h-full bg-jbl-orange shadow-[0_0_15px_#ff5722] relative"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-3 bg-white blur-[1px] rounded-full opacity-80"></div>
          </motion.div>
        </div>
      )}

      <main className={`flex-grow flex justify-center p-4 w-full transition-all duration-500 ${isCompleted ? 'items-start pt-24 md:pt-32' : 'items-center pt-36 md:pt-44'}`}>
        <AnimatePresence mode="wait">
          {!isCompleted && !isVerifying && (
            <QuizCard 
              key={`step-${currentStepIndex}`} 
              data={currentStepData} 
              onOptionSelect={handleOptionSelect}
              isActive={!showFeedback}
            />
          )}
          
          {isVerifying && (
            <motion.div
              key="verification"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <VerificationScreen onComplete={handleVerificationComplete} />
            </motion.div>
          )}

          {isCompleted && (
            <FinalCTA key="final-cta" />
          )}
        </AnimatePresence>
      </main>

      <footer className="absolute bottom-4 w-full text-center z-20 pointer-events-none">
        <p className="text-white/20 text-xs font-bold tracking-[0.3em]">JBL BOOMBOX 4 ORANGE EDITION</p>
      </footer>

      <AnimatePresence>
        {showFeedback && (
          <FeedbackOverlay 
            key="feedback-overlay"
            show={showFeedback}
            message={lastFeedback.message}
            isCorrect={lastFeedback.isCorrect}
            onNext={handleNextStep}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;