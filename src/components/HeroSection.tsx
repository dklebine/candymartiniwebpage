import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const textElement = textRef.current;
    const ctaElement = ctaRef.current;

    if (!section || !textElement || !ctaElement) return;

    // Set initial state
    gsap.set([textElement, ctaElement], { 
      opacity: 0, 
      y: 100,
      scale: 0.8 
    });

    // Animation timeline (on page load)
    const tl = gsap.timeline();
    tl.to([textElement, ctaElement], {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: "power2.out",
      stagger: 0.2
    });
    // Add 3 bounces to the CTA button after it appears, matching bounce-up effect
    tl.to(ctaElement, {
      y: '-25%',
      duration: 0.25,
      ease: 'cubic-bezier(0,0,0.2,1)',
      yoyo: true,
      repeat: 5, // 3 bounces = 6 moves (up, down, up, down, up, down)
      onComplete: () => { gsap.set(ctaElement, { y: 0 }); }
    });

    return () => {
      tl.kill();
    };
  }, []);

  const handleReservation = () => {
    // Scroll to contact section or open booking modal
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url(/gummy-bear-background.png)' }}>
          {/* Background image for hero section */}
        </div>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white max-w-4xl w-full">
          <div ref={textRef}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 scripted-neon leading-tight">
              {(() => {
                const text = 'Candy Martini Bar';
                const colors = [
                  'neon-pink',
                  'neon-blue',
                  'neon-green',
                  'neon-yellow',
                  'neon-purple',
                  'neon-orange',
                  'neon-red',
                ];
                return text.split('').map((char, i) =>
                  char === ' '
                    ? ' '
                    : <span key={i} className={colors[i % colors.length]}>{char}</span>
                );
              })()}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-2 sm:mb-4 font-light">
              Where Candy Meets Cocktails
            </p>
            <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-12 text-gray-200 max-w-2xl mx-auto px-4">
              Experience our signature candy-inspired martinis in an atmosphere as sweet as our drinks
            </p>
          </div>
          
          <button
            ref={ctaRef}
            onClick={handleReservation}
            className="group bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 sm:px-8 lg:px-12 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-2 sm:gap-3 mx-auto w-fit"
          >
            <Calendar size={20} className="sm:w-6 sm:h-6" />
            <span className="whitespace-nowrap">Book Your Sweet Experience</span>
            <div className="w-0 group-hover:w-4 sm:group-hover:w-6 transition-all duration-300 overflow-hidden">
              →
            </div>
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-2 sm:h-3 bg-white rounded-full mt-1 sm:mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;