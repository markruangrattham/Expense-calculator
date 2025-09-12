import React from 'react';
import logoImage from '../assets/leafybucks-logo.png';

const Logo = ({ size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
    xlarge: 'w-20 h-20'
  };

  const textSizes = {
    small: 'text-sm',
    medium: 'text-lg',
    large: 'text-xl',
    xlarge: 'text-2xl'
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Logo Image */}
      <div className={`${sizeClasses[size]} flex items-center justify-center`}>
        <img 
          src={logoImage} 
          alt="LeafyBucks Logo" 
          className="w-full h-full object-contain"
        />
      </div>
      
      {/* Logo Text */}
      <div className={`font-serif text-[#8a9c78] font-bold ${textSizes[size]} mt-1`}>
        LeafyBucks
      </div>
    </div>
  );
};

export default Logo; 