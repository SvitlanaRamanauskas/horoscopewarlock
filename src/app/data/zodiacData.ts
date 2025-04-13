import { ZodiacInfo, Zodiacs } from '../types/zodiacs';

export const ZODIAC_DATA: Record<Zodiacs, ZodiacInfo> = {
  [Zodiacs.Capricorn]: {
    name: 'Козеріг',
    dateRange: { from: '12-22', to: '01-19' },
    icon: '<></>, // замінити на <CapricornIcon />',
    image: '/images/zodiacs/Capricorn.jpg',
  },
  [Zodiacs.Aquarius]: {
    name: 'Водолій',
    dateRange: { from: '01-20', to: '02-18' },
    icon: '<></>',
    image: '/images/zodiacs/Aquarius.jpg',
  },
  [Zodiacs.Pisces]: {
    name: 'Риби',
    dateRange: { from: '02-19', to: '03-20' },
    icon: '<></>',
    image: '/images/zodiacs/Pisces.jpg',
  },
  [Zodiacs.Aries]: {
    name: 'Овен',
    dateRange: { from: '03-21', to: '04-19' },
    icon: '<AriesIcon />',
    image: '/images/zodiacs/Aries.jpg',
  },
  [Zodiacs.Taurus]: {
    name: 'Тілець',
    dateRange: { from: '04-20', to: '05-20' },
    icon: '<></>',
    image: '/images/zodiacs/Taurus.jpg',
  },
  [Zodiacs.Gemini]: {
    name: 'Близнюки',
    dateRange: { from: '05-21', to: '06-20' },
    icon: '<></>',
    image: '/images/zodiacs/Gemini.webp',
  },
  [Zodiacs.Cancer]: {
    name: 'Рак',
    dateRange: { from: '06-21', to: '07-22' },
    icon: '<></>',
    image: '/images/zodiacs/Cancer.jpg',
  },
  [Zodiacs.Leo]: {
    name: 'Лев',
    dateRange: { from: '07-23', to: '08-22' },
    icon: '<></>',
    image: '/images/zodiacs/Leo.webp',
  },
  [Zodiacs.Virgo]: {
    name: 'Діва',
    dateRange: { from: '08-23', to: '09-22' },
    icon: '<></>',
    image: '/images/zodiacs/Virgo.webp',
  },
  [Zodiacs.Libra]: {
    name: 'Терези',
    dateRange: { from: '09-23', to: '10-22' },
    icon: '<></>',
    image: '/images/zodiacs/Libra.jpg',
  },
  [Zodiacs.Scorpio]: {
    name: 'Скорпіон',
    dateRange: { from: '10-23', to: '11-21' },
    icon: '<></>',
    image: '/images/zodiacs/Scorpio.jpg',
  },
  [Zodiacs.Sagittarius]: {
    name: 'Стрілець',
    dateRange: { from: '11-22', to: '12-21' },
    icon: '<></>',
    image: '/images/zodiacs/Sagittarius.webp',
  },
};
