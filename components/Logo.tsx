import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="absolute top-6 md:top-8 left-0 w-full flex justify-center items-center z-40 pointer-events-none select-none">
      {/* Ajuste o w-32 se quiser maior ou menor */}
      <img 
        src="https://logosmarcas.net/wp-content/uploads/2020/12/JBL-Logo.png" 
        alt="JBL Logo" 
        className="w-32 md:w-40 h-auto object-contain drop-shadow-xl"
      />
    </div>
  );
};

export default Logo;