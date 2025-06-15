import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useDrinkContext } from '../context/DrinkContext';

gsap.registerPlugin(ScrollTrigger);

const DrinkSlider: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const { selectedDrinkIndex, setSelectedDrinkIndex, drinks, loading } = useDrinkContext();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || loading || drinks.length === 0) return;

    let scrollTimeout: NodeJS.Timeout;
    let accumulatedDelta = 0;
    const scrollThreshold = 50;

    const handleWheel = (e: WheelEvent) => {
      if (e.shiftKey) {
        e.preventDefault();
        
        if (isAnimating) return;

        accumulatedDelta += Math.abs(e.deltaY);
        clearTimeout(scrollTimeout);

        scrollTimeout = setTimeout(() => {
          accumulatedDelta = 0;
        }, 150);

        if (accumulatedDelta >= scrollThreshold) {
          const direction = e.deltaY > 0 ? 1 : -1;
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
    const slides = slidesRef.current;
    if (!slides || loading || drinks.length === 0) return;

    setIsAnimating(true);

    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false)
    });

    // Animate to current slide
    tl.to(slides, {
      x: -selectedDrinkIndex * window.innerWidth,
      duration: 1.2,
      ease: "power2.inOut"
    }, 0);

    // Animate slide content
    const currentSlideElement = slides.children[selectedDrinkIndex] as HTMLElement;
    if (currentSlideElement) {
      tl.fromTo(currentSlideElement.querySelectorAll('.slide-content > div'), 
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out"
        }, 0.3
      );
    }

    // Handle video playback
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === selectedDrinkIndex) {
          video.play().catch(console.error);
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });

  }, [selectedDrinkIndex, drinks, loading]);

  // Touch/swipe support for mobile
  useEffect(() => {
    const container = containerRef.current;
    if (!container || loading || drinks.length === 0) return;

    let startX = 0;
    let startY = 0;
    let isScrolling = false;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      isScrolling = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isScrolling) return;

      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const diffX = Math.abs(currentX - startX);
      const diffY = Math.abs(currentY - startY);

      if (diffX > diffY && diffX > 10) {
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

  // Helper function to map drink.color to a neon class
  const getNeonClass = (color: string) => {
    if (color.includes('pink')) return 'neon-pink';
    if (color.includes('blue')) return 'neon-blue';
    if (color.includes('green')) return 'neon-green';
    if (color.includes('yellow')) return 'neon-yellow';
    if (color.includes('purple')) return 'neon-purple';
    if (color.includes('orange')) return 'neon-orange';
    if (color.includes('red')) return 'neon-red';
    return 'neon-pink'; // fallback
  };

  if (loading) {
    return (
      <section className="relative h-screen overflow-hidden bg-gradient-to-br from-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-white text-xl sm:text-2xl px-4">Loading cocktails...</div>
      </section>
    );
  }

  if (drinks.length === 0) {
    return (
      <section className="relative h-screen overflow-hidden bg-gradient-to-br from-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-white text-xl sm:text-2xl px-4">No cocktails available</div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden">
      <div ref={slidesRef} className="flex h-full w-max">
        {drinks.map((drink, index) => (
          <div
            key={drink.id}
            className="w-screen h-full flex items-center justify-center relative"
          >
            {/* Video Background */}
            <div className="absolute inset-0 w-full h-full">
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                className="w-full h-full object-cover"
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
              >
                <source src={drink.videoUrl} type="video/mp4" />
              </video>
              {/* Subtle overlay for better text readability */}
              <div className="absolute inset-0 bg-black opacity-20 pointer-events-none"></div>
            </div>
            
            {/* Mobile Layout */}
            <div className="slide-content lg:hidden px-4 sm:px-6 max-w-lg mx-auto h-full flex flex-col justify-center items-center relative z-10 text-center">
              <div className="space-y-6">
                <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${getNeonClass(drink.color)}`}>
                  {drink.name}
                </h2>
                <div className="space-y-4 text-white">
                  <div>
                    <h3 className={`text-lg sm:text-xl font-bold mb-2 ${getNeonClass(drink.color)}`}>
                      {drink.leftText.title}
                    </h3>
                    <p className="text-sm sm:text-base leading-relaxed text-white/80">
                      {drink.leftText.content}
                    </p>
                  </div>
                  <div>
                    <h3 className={`text-lg sm:text-xl font-bold mb-2 ${getNeonClass(drink.color)}`}>
                      {drink.rightText.title}
                    </h3>
                    <p className="text-sm sm:text-base leading-relaxed text-white/80">
                      {drink.rightText.content}
                    </p>
                  </div>
                </div>
                <div className="text-center text-white/80 text-lg font-semibold">
                  {index + 1} of {drinks.length}
                </div>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="slide-content hidden lg:grid grid-cols-3 gap-8 px-8 lg:px-16 max-w-7xl mx-auto h-full items-center relative z-10">
              {/* Left Text Column */}
              <div className="text-white space-y-6">
                <h3 className={`text-2xl lg:text-3xl font-bold ${getNeonClass(drink.color)}`}>
                  {drink.leftText.title}
                </h3>
                <p className="text-lg lg:text-xl leading-relaxed text-white/80">
                  {drink.leftText.content}
                </p>
              </div>

              {/* Center Column - Drink Name Only */}
              <div className="flex flex-col items-center justify-center space-y-8">
                <h2 className={`text-4xl lg:text-6xl font-bold text-center mb-4 ${getNeonClass(drink.color)}`}>
                  {drink.name}
                </h2>
                <div className="text-center text-white/80 text-xl font-semibold">
                  {index + 1} of {drinks.length}
                </div>
              </div>

              {/* Right Text Column */}
              <div className="text-white space-y-6">
                <h3 className={`text-2xl lg:text-3xl font-bold ${getNeonClass(drink.color)}`}>
                  {drink.rightText.title}
                </h3>
                <p className="text-lg lg:text-xl leading-relaxed text-white/80">
                  {drink.rightText.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className={`absolute left-2 sm:left-4 lg:left-8 top-1/2 transform -translate-y-1/2 z-20 text-white/80 hover:text-white transition-all duration-300 ${
          selectedDrinkIndex === 0 || isAnimating ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110'
        }`}
        disabled={selectedDrinkIndex === 0 || isAnimating}
      >
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm hover:bg-white/10">
          <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
        </div>
      </button>

      <button
        onClick={nextSlide}
        className={`absolute right-2 sm:right-4 lg:right-8 top-1/2 transform -translate-y-1/2 z-20 text-white/80 hover:text-white transition-all duration-300 ${
          selectedDrinkIndex === drinks.length - 1 || isAnimating ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110'
        }`}
        disabled={selectedDrinkIndex === drinks.length - 1 || isAnimating}
      >
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm hover:bg-white/10">
          <ChevronRight size={20} className="sm:w-6 sm:h-6" />
        </div>
      </button>
    </section>
  );
};

export default DrinkSlider;