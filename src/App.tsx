import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DrinkProvider } from './context/DrinkContext';
import HeroSection from './components/HeroSection';
import DrinkSlider from './components/DrinkSlider';
import CocktailShowcase from './components/CocktailShowcase';
import CardSlider from './components/CardSlider';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

const MainSite = () => (
  <div className="overflow-x-hidden">
    <HeroSection />
    <DrinkSlider />
    <CocktailShowcase />
    <CardSlider />
    <ContactSection />
    <Footer />
    <ScrollToTop />
  </div>
);

function App() {
  return (
    <Router>
      <DrinkProvider>
        <Routes>
          <Route path="/" element={<MainSite />} />
          <Route path="*" element={<Navigate to="/\" replace />} />
        </Routes>
      </DrinkProvider>
    </Router>
  );
}

export default App;