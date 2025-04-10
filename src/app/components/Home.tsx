"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import cn from "classnames";
import Image from "next/image";

import { Zodiacs } from "../types/zodiacs";
import { AdaptedDate } from "../types/date";

import { generateLifeFieldsRate, isAvarageRatingForCat } from "../helper/generator";
import { getNextDays, getStrDate } from "../helper/nextDays";
import { getCurrentDate } from "../helper/curentDate";
import { ZODIAC_DATA } from "../data/zodiacData";

import { useHoroscope } from "../Context/horoscopeContext";

const DEFAULT_ZODIAC = Zodiacs.Aries;
const DEFAULT_DAYS = 7;

const HomePage = () => {

  const router = useRouter();
  const searchParams = useSearchParams();

  const zodiacFromUrl = searchParams.get("zodiac") as Zodiacs;
  const dateFromUrl = searchParams.get("date");

  const { selectedZodiac, setSelectedZodiac, selectedDate, setSelectedDate, setZodiacRates,zodiacRates } = useHoroscope();
  const [numberOfDays, setNumberOfDays] = useState(DEFAULT_DAYS);
  const [nextDaysArr, setNextDaysArr] = useState(getNextDays(DEFAULT_DAYS));
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedZodiac = localStorage.getItem("zodiac");
    const storedDate = localStorage.getItem("date");
    const storedRates = localStorage.getItem("zodiacRates");

    const initialZodiac = storedZodiac ? JSON.parse(storedZodiac) : DEFAULT_ZODIAC;
    const initialDate = storedDate ? JSON.parse(storedDate) : getCurrentDate();

    setSelectedZodiac(initialZodiac);
    setSelectedDate(initialDate);

    if (!storedZodiac) localStorage.setItem("zodiac", JSON.stringify(initialZodiac));
    if (!storedDate) localStorage.setItem("date", JSON.stringify(initialDate));

    if (storedRates) {
      setZodiacRates(JSON.parse(storedRates));
    } else {
      const rates = generateLifeFieldsRate(initialDate, initialZodiac);
      setZodiacRates(rates);
    }

    router.push(`/prognose/${initialZodiac}/${initialDate}`);;
  }, []);

  useEffect(() => {
    if (zodiacFromUrl || dateFromUrl) {
      const zodiac = zodiacFromUrl || selectedZodiac;
      const date = dateFromUrl || selectedDate;
      setSelectedZodiac(zodiac);
      setSelectedDate(date);

      const rates = generateLifeFieldsRate(date, zodiac);
      setZodiacRates(rates);
      setNextDaysArr(getNextDays(numberOfDays));
    }
  }, [numberOfDays, zodiacFromUrl, dateFromUrl]);

  const handleZodiacChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const zodiac = e.target.value as Zodiacs;
    setSelectedZodiac(zodiac);
    localStorage.setItem("zodiac", JSON.stringify(zodiac));
    router.push(`/prognose/${zodiac}/${selectedDate}`);
  };

  const handleDateClick = (day: AdaptedDate) => {
    const date = getStrDate(day);
    console.log(date);
    const zodiac = selectedZodiac || DEFAULT_ZODIAC;
    setSelectedDate(date);
    localStorage.setItem("date", JSON.stringify(date));
    
    const rates = generateLifeFieldsRate(date, zodiac);
    setZodiacRates(rates);
    localStorage.setItem("zodiacRates", JSON.stringify(rates));
    const cat = isAvarageRatingForCat(rates);

    router.push(`/prognose/${zodiac}/${date}`);

    if (cat) {
      
    }
  };

  const handleChangeDaysNumber = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNumberOfDays(+e.target.value);
  };

  const handleCancelSelections = () => {
    localStorage.clear();
    setSelectedZodiac(DEFAULT_ZODIAC);
    setSelectedDate(getCurrentDate());
    setNextDaysArr(getNextDays(DEFAULT_DAYS));
  };

  return (
    <div className={cn("home", { "home--dark": darkMode })}>
      <h1>Гороскоп WARLOCK</h1>

      <button onClick={handleCancelSelections}>Скасувати вибір</button>

      <div className="zodiac__rate-image">
        <Image alt="твій зодіак" src={ZODIAC_DATA[selectedZodiac].image} width={100} height={100} />
      </div>

      <label htmlFor="zodiacSelect">Знак зодіаку</label>
      <select onChange={handleZodiacChange} value={selectedZodiac} name="zodiacSelect">
        {Object.keys(ZODIAC_DATA).map((key) => (
          <option key={key} value={key}>{ZODIAC_DATA[key as Zodiacs].name}</option>
        ))}
      </select>

      <label htmlFor="dateSelect">Кількість днів</label>
      <select onChange={handleChangeDaysNumber} name="dateSelect">
        <option value="7">7</option>
        <option value="3">3</option>
      </select>

      <button className="mode" onClick={() => setDarkMode((prev) => !prev)}>
        <div className="mode__circle"></div>
      </button>

      <section className="calendar">
      <article>
          <ul>
            {nextDaysArr.map((day) => (
              <li key={day.day}>
                <div className="day">
                  <button onClick={() => handleDateClick(day)}>
                    <p>{day.weekday}</p>
                    <p>{`${day.day} ${day.month}`}</p>
                    {zodiacRates && getStrDate(day) === selectedDate && (
                      <ul>
                        <li>{`Здоров'я: ${zodiacRates.health}`}</li>
                        <li>{`Стосунки: ${zodiacRates.love}`}</li>
                        <li>{`Кар'єра: ${zodiacRates.career}`}</li>
                      </ul>
                    )}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  );
};

export default HomePage;
