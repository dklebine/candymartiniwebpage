import React from 'react';
import { Heart, Wine } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 sm:py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Wine className="text-pink-400" size={28} />
              <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Candy Martini Bar
              </h3>
            </div>
            <p className="text-gray-400 mb-4 max-w-md text-sm sm:text-base">
              Where candy meets cocktails in perfect harmony. Experience our signature 
              candy-inspired martinis in an atmosphere as sweet as our drinks.
            </p>
            <p className="text-gray-500 text-xs sm:text-sm">
              21+ Only • Please Drink Responsibly
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-pink-300 text-sm sm:text-base">Quick Links</h4>
            <ul className="space-y-1 sm:space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-pink-300 transition-colors">Menu</a></li>
              <li><a href="#" className="hover:text-pink-300 transition-colors">Reservations</a></li>
              <li><a href="#" className="hover:text-pink-300 transition-colors">Events</a></li>
              <li><a href="#" className="hover:text-pink-300 transition-colors">Private Parties</a></li>
              <li><a href="#" className="hover:text-pink-300 transition-colors">Gift Cards</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-purple-300 text-sm sm:text-base">Contact</h4>
            <ul className="space-y-1 sm:space-y-2 text-gray-400 text-sm">
              <li>3545 S Las Vegas Blvd Suite L-28</li>
              <li>Las Vegas, NV 89109</li>
              <li>(555) 123-SWEET</li>
              <li>info@ilovesugar.com</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-gray-500 text-xs sm:text-sm text-center sm:text-left">
            © 2024 Candy Martini Bar. All rights reserved.
          </p>
          <div className="flex items-center space-x-1 text-gray-500 text-xs sm:text-sm">
            <span>Made with</span>
            <Heart size={12} className="sm:w-[14px] sm:h-[14px] text-pink-400 fill-current" />
            <span>for cocktail lovers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;