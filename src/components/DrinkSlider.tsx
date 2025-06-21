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
    // Disabled for now
  };

  const prevSlide = () => {
    // Disabled for now
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
        {drinks.slice(0, 1).map((drink, index) => (
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
            </div>
            
            <div className="absolute inset-0 z-10 p-8 sm:p-12 lg:p-16 flex items-end justify-end">
              <div className="absolute top-8 left-8">
                <img src="/logo.png" alt="Candy Martini Bar" className="w-48" />
              </div>

              {/* Right-aligned text */}
              <div className="w-2/5 text-right text-white">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
                  {drink.name}
                </h2>
                <div className="mt-6 md:mt-8 space-y-4 md:space-y-6 text-base md:text-lg lg:text-xl font-light uppercase tracking-widest">
                  <p style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.8)' }}>{drink.leftText.content}</p>
                  <p style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.8)' }} className="mt-4">{drink.rightText.title}</p>
                  <p style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.8)' }}>{drink.rightText.content}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <>
        <button
          onClick={prevSlide}
          disabled
          className="absolute top-1/2 left-4 -translate-y-1/2 z-20 p-2 sm:p-3 bg-white/20 hover:bg-white/40 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={24} className="text-white" />
        </button>
        <button
          onClick={nextSlide}
          disabled
          className="absolute top-1/2 right-4 -translate-y-1/2 z-20 p-2 sm:p-3 bg-white/20 hover:bg-white/40 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight size={24} className="text-white" />
        </button>
      </>
    </section>
  );
};

export default DrinkSlider;