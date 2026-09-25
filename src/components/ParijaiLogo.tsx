import React, { useState } from 'react';

interface ParijaiLogoProps {
  size?: number;
  className?: string;
  showWordmark?: boolean;
  wordmarkClassName?: string;
}

export const ParijaiLogo: React.FC<ParijaiLogoProps> = ({
  size = 44,
  className = '',
  showWordmark = false,
  wordmarkClassName = ''
}) => {
  const [imageSrc, setImageSrc] = useState<string>('/parijai-logo.png');

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Pristine, untouched circular official logo */}
      <img
        src={imageSrc}
        alt="Parijai Group of Hotels Logo"
        width={size}
        height={size}
        style={{ width: `${size}px`, height: `${size}px` }}
        className="rounded-full object-cover shrink-0 select-none drop-shadow-md transition-transform duration-300 group-hover:scale-105"
        referrerPolicy="no-referrer"
        onError={() => {
          if (imageSrc === '/parijai-logo.png') {
            setImageSrc('/business-logo.jpeg');
          } else if (imageSrc === '/business-logo.jpeg') {
            setImageSrc('/business logo.jpeg');
          }
        }}
      />

      {/* Optional Wordmark Text Alongside Logo */}
      {showWordmark && (
        <div className={`flex flex-col ${wordmarkClassName}`}>
          <span className="font-serif text-lg sm:text-xl font-bold tracking-[0.14em] uppercase text-white group-hover:text-amber-300 transition-colors">
            Parijai Group of Hotels
          </span>
          <span className="text-[9px] tracking-[0.22em] uppercase font-sans font-medium text-emerald-400/90">
            Sikkim & Bengal · Heritage & Care
          </span>
        </div>
      )}
    </div>
  );
};
