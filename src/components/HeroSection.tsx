import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const ctaElement = ctaRef.current;

    if (!section || !ctaElement) return;

    // Set initial state
    gsap.set(ctaElement, { 
      opacity: 0, 
      y: 100,
      scale: 0.8 
    });

    // Animation timeline (on page load)
    const tl = gsap.timeline();
    tl.to(ctaElement, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: "power2.out",
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
      {/* Background */}
      <div className="absolute inset-0 w-full h-full">
        <div 
          className="w-full h-full bg-cover bg-center" 
          style={{ backgroundImage: 'url("/THE GUMMY BEAR (8).png")' }}
        ></div>
        <div className="absolute inset-0 radial-gradient-overlay"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full w-full">
        <div className="absolute top-[58%] left-1/2 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="text-center">
              <img src="/logo.png" alt="Candy Martini Bar" className="mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg" />
            </div>
            
            <div className="text-center text-white w-full">
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