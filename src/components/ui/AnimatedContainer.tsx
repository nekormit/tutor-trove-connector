
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedContainerProps {
  children: React.ReactNode;
  animation?: 'fade-in' | 'slide-up' | 'slide-in-right' | 'scale-in';
  delay?: number;
  className?: string;
}

const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
  children,
  animation = 'fade-in',
  delay = 0,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const getAnimationClass = () => {
    if (!isVisible) return 'opacity-0';

    switch (animation) {
      case 'fade-in':
        return 'animate-fade-in';
      case 'slide-up':
        return 'animate-fade-in';
      case 'slide-in-right':
        return 'animate-slide-in-right';
      case 'scale-in':
        return 'animate-scale-in';
      default:
        return 'animate-fade-in';
    }
  };

  return (
    <div
      className={cn(
        'transition-all duration-500',
        getAnimationClass(),
        className
      )}
      style={{
        transform: 
          !isVisible && animation === 'slide-up' 
            ? 'translateY(20px)' 
            : !isVisible && animation === 'slide-in-right'
            ? 'translateX(20px)'
            : !isVisible && animation === 'scale-in'
            ? 'scale(0.95)'
            : 'none',
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedContainer;
