import React from 'react';

interface AppLogoProps {
  src?: string;
  className?: string;
}

const AppLogo: React.FC<AppLogoProps> = ({ src, className = "" }) => {
  return (
    <div 
      className={`fixed top-3 right-3 z-[100] ${className}`}
      id="app-logo-container"
    >
      <div className="w-12 h-12 rounded-xl p-1 glass border border-white/20 shadow-lg flex items-center justify-center overflow-hidden">
        {src ? (
          <img 
            src={src} 
            alt="App Logo" 
            className="w-full h-full object-contain rounded-lg"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full bg-maroon-800/80 rounded-lg flex items-center justify-center border border-maroon-700/50">
            <span className="text-[10px] font-black text-white/40 tracking-tighter">LOGO</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppLogo;
