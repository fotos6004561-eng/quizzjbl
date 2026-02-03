import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QuizStep, QuizOption } from '../types';
import { playSound } from '../utils/audio';

interface QuizCardProps {
  data: QuizStep;
  onOptionSelect: (option: QuizOption) => void;
  isActive: boolean;
}

const QuizCard: React.FC<QuizCardProps> = ({ data, onOptionSelect, isActive }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const isIntro = data.type === 'intro';

  const handleOptionClick = (option: QuizOption, index: number) => {
    // Prevent double clicks
    if (selectedIndex !== null) return;

    // 1. Play Sound (Sound Design)
    playSound('click', 0.6);

    // 2. Visual Feedback immediately
    setSelectedIndex(index);

    // 3. Tactile Delay (350ms) before logic execution
    setTimeout(() => {
      onOptionSelect(option);
      // Reset selection state happens when component unmounts/remounts via parent key change
    }, 350);
  };

  const containerVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  return (
    <motion.div 
      className={`w-full ${isIntro ? 'max-w-2xl' : 'max-w-md'} mx-auto p-6 relative z-10`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      
      {!isIntro && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-4 text-jbl-orange font-bold tracking-widest text-sm uppercase text-center bg-black/50 backdrop-blur-sm rounded-full py-1 px-3 w-fit mx-auto border border-jbl-orange/30"
        >
          {data.feature_name}
        </motion.div>
      )}

      <motion.h2 
        className={`${isIntro ? 'text-6xl md:text-8xl mb-12 tracking-tighter' : 'text-3xl md:text-5xl mb-8'} font-bold text-center text-white heading-font leading-none drop-shadow-lg`}
        layout 
      >
        {data.question}
      </motion.h2>

      <div className={`space-y-4 ${isIntro ? 'flex justify-center' : ''} ${selectedIndex !== null ? 'pointer-events-none' : ''}`}>
        {data.options.map((option, idx) => {
          const isSelected = selectedIndex === idx;
          
          return (
            <motion.button
              key={idx}
              onClick={() => handleOptionClick(option, idx)}
              whileHover={{ scale: 1.02, filter: "brightness(1.1)" }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
              className={`
                group relative overflow-hidden transition-all duration-200
                ${isIntro 
                  ? 'bg-jbl-orange text-black font-black text-2xl px-10 py-5 rounded-full hover:shadow-[0_0_40px_rgba(255,87,34,0.6)]' 
                  : `w-full text-left p-6 rounded-xl border ${isSelected ? 'bg-jbl-orange border-jbl-orange text-black scale-[0.98]' : 'bg-white/5 border-white/10 hover:border-jbl-orange text-gray-100'}`
                }
              `}
            >
              {/* Highlight effect for non-intro buttons */}
              {!isIntro && !isSelected && <div className="absolute inset-0 w-1 bg-jbl-orange transition-all duration-300 group-hover:w-full opacity-10"></div>}
              
              <span className={`relative z-10 ${isIntro ? 'tracking-wider' : 'text-lg md:text-xl font-semibold'} ${isSelected && !isIntro ? 'text-black' : ''}`}>
                {option.text}
              </span>
            </motion.button>
          );
        })}
      </div>

      <div className="hidden">
        DEBUG VISUAL BRIEF: {data.visual_brief_es}
      </div>
    </motion.div>
  );
};

export default QuizCard;