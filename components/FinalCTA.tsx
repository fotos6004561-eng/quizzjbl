
import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { CTA_CONTENT } from '../constants';
import { playSound } from '../utils/audio';

const FinalCTA: React.FC = () => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const [animationFinished, setAnimationFinished] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  useEffect(() => {
    // The previous screen handled the "checking", so here we just count up the discount to reveal it
    const controls = animate(count, 80, { 
      duration: 2.0, // Slightly faster reveal since we already waited
      ease: "circOut",
      onComplete: () => setAnimationFinished(true)
    });
    return controls.stop;
  }, []);

  const handleButtonClick = () => {
    playSound('click', 0.7);
    setIsButtonClicked(true);
    // Logic to redirect would go here after delay
    setTimeout(() => {
      window.location.href = "https://www.flamengo.com.br/";
    }, 350);
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-start text-center p-6 relative z-10 w-full max-w-4xl"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      
      <div className="absolute inset-0 bg-gradient-to-t from-jbl-orange/20 to-transparent pointer-events-none h-screen -z-10 transform -translate-y-20"></div>

      {/* Header - Now focuses on Success immediately */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-sm md:text-base uppercase tracking-[0.2em] font-bold mb-2 text-jbl-orange animate-pulse">
           ¡ENHORABUENA! HAS SIDO SELECCIONADO.
        </p>

        {/* Dynamic Counter - The "Reveal" */}
        <div className="flex items-center justify-center leading-none">
          <motion.span className="text-[8rem] md:text-[10rem] font-black heading-font text-jbl-orange drop-shadow-[0_0_25px_rgba(255,87,34,0.6)]">
            {rounded}
          </motion.span>
          <div className="flex flex-col items-start justify-center ml-2">
             <span className="text-4xl md:text-6xl font-bold heading-font text-white">%</span>
             <span className="text-xl md:text-2xl font-bold heading-font text-white uppercase">DTO.</span>
          </div>
        </div>

        <p className="text-gray-400 text-sm mt-2 max-w-md mx-auto h-6">
          {animationFinished && (
            <motion.span 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="text-white font-semibold"
            >
              Esta oferta expira en breve. <span className="text-red-500">Garantiza la tuya antes que se agote.</span>
            </motion.span>
          )}
        </p>
      </motion.div>
      
      <motion.p 
        className="text-xl md:text-2xl text-gray-100 mb-12 max-w-2xl font-light tracking-wide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {CTA_CONTENT.subheadline}
      </motion.p>

      {/* Tactile Button */}
      <motion.div 
        className="relative group cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleButtonClick}
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-fast"></div>
        <button className={`
          relative px-12 py-6 rounded-lg leading-none flex items-center divide-x divide-gray-600 w-full md:w-auto justify-center transition-colors duration-200
          ${isButtonClicked ? 'bg-jbl-orange' : 'bg-black'}
        `}>
          <span className="flex items-center space-x-5">
            <span className={`pr-6 text-2xl md:text-3xl font-bold heading-font uppercase tracking-wider transition-colors ${isButtonClicked ? 'text-black' : 'text-gray-100 group-hover:text-jbl-orange'}`}>
              {CTA_CONTENT.buttonText}
            </span>
          </span>
        </button>
      </motion.div>

      <motion.p 
        className="mt-8 text-xs text-gray-500 tracking-widest uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {CTA_CONTENT.disclaimer}
      </motion.p>

      {/* Decorative Product Placeholder - now position relative to bottom of container or screen */}
      <div className="fixed bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black via-black/80 to-transparent -z-20 pointer-events-none"></div>
    </motion.div>
  );
};

export default FinalCTA;
