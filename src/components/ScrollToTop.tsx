import React, { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling past the first section (viewport height)
      setIsVisible(window.scrollY > window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 z-50 bg-white/10 hover:bg-white/20 text-white p-2 sm:p-3 rounded-full backdrop-blur-sm border border-white/20 transition-all duration-300 transform hover:scale-105 group"
      aria-label="Scroll to top"
    >
      <div className="animate-bounce-up">
        <ChevronUp 
          size={24} 
          className="sm:w-6 sm:h-6 transform rotate-0 group-hover:-translate-y-1 transition-transform duration-300" 
        />
      </div>
    </button>
  );
};

export default ScrollToTop; 