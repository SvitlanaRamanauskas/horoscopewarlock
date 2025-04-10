"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { LifeFields } from "../types/lifeFields";
import { Zodiacs } from "../types/zodiacs";
import { generateLifeFieldsRate } from "../helper/generator";
import { getCurrentDate } from "../helper/curentDate";

type HoroscopeContextType = {
  selectedZodiac: Zodiacs;
  setSelectedZodiac: (zodiac: Zodiacs) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  zodiacRates: LifeFields | null;
  setZodiacRates: (rates: LifeFields) => void;
};

const DEFAULT_ZODIAC = Zodiacs.Aries;
const DEFAULT_DATE = getCurrentDate();

const HoroscopeContext = createContext<HoroscopeContextType | undefined>(undefined);

export const HoroscopeProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedZodiac, setSelectedZodiac] = useState<Zodiacs>(DEFAULT_ZODIAC);
  const [selectedDate, setSelectedDate] = useState<string>(DEFAULT_DATE);
  const [zodiacRates, setZodiacRates] = useState<LifeFields | null>(null);

  useEffect(() => {
    const storedZodiac = localStorage.getItem("zodiac");
    const storedDate = localStorage.getItem("date");
    const storedRates = localStorage.getItem("zodiacRates");

    const zodiac = storedZodiac ? JSON.parse(storedZodiac) : DEFAULT_ZODIAC;
    const date = storedDate ? JSON.parse(storedDate) : DEFAULT_DATE;

    setSelectedZodiac(zodiac);
    setSelectedDate(date);

    if (storedRates) {
      setZodiacRates(JSON.parse(storedRates));
    } else {
      const rates = generateLifeFieldsRate(date, zodiac);
      setZodiacRates(rates);
    }
  }, []);

  return (
    <HoroscopeContext.Provider
      value={{ selectedZodiac, setSelectedZodiac, selectedDate, setSelectedDate, zodiacRates, setZodiacRates }}
    >
      {children}
    </HoroscopeContext.Provider>
  );
};

export const useHoroscope = () => {
  const context = useContext(HoroscopeContext);
  if (!context) {
    throw new Error("useHoroscope must be used within a HoroscopeProvider");
  }
  return context;
};
