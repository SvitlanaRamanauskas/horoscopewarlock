import { AdaptedDate } from '../types/date';

const monthGenitiveMap: Record<number, string> = {
  0: 'січня',
  1: 'лютого',
  2: 'березня',
  3: 'квітня',
  4: 'травня',
  5: 'червня',
  6: 'липня',
  7: 'серпня',
  8: 'вересня',
  9: 'жовтня',
  10: 'листопада',
  11: 'грудня'
};

export const getNextDays = (numberOfDays: number): AdaptedDate[] => {
  const today = new Date();
  const dates = [];
  
  for (let i = 0; i < numberOfDays; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);

    const weekday = date.toLocaleDateString('uk-UA', { weekday: 'long'});
    const day = date.getDate().toString();
    const month = monthGenitiveMap[date.getMonth()];
    dates.push({ weekday, day, month });
  }

  return dates;
};

export const getStrDate = (adaptedDate: AdaptedDate) => {
  const strDayNum = adaptedDate.day.padStart(2, '0');
  const monthEntry = Object.entries(monthGenitiveMap)
    .find(([, value]) => value === adaptedDate.month);

  if (!monthEntry) return '00-00';

  const monthIndex = parseInt(monthEntry[0], 10);
  const strMonthNum = String(monthIndex + 1).padStart(2, '0');

  return `${strDayNum}-${strMonthNum}`;
};
