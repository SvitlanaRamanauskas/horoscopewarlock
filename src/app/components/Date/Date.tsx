"use client";

import { useHoroscope } from "@/app/context/horoscopeContext";
import { getStrDate } from "@/app/helper/nextDays";
import { AdaptedDate } from "@/app/types/date";
import styles from "./date.module.scss";
import Image from "next/image";
import IconHealth from "../../assets/icons/health.svg";
import IconLove from "../../assets/icons/love.svg";
import IconCareer from "../../assets/icons/career.svg";

import IconHealthDark from "../../assets/icons-dark-theme/health-dark-theme.svg";
import IconLoveDark from "../../assets/icons-dark-theme/love-dark-theme.svg";
import IconCareerDark from "../../assets/icons-dark-theme/career.svg";
import { generateLifeFieldsRate } from "@/app/helper/generator";
import cn from "classnames";

type Props = {
  date: AdaptedDate;
  handleDateClick: (date: AdaptedDate) => void;
};

export const Date: React.FC<Props> = ({ date, handleDateClick }) => {
  const { zodiacRates, selectedZodiac, selectedDate } = useHoroscope();
  const rates = generateLifeFieldsRate(getStrDate(date), selectedZodiac);

  const { darkMode } = useHoroscope();

  return (
    <li key={date.day} className={cn(
      styles.date, 
      { [styles["date--selected"]]: selectedDate === getStrDate(date) },
      { [styles["date--dark"]]: darkMode}
      )}>
      <button
        className={cn(styles.date__box, { [styles["date__box--dark"]]: darkMode })}
        onClick={() => handleDateClick(date)}
      >
        <p className={cn(`${styles["date__text"]} ${styles["date__weekday"]}`, {
          [styles["date__weekday--dark"]]: darkMode
        })}>
          {date.weekday}
        </p>
        <p
          className={`${styles["date__text"]} ${styles["date__num"]}`}
        >{`${date.day} ${date.month}`}</p>

        {zodiacRates && getStrDate(date) && (
          <ul className={styles.date__list}>
            <li className={styles.date__rate}>
              <div className={styles.date__head}>
                <Image
                  alt="здоров'я"
                  src={darkMode ? IconHealthDark : IconHealth}
                  width={15}
                  height={15}
                />
                <p>здоровя</p>
              </div>

              <p className={styles.date__body}>{`${rates.health} балів`}</p>
            </li>

            <li className={styles.date__rate}>
              <div className={styles.date__head}>
                <Image
                  alt="стосунки"
                  src={darkMode ? IconLoveDark : IconLove}
                  width={15}
                  height={15}
                />
                <p>стосунки</p>
              </div>
              
              <p className={styles.date__body}>{`${rates.love} балів`}</p>
            </li>

            <li className={styles.date__rate}>
              <div className={styles.date__head}>
                <Image
                  alt="кар'єра"
                  src={darkMode ? IconCareerDark : IconCareer}
                  width={15}
                  height={15}
                />
                <p>карєра</p>
              </div>
              
              <p className={styles.date__body}>{`${rates.career} балів`}</p>
            </li>
          </ul>
        )}
      </button>
    </li>
  );
};
