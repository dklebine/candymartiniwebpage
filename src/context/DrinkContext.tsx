import React, { createContext, useContext, useState, ReactNode } from 'react';
import { drinks } from '../data/drinks';

interface DrinkContextType {
  selectedDrinkIndex: number;
  setSelectedDrinkIndex: (index: number) => void;
  drinks: any[];
  loading: boolean;
  error: string | null;
}

const DrinkContext = createContext<DrinkContextType | undefined>(undefined);

export const useDrinkContext = () => {
  const context = useContext(DrinkContext);
  if (context === undefined) {
    throw new Error('useDrinkContext must be used within a DrinkProvider');
  }
  return context;
};

interface DrinkProviderProps {
  children: ReactNode;
}

export const DrinkProvider: React.FC<DrinkProviderProps> = ({ children }) => {
  const [selectedDrinkIndex, setSelectedDrinkIndex] = useState(0);

  return (
    <DrinkContext.Provider value={{ 
      selectedDrinkIndex, 
      setSelectedDrinkIndex, 
      drinks, 
      loading: false, 
      error: null 
    }}>
      {children}
    </DrinkContext.Provider>
  );
};