import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useDrinkContext } from '../context/DrinkContext';

gsap.registerPlugin(ScrollTrigger);

const CocktailShowcase: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftVisualizationRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const { selectedDrinkIndex, setSelectedDrinkIndex, drinks, loading } = useDrinkContext();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const container = sectionRef.current;
    if (!container || loading || drinks.length === 0) return;

    let scrollTimeout: NodeJS.Timeout;
    let accumulatedDelta = 0;
    const scrollThreshold = 50;

    const handleWheel = (e: WheelEvent) => {
      if (e.shiftKey) {
        e.preventDefault();
        
        if (isAnimating) return;

        accumulatedDelta += Math.abs(e.deltaX || e.deltaY);
        clearTimeout(scrollTimeout);

        scrollTimeout = setTimeout(() => {
          accumulatedDelta = 0;
        }, 150);

        if (accumulatedDelta >= scrollThreshold) {
          const direction = (e.deltaX || e.deltaY) > 0 ? 1 : -1;
          const nextSlide = Math.max(0, Math.min(drinks.length - 1, selectedDrinkIndex + direction));
          
          if (nextSlide !== selectedDrinkIndex) {
            setSelectedDrinkIndex(nextSlide);
            accumulatedDelta = 0;
          }
        }
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      clearTimeout(scrollTimeout);
    };
  }, [selectedDrinkIndex, isAnimating, setSelectedDrinkIndex, drinks, loading]);

  useEffect(() => {
    const leftViz = leftVisualizationRef.current;
    const cardsContainer = cardsContainerRef.current;
    
    if (!leftViz || !cardsContainer || loading || drinks.length === 0) return;

    setIsAnimating(true);

    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false)
    });

    // Update left visualization with smooth transition
    tl.to(leftViz.querySelector('.cocktail-bg'), {
      opacity: 0,
      scale: 1.05,
      duration: 0.4,
      ease: "power2.inOut"
    })
    .set(leftViz.querySelector('.cocktail-bg'), {
      backgroundImage: `url(${drinks[selectedDrinkIndex].image})`
    })
    .to(leftViz.querySelector('.cocktail-bg'), {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "power2.inOut"
    });

    // Scroll to selected card in horizontal container
    const selectedCard = cardsContainer.children[selectedDrinkIndex] as HTMLElement;
    if (selectedCard) {
      const containerRect = cardsContainer.getBoundingClientRect();
      const cardRect = selectedCard.getBoundingClientRect();
      const scrollLeft = cardsContainer.scrollLeft;
      const targetScroll = scrollLeft + (cardRect.left - containerRect.left) - (containerRect.width / 2) + (cardRect.width / 2);
      
      tl.to(cardsContainer, {
        scrollLeft: Math.max(0, targetScroll),
        duration: 0.8,
        ease: "power2.inOut"
      }, 0);
    }

    // Update card selection states
    Array.from(cardsContainer.children).forEach((card, index) => {
      if (index === selectedDrinkIndex) {
        tl.to(card, {
          scale: 1.05,
          borderColor: 'rgba(236, 72, 153, 0.8)',
          boxShadow: '0 8px 32px rgba(236, 72, 153, 0.4)',
          duration: 0.5,
          ease: "power2.out"
        }, 0);
      } else {
        tl.to(card, {
          scale: 1,
          borderColor: 'rgba(255, 255, 255, 0.2)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
          duration: 0.5,
          ease: "power2.out"
        }, 0);
      }
    });

  }, [selectedDrinkIndex, drinks, loading]);

  // Touch/swipe support for mobile
  useEffect(() => {
    const container = cardsContainerRef.current;
    if (!container || loading || drinks.length === 0) return;

    let startX = 0;
    let isScrolling = false;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      isScrolling = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isScrolling) return;

      const currentX = e.touches[0].clientX;
      const diffX = Math.abs(currentX - startX);

      if (diffX > 10) {
        isScrolling = true;
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isScrolling) return;

      const endX = e.changedTouches[0].clientX;
      const diffX = startX - endX;

      if (Math.abs(diffX) > 50) {
        if (diffX > 0 && selectedDrinkIndex < drinks.length - 1) {
          setSelectedDrinkIndex(selectedDrinkIndex + 1);
        } else if (diffX < 0 && selectedDrinkIndex > 0) {
          setSelectedDrinkIndex(selectedDrinkIndex - 1);
        }
      }
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [selectedDrinkIndex, setSelectedDrinkIndex, drinks, loading]);

  const handleCocktailSelect = (index: number) => {
    if (isAnimating || index === selectedDrinkIndex) return;
    setSelectedDrinkIndex(index);
  };

  const nextSlide = () => {
    if (!isAnimating && selectedDrinkIndex < drinks.length - 1) {
      setSelectedDrinkIndex(selectedDrinkIndex + 1);
    }
  };

  const prevSlide = () => {
    if (!isAnimating && selectedDrinkIndex > 0) {
      setSelectedDrinkIndex(selectedDrinkIndex - 1);
    }
  };

  if (loading) {
    return (
      <section className="h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 flex items-center justify-center">
        <div className="text-white text-xl sm:text-2xl px-4">Loading cocktails...</div>
      </section>
    );
  }

  if (drinks.length === 0) {
    return (
      <section className="h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 flex items-center justify-center">
        <div className="text-white text-xl sm:text-2xl px-4">No cocktails available</div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 overflow-hidden">
      {/* Mobile Layout */}
      <div className="lg:hidden py-8 px-4">
        <div className="max-w-sm mx-auto">
          {/* Current drink image */}
          <div className="relative mb-6">
            <div 
              className="w-full h-96 bg-cover bg-center rounded-2xl"
              style={{ 
                backgroundImage: `url(${drinks[selectedDrinkIndex].image})`
              }}
            >
              <div className="absolute inset-0 bg-black/20 rounded-2xl"></div>
            </div>
          </div>

          {/* Horizontal Cards Container */}
          <div className="relative">
            <div 
              ref={cardsContainerRef}
              className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide"
              style={{ 
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {drinks.map((drink, index) => (
                <div
                  key={drink.id}
                  onClick={() => handleCocktailSelect(index)}
                  className="flex-shrink-0 cursor-pointer bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden border border-white/20 transition-all duration-500"
                  style={{ width: '120px', height: '160px' }}
                >
                  <div className="relative h-3/4 overflow-hidden">
                    <img
                      src={drink.image}
                      alt={drink.name}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                  </div>
                  
                  <div className="h-1/4 p-2 flex flex-col justify-center">
                    <h3 className="text-xs font-bold text-white line-clamp-2 leading-tight">
                      {drink.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex h-screen">
        {/* Left Visualization - 1/2 width */}
        <div ref={leftVisualizationRef} className="w-1/2 h-full relative">
          <div 
            className="cocktail-bg absolute inset-0 bg-cover bg-center transition-all duration-500"
            style={{ 
              backgroundImage: `url(${drinks[selectedDrinkIndex].image})`
            }}
          ></div>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Right Section - 1/2 width */}
        <div className="w-1/2 h-full relative bg-black/10 backdrop-blur-sm flex flex-col justify-center">
          <div className="relative">
            {/* Cards Container */}
            <div 
              ref={cardsContainerRef}
              className="flex space-x-6 overflow-x-auto px-8 py-4 scrollbar-hide"
              style={{ 
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {drinks.map((drink, index) => (
                <div
                  key={drink.id}
                  onClick={() => handleCocktailSelect(index)}
                  className="flex-shrink-0 cursor-pointer bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 transition-all duration-500 hover:scale-105"
                  style={{ 
                    width: '280px',
                    aspectRatio: '9/16'
                  }}
                >
                  <div className="relative h-3/4 overflow-hidden">
                    <img
                      src={drink.image}
                      alt={drink.name}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  
                  <div className="h-1/4 p-4 flex flex-col justify-center">
                    <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">
                      {drink.name}
                    </h3>
                    <p className="text-pink-300 text-sm">
                      {drink.category}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className={`absolute left-2 top-1/2 transform -translate-y-1/2 z-10 text-white/80 hover:text-white transition-all duration-300 ${
                selectedDrinkIndex === 0 || isAnimating ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110'
              }`}
              disabled={selectedDrinkIndex === 0 || isAnimating}
            >
              <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm hover:bg-white/10">
                <ChevronLeft size={24} />
              </div>
            </button>

            <button
              onClick={nextSlide}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 z-10 text-white/80 hover:text-white transition-all duration-300 ${
                selectedDrinkIndex === drinks.length - 1 || isAnimating ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110'
              }`}
              disabled={selectedDrinkIndex === drinks.length - 1 || isAnimating}
            >
              <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm hover:bg-white/10">
                <ChevronRight size={24} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CocktailShowcase;