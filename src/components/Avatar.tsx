import React, { useState } from 'react';
import { User } from 'lucide-react';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export default function Avatar({ src, alt, size = 'md', className = '' }: AvatarProps) {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10 md:w-12 md:h-12',
    lg: 'w-16 h-16 md:w-20 md:h-20',
    xl: 'w-20 h-20 md:w-24 md:h-24'
  };

  const handleImageError = () => {
    setImageError(true);
  };

  if (imageError || !src) {
    // Fallback to initials or user icon
    const initials = alt
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    return (
      <div 
        className={`${sizeClasses[size]} rounded-full bg-green-500 flex items-center justify-center text-white font-semibold ${className}`}
        title={alt}
      >
        {initials || <User className="h-1/2 w-1/2" />}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={handleImageError}
      className={`${sizeClasses[size]} rounded-full object-cover ${className}`}
    />
  );
} 