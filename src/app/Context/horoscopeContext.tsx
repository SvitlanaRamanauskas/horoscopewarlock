'use client';

import { createContext, useContext, useState } from 'react';
import { LifeFields } from '../types/lifeFields';
import { Zodiacs } from '../types/zodiacs';
import { getCurrentDate } from '../helper/curentDate';

type HoroscopeContextType = {
  selectedZodiac: Zodiacs;
  setSelectedZodiac: (zodiac: Zodiacs) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  zodiacRates: LifeFields | null;
  setZodiacRates: (rates: LifeFields) => void;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const DEFAULT_ZODIAC = Zodiacs.Aries;
const DEFAULT_DATE = getCurrentDate();

const HoroscopeContext = createContext<HoroscopeContextType | undefined>(undefined);

export const HoroscopeProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedZodiac, setSelectedZodiac] = useState<Zodiacs>(DEFAULT_ZODIAC);
  const [selectedDate, setSelectedDate] = useState<string>(DEFAULT_DATE);
  const [zodiacRates, setZodiacRates] = useState<LifeFields | null>(null);
  const [darkMode, setDarkMode] = useState(false);


  return (
    <HoroscopeContext.Provider
      value={{ selectedZodiac, setSelectedZodiac, selectedDate,
        setSelectedDate, zodiacRates, setZodiacRates, darkMode, setDarkMode }}
    >
      {children}
    </HoroscopeContext.Provider>
  );
};

export const useHoroscope = () => {
  const context = useContext(HoroscopeContext);
  if (!context) {
    throw new Error('useHoroscope must be used within a HoroscopeProvider');
  }
  return context;
};
