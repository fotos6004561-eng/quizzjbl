
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { playSound, getAudio } from '../utils/audio';

interface VerificationScreenProps {
  onComplete: () => void;
}

const VerificationScreen: React.FC<VerificationScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Mensagens com tom de marca premium/exclusividade, não hacking
  const messages = [
    { text: "PERSONALIZANDO TU EXPERIENCIA...", at: 0 },
    { text: "ANALIZANDO TUS PREFERENCIAS DE AUDIO...", at: 20 },
    { text: "RESERVANDO UNIDAD EN ALMACÉN...", at: 50 },
    { text: "APLICANDO BENEFICIOS EXCLUSIVOS...", at: 75 },
    { text: "¡TODO LISTO! TU BOOMBOX TE ESPERA.", at: 100 }
  ];

  useEffect(() => {
    // 1. Setup Audio
    const sfx = getAudio('processing');
    const totalDuration = 5200; // 5.2 seconds
    
    if (sfx) {
      sfx.volume = 0.3; // Lower volume for a more subtle, premium feel
      sfx.loop = true; 
      sfx.play().catch(() => console.log("Sound blocked"));
      audioRef.current = sfx;
    }

    // 2. Setup Animation
    const startTime = Date.now();
    const intervalTime = 16; 

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / totalDuration) * 100, 100);
      
      setProgress(newProgress);

      const message = [...messages].reverse().find(m => newProgress >= m.at);
      if (message) {
        setCurrentMessage(message.text);
      }

      if (elapsed >= totalDuration) {
        clearInterval(timer);
        
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }

        playSound('success', 0.6);
        setTimeout(onComplete, 800);
      }
    }, intervalTime);

    return () => {
      clearInterval(timer);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto p-8 relative z-20 min-h-[50vh]">
      
      {/* Premium Logo / Icon Centerpiece */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="mb-12 relative"
      >
        <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-jbl-orange to-red-600 rounded-2xl shadow-[0_0_50px_rgba(255,87,34,0.4)] flex items-center justify-center relative z-10">
           <svg className="w-12 h-12 md:w-16 md:h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
             <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z"/>
           </svg>
        </div>
        {/* Decorative pulse ring */}
        <div className="absolute inset-0 bg-jbl-orange rounded-2xl animate-ping opacity-20"></div>
      </motion.div>

      {/* Modern Progress Bar */}
      <div className="w-full max-w-md relative mb-6">
        <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-2">
           <span className="text-xs text-gray-500 font-bold tracking-widest uppercase">Procesando</span>
           <span className="text-xs text-jbl-orange font-bold tracking-widest">{Math.round(progress)}%</span>
        </div>
      </div>

      {/* Elegant Text */}
      <div className="h-16 flex items-center justify-center">
        <motion.h3 
          key={currentMessage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-4xl font-bold heading-font text-white text-center tracking-wide uppercase drop-shadow-md"
        >
          {currentMessage}
        </motion.h3>
      </div>

      <p className="mt-8 text-sm text-gray-500 font-light tracking-wide animate-pulse">
        Por favor, no cierres esta ventana.
      </p>

    </div>
  );
};

export default VerificationScreen;
