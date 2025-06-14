import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Clock, Instagram, Facebook, Twitter } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(section.querySelectorAll('.animate-in'),
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

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="py-12 sm:py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="animate-in text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Visit Us
          </h2>
          <p className="animate-in text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Experience the sweetest cocktails in the city at our candy-inspired martini bar
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Info */}
          <div className="space-y-6 sm:space-y-8">
            <div className="animate-in">
              <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-pink-300">Get in Touch</h3>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <MapPin className="text-pink-400 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-semibold text-base sm:text-lg mb-1">Location</h4>
                    <p className="text-gray-300 text-sm sm:text-base">
                      123 Sweet Street<br />
                      Downtown District<br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <Phone className="text-pink-400 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-semibold text-base sm:text-lg mb-1">Reservations</h4>
                    <p className="text-gray-300 text-sm sm:text-base">(555) 123-SWEET</p>
                    <p className="text-gray-300 text-sm sm:text-base">(555) 123-7933</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <Clock className="text-pink-400 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-semibold text-base sm:text-lg mb-1">Hours</h4>
                    <div className="text-gray-300 space-y-1 text-sm sm:text-base">
                      <p>Monday - Thursday: 5:00 PM - 12:00 AM</p>
                      <p>Friday - Saturday: 5:00 PM - 2:00 AM</p>
                      <p>Sunday: 6:00 PM - 11:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-in">
              <h4 className="font-semibold text-base sm:text-lg mb-4 text-purple-300">Follow Us</h4>
              <div className="flex space-x-4 sm:space-x-6">
                <a href="#" className="text-pink-400 hover:text-pink-300 transition-colors transform hover:scale-110">
                  <Instagram size={28} className="sm:w-8 sm:h-8" />
                </a>
                <a href="#" className="text-pink-400 hover:text-pink-300 transition-colors transform hover:scale-110">
                  <Facebook size={28} className="sm:w-8 sm:h-8" />
                </a>
                <a href="#" className="text-pink-400 hover:text-pink-300 transition-colors transform hover:scale-110">
                  <Twitter size={28} className="sm:w-8 sm:h-8" />
                </a>
              </div>
            </div>

            <div className="animate-in">
              <button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl w-full sm:w-auto">
                Make a Reservation
              </button>
            </div>
          </div>

          {/* Map */}
          <div className="animate-in">
            <div className="bg-gray-800 rounded-2xl p-6 sm:p-8 h-full min-h-[400px] sm:min-h-[500px] flex items-center justify-center border border-gray-700">
              <div className="text-center text-gray-400">
                <MapPin size={48} className="sm:w-16 sm:h-16 mx-auto mb-4 text-pink-400" />
                <h4 className="text-lg sm:text-xl font-semibold mb-2 text-white">Interactive Map</h4>
                <p className="mb-4 text-sm sm:text-base">Google Maps integration will be embedded here</p>
                <div className="text-xs sm:text-sm text-gray-500 space-y-1">
                  <p>• Street view available</p>
                  <p>• Parking information</p>
                  <p>• Public transit directions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;