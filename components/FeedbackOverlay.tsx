import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { playSound } from '../utils/audio';

interface FeedbackOverlayProps {
  show: boolean;
  message: string;
  isCorrect: boolean;
  onNext: () => void;
}

const FeedbackOverlay: React.FC<FeedbackOverlayProps> = ({ show, message, isCorrect, onNext }) => {
  const [isClicked, setIsClicked] = useState(false);

  if (!show) return null;

  const handleNextClick = () => {
    if (isClicked) return;
    
    playSound('click', 0.6);
    setIsClicked(true);
    
    // Tactile delay before unmounting/transitioning
    setTimeout(() => {
      onNext();
      setIsClicked(false); // Reset in case we reuse the component logic
    }, 350);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md">
      <motion.div 
        className="text-center p-6 max-w-lg w-full"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <h3 className={`text-6xl md:text-8xl font-black heading-font mb-4 ${isCorrect ? 'text-jbl-orange' : 'text-gray-400'}`}>
          {isCorrect ? '¡BRUTAL!' : '¡OUCH!'}
        </h3>
        <p className="text-xl md:text-2xl text-white font-bold mb-8 mx-auto leading-relaxed">
          {message}
        </p>
        
        <motion.button
          onClick={handleNextClick}
          whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(255, 87, 34, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          className={`
            px-8 py-4 rounded-full font-bold text-xl uppercase tracking-wider transition-colors duration-200
            ${isClicked ? 'bg-jbl-orange text-white' : 'bg-white text-black hover:bg-jbl-orange hover:text-white'}
          `}
        >
          SIGUIENTE NIVEL &rarr;
        </motion.button>
      </motion.div>
    </div>
  );
};

export default FeedbackOverlay;