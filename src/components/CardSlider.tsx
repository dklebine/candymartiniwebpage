import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useDrinkContext } from '../context/DrinkContext';

gsap.registerPlugin(ScrollTrigger);

const CardSlider: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const { selectedDrinkIndex, setSelectedDrinkIndex, drinks, loading } = useDrinkContext();

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;

    if (!section || !cards || loading) return;

    // Animate section entrance
    gsap.fromTo(section.querySelectorAll('.fade-in'),
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animate cards
    gsap.fromTo(cards.children,
      { opacity: 0, y: 80, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: cards,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [loading]);

  // Horizontal scroll functionality
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || loading || drinks.length === 0) return;

    let scrollTimeout: NodeJS.Timeout;
    let accumulatedDelta = 0;
    const scrollThreshold = 50;

    const handleWheel = (e: WheelEvent) => {
      if (e.shiftKey) {
        e.preventDefault();
        
        accumulatedDelta += Math.abs(e.deltaX || e.deltaY);
        clearTimeout(scrollTimeout);

        scrollTimeout = setTimeout(() => {
          accumulatedDelta = 0;
        }, 150);

        if (accumulatedDelta >= scrollThreshold) {
          const direction = (e.deltaX || e.deltaY) > 0 ? 1 : -1;
          const nextIndex = Math.max(0, Math.min(drinks.length - 1, selectedDrinkIndex + direction));
          
          if (nextIndex !== selectedDrinkIndex) {
            setSelectedDrinkIndex(nextIndex);
            accumulatedDelta = 0;
          }
        }
      }
    };

    slider.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      slider.removeEventListener('wheel', handleWheel);
      clearTimeout(scrollTimeout);
    };
  }, [selectedDrinkIndex, setSelectedDrinkIndex, drinks, loading]);

  // Touch/swipe support
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || loading || drinks.length === 0) return;

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

    slider.addEventListener('touchstart', handleTouchStart, { passive: true });
    slider.addEventListener('touchmove', handleTouchMove, { passive: false });
    slider.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      slider.removeEventListener('touchstart', handleTouchStart);
      slider.removeEventListener('touchmove', handleTouchMove);
      slider.removeEventListener('touchend', handleTouchEnd);
    };
  }, [selectedDrinkIndex, setSelectedDrinkIndex, drinks, loading]);

  // Auto-scroll to selected card
  useEffect(() => {
    const container = cardsRef.current;
    if (!container || loading || drinks.length === 0) return;

    const selectedCard = container.children[selectedDrinkIndex] as HTMLElement;
    if (selectedCard) {
      const containerRect = container.getBoundingClientRect();
      const cardRect = selectedCard.getBoundingClientRect();
      const scrollLeft = container.scrollLeft;
      const targetScroll = scrollLeft + (cardRect.left - containerRect.left) - (containerRect.width / 2) + (cardRect.width / 2);
      
      gsap.to(container, {
        scrollLeft: Math.max(0, targetScroll),
        duration: 0.8,
        ease: "power2.inOut"
      });
    }
  }, [selectedDrinkIndex, drinks, loading]);

  const nextSlide = () => {
    if (selectedDrinkIndex < drinks.length - 1) {
      setSelectedDrinkIndex(selectedDrinkIndex + 1);
    }
  };

  const prevSlide = () => {
    if (selectedDrinkIndex > 0) {
      setSelectedDrinkIndex(selectedDrinkIndex - 1);
    }
  };

  if (loading) {
    return (
      <section className="py-12 sm:py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-white text-xl sm:text-2xl px-4">Loading cocktails...</div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="py-12 sm:py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="fade-in text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
            Featured Cocktails
          </h2>
          <p className="fade-in text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Discover our most popular candy-inspired martinis, crafted with premium spirits 
            and the finest ingredients for an unforgettable experience
          </p>
        </div>

        <div ref={sliderRef} className="relative">
          {/* Cards Container */}
          <div 
            ref={cardsRef} 
            className="flex space-x-4 sm:space-x-6 lg:space-x-8 overflow-x-auto pb-4 px-4 scrollbar-hide"
            style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {drinks.map((drink, index) => (
              <div
                key={drink.id}
                onClick={() => setSelectedDrinkIndex(index)}
                className={`flex-shrink-0 cursor-pointer bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                  index === selectedDrinkIndex 
                    ? 'border-pink-400/60 bg-white/15 shadow-lg shadow-pink-500/20 scale-105' 
                    : 'border-white/20 hover:border-pink-300/50'
                }`}
                style={{ width: '280px', minWidth: '280px' }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={drink.image}
                    alt={drink.name}
                    className="w-full h-48 sm:h-56 lg:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 text-xs text-white/80 bg-black/30 px-2 py-1 rounded-lg backdrop-blur-sm">
                    {drink.category}
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  <h3 className={`text-xl sm:text-2xl font-bold mb-2 transition-colors duration-300 ${
                    index === selectedDrinkIndex ? 'text-pink-300' : 'text-white hover:text-pink-300'
                  }`}>
                    {drink.name}
                  </h3>
                  
                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`sm:w-[18px] sm:h-[18px] ${i < drink.rating ? "text-yellow-400 fill-current" : "text-gray-400"}`}
                      />
                    ))}
                    <span className="text-gray-300 ml-2 text-sm">({drink.rating}/5)</span>
                  </div>

                  <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base line-clamp-3">
                    {drink.description}
                  </p>

                  <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows - Hidden on mobile */}
          <button
            onClick={prevSlide}
            className={`hidden sm:block absolute left-0 top-1/2 transform -translate-y-1/2 z-10 text-white/80 hover:text-white transition-all duration-300 ${
              selectedDrinkIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110'
            }`}
            disabled={selectedDrinkIndex === 0}
          >
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm hover:bg-white/10">
              <ChevronLeft size={20} className="lg:w-6 lg:h-6" />
            </div>
          </button>

          <button
            onClick={nextSlide}
            className={`hidden sm:block absolute right-0 top-1/2 transform -translate-y-1/2 z-10 text-white/80 hover:text-white transition-all duration-300 ${
              selectedDrinkIndex === drinks.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110'
            }`}
            disabled={selectedDrinkIndex === drinks.length - 1}
          >
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm hover:bg-white/10">
              <ChevronRight size={20} className="lg:w-6 lg:h-6" />
            </div>
          </button>
        </div>

        <div className="text-center mt-12 sm:mt-16">
          <button className="fade-in bg-transparent border-2 border-pink-400 text-pink-400 hover:bg-pink-400 hover:text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
            View Full Menu
          </button>
        </div>
      </div>
    </section>
  );
};

export default CardSlider;