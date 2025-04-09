"use client"

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ZODIAC_DATA } from "./data/zodiacData";
import { Zodiacs } from "./types/zodiacs";
import { getCurrentDate } from "./helper/curentDate";
import { LifeFields } from "./types/lifeFields";
import { generateLifeFieldsRate } from "./helper/generator";
import { getNextDays, getStrDate } from "./helper/nextDays";
import { AdaptedDate } from "./types/date";

const HomePage = () => {
  const [selectedZodiac, setSelectedZodiac] = useState<Zodiacs | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [zodiacRates, setZodiacRates] = useState<LifeFields | null>(null);
  const [numberOfDays, setNumberOfDays] = useState(7);
  const [nextDaysArr, setNextDaysArr] = useState(getNextDays(numberOfDays))

  const router = useRouter();
  const searchParams = useSearchParams();
  const zodiacFromUrl = searchParams.get("zodiac");
  const dateFromUrl = searchParams.get("date");

  useEffect(() => {
    if (!zodiacFromUrl && !dateFromUrl) {
      const defaultDate = getCurrentDate();
      router.push(`/?zodiac=Aries&date=${defaultDate}`);
    }
  }, []);


  useEffect(() => {
    if (zodiacFromUrl) setSelectedZodiac(zodiacFromUrl as Zodiacs);
    if (dateFromUrl) setSelectedDate(dateFromUrl);

    const daysArr = getNextDays(numberOfDays)
    setNextDaysArr(daysArr);
  }, [zodiacFromUrl, dateFromUrl, numberOfDays]);

  const handleZodiacChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value as Zodiacs;
    if (localStorage.getItem("zodiac")) {
      setSelectedZodiac(selected);
      localStorage.removeItem("zodiac");
      localStorage.setItem("zodiac", e.target.value as Zodiacs);
    } else {
      localStorage.setItem("zodiac", selected); //first set
      const today = getCurrentDate();
      setSelectedDate(today);
    }

    router.push(`/?zodiac=${selected}&date=${selectedDate}`);
  };

  const handleDateClick = (day: AdaptedDate) => {
    const date = getStrDate(day);
    setSelectedDate(date);
    const receivedRates = generateLifeFieldsRate(
      date,
      selectedZodiac as Zodiacs
    );
    //{love: 4, health: 6, career: 9}
    setZodiacRates(receivedRates);
    router.push(`/?zodiac=${selectedZodiac}&date=${date}`);
  };

  const handleChangeDaysNumber = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNumberOfDays(+e.target.value);
  }

  return (
    <div>
      <h1>Гороскоп WARLOCK</h1>
      <h2>Виберіть свій знак зодіаку</h2>
      <select onChange={handleZodiacChange} value={selectedZodiac || ""}>
        <option value="" disabled>
          Виберіть Ваш знак
        </option>
        {Object.keys(ZODIAC_DATA).map((key) => {
          const zodiac = ZODIAC_DATA[key as Zodiacs];

          return (
            <option key={key} value={key}>
              {zodiac.name}
            </option>
          );
        })}
      </select>

      <select onChange={handleChangeDaysNumber} name="" id="">
        <option value="3">3</option>
        <option value="7"defaultValue={7}>7</option>
      </select>

      <ul>
        {nextDaysArr.map(day => (
          <li key={day.day} >
            <button onClick={() => handleDateClick(day)}>
              <p>{day.weekday}</p>
              <p>{`${day.day} ${day.month}`}</p>
            </button>
          </li>
        ))}
      </ul>


      <div>
        <p>{`Кар'єра: ${zodiacRates?.career}`}</p>
        <p>{`Стосунки: ${zodiacRates?.love}`}</p>
        <p>{`Здоров'я: ${zodiacRates?.health}`}</p>
      </div>
    </div>
  );
};

export default HomePage;
