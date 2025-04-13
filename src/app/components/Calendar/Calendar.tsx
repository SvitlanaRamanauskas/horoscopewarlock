'use client';

import cn from 'classnames';
import { AdaptedDate } from '@/app/types/date';
import styles from './calendar.module.scss';
import { Date } from '../Date/Date';

type Props = {
  handleDateClick: (day: AdaptedDate) => void;
  nextDaysArr: AdaptedDate[];
  numberOfDays: number;
}

export const Calendar: React.FC<Props> = ({ 
  handleDateClick, 
  nextDaysArr, 
  numberOfDays
}) => {
  return (
    <section className={styles.calendar}>

      <ul className={cn(styles.calendar__list, { [styles['calendar__list--three']]: numberOfDays === 3 })}>
        {nextDaysArr.map((day) => (
          <Date date={day} handleDateClick={handleDateClick} key={day.day}/>
        ))}
      </ul>
    </section>
  );
};
