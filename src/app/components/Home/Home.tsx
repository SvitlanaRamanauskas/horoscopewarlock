'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import cn from 'classnames';
import Image from 'next/image';
import styles from './home.module.scss';

import { Zodiacs } from '../../types/zodiacs';
import { AdaptedDate } from '../../types/date';

import {
  generateLifeFieldsRate,
  isAvarageRatingForCat,
} from '../../helper/generator';
import { getNextDays, getStrDate } from '../../helper/nextDays';
import { getCurrentDate } from '../../helper/curentDate';
import { ZODIAC_DATA } from '../../data/zodiacData';

import { useHoroscope } from '../../context/horoscopeContext';
import { SelectInput } from '../Select/SelectInput';
import { Calendar } from '../Calendar/Calendar';
import { Mode } from '../Mode/Mode';

const DEFAULT_ZODIAC = Zodiacs.Aries;
const DEFAULT_DAYS = 7;

export const Home = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const zodiacFromUrl = searchParams.get('zodiac') as Zodiacs;
  const dateFromUrl = searchParams.get('date');

  const {
    selectedZodiac,
    setSelectedZodiac,
    selectedDate,
    setSelectedDate,
    setZodiacRates,
    darkMode,
    setDarkMode,
  } = useHoroscope();

  const [numberOfDays, setNumberOfDays] = useState(DEFAULT_DAYS);
  const [nextDaysArr, setNextDaysArr] = useState(getNextDays(DEFAULT_DAYS));
  const [catFact, setCatFact] = useState('');

  useEffect(() => {
    const storedZodiac = localStorage.getItem('zodiac');
    const storedDate = localStorage.getItem('date');
    const storedRates = localStorage.getItem('zodiacRates');

    const initialZodiac = storedZodiac
      ? JSON.parse(storedZodiac)
      : DEFAULT_ZODIAC;
    const initialDate = storedDate ? JSON.parse(storedDate) : getCurrentDate();

    setSelectedZodiac(initialZodiac);
    setSelectedDate(initialDate);

    if (!storedZodiac)
      localStorage.setItem('zodiac', JSON.stringify(initialZodiac));
    if (!storedDate) localStorage.setItem('date', JSON.stringify(initialDate));

    if (storedRates) {
      setZodiacRates(JSON.parse(storedRates));
    } else {
      const rates = generateLifeFieldsRate(initialDate, initialZodiac);
      setZodiacRates(rates);
    }

    router.push(`/prognose/${initialZodiac}/${initialDate}`);
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

  const fetchCat = async () => {
    try {
      const res = await fetch('https://catfact.ninja/fact');
      const data = await res.json();
      setCatFact(data.fact);
    } catch (error) {
      console.error('Не вдалося завантажити факт про котика', error);
    }
  };

  const handleZodiacChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const zodiac = e.target.value as Zodiacs;
    setSelectedZodiac(zodiac);
    localStorage.setItem('zodiac', JSON.stringify(zodiac));
    router.push(`/prognose/${zodiac}/${selectedDate}`);
  };

  const handleDateClick = (day: AdaptedDate) => {
    const date = getStrDate(day);
    const zodiac = selectedZodiac || DEFAULT_ZODIAC;
    setSelectedDate(date);
    localStorage.setItem('date', JSON.stringify(date));

    const rates = generateLifeFieldsRate(date, zodiac);
    setZodiacRates(rates);
    localStorage.setItem('zodiacRates', JSON.stringify(rates));
    const cat = isAvarageRatingForCat(rates);

    router.push(`/prognose/${zodiac}/${date}`);

    if (cat) {
      fetchCat();
    }
  };

  const handleChangeDaysNumber = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newNumberOfDays = +e.target.value;
    setNumberOfDays(newNumberOfDays);
    setNextDaysArr(getNextDays(newNumberOfDays));
  };

  return (
    <div className={cn(styles.home, { [styles['home--dark']]: darkMode })}>
      <div
        className={cn(styles.home__title, {
          [styles['home__title--dark']]: darkMode,
        })}
      >
        <h2>Дізнайся у Warlock, що чекає на тебе</h2>
        <p className={styles['home__title-cat-fact']}>{catFact}</p>
      </div>

      <div className={styles['home__header']}>
        <div className={styles['home__image-frame']}>
          <Image
            className={styles['home__image']}
            alt="твій зодіак"
            src={ZODIAC_DATA[selectedZodiac].image}
            width={250}
            height={250}
          />
        </div>

        <section className={styles.home__top}>
          <Mode darkMode={darkMode} setDarkMode={setDarkMode} />

          <SelectInput
            label="Знак зодіаку"
            value={selectedZodiac}
            onChangeHandler={handleZodiacChange}
            isZodiacSelect={true}
          />

          <SelectInput
            label="Кількість днів"
            value={numberOfDays}
            onChangeHandler={handleChangeDaysNumber}
            options={[
              { value: 7, label: '7' },
              { value: 3, label: '3' },
            ]}
          />
        </section>
      </div>

      <Calendar
        handleDateClick={handleDateClick}
        nextDaysArr={nextDaysArr}
        numberOfDays={numberOfDays}
      />
    </div>
  );
};
