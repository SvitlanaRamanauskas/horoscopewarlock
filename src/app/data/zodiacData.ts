import { ZodiacInfo, Zodiacs } from "../types/zodiacs";

export const ZODIAC_DATA: Record<Zodiacs, ZodiacInfo> = {
  [Zodiacs.Capricorn]: {
    name: "Козоріг",
    dateRange: { from: "12-22", to: "01-19" },
    icon: "<></>, // замінити на <CapricornIcon />",
    image: "/images/zodiacs/capricorn.jpg",
  },
  [Zodiacs.Aquarius]: {
    name: "Водолій",
    dateRange: { from: "01-20", to: "02-18" },
    icon: "<></>",
    image: "/images/zodiacs/aquarius.jpg",
  },
  [Zodiacs.Pisces]: {
    name: "Риби",
    dateRange: { from: "02-19", to: "03-20" },
    icon: "<></>",
    image: "/images/zodiacs/pisces.jpg",
  },
  [Zodiacs.Aries]: {
    name: "Овен",
    dateRange: { from: "03-21", to: "04-19" },
    icon: "<AriesIcon />",
    image: "/images/zodiacs/aries.jpg",
  },
  [Zodiacs.Taurus]: {
    name: "Тілець",
    dateRange: { from: "04-20", to: "05-20" },
    icon: "<></>",
    image: "/images/zodiacs/taurus.jpg",
  },
  [Zodiacs.Gemini]: {
    name: "Близнюки",
    dateRange: { from: "05-21", to: "06-20" },
    icon: "<></>",
    image: "/images/zodiacs/gemini.jpg",
  },
  [Zodiacs.Cancer]: {
    name: "Рак",
    dateRange: { from: "06-21", to: "07-22" },
    icon: "<></>",
    image: "/images/zodiacs/cancer.jpg",
  },
  [Zodiacs.Leo]: {
    name: "Лев",
    dateRange: { from: "07-23", to: "08-22" },
    icon: "<></>",
    image: "/images/zodiacs/leo.jpg",
  },
  [Zodiacs.Virgo]: {
    name: "Діва",
    dateRange: { from: "08-23", to: "09-22" },
    icon: "<></>",
    image: "/images/zodiacs/virgo.jpg",
  },
  [Zodiacs.Libra]: {
    name: "Терези",
    dateRange: { from: "09-23", to: "10-22" },
    icon: "<></>",
    image: "/images/zodiacs/libra.jpg",
  },
  [Zodiacs.Scorpio]: {
    name: "Скорпіон",
    dateRange: { from: "10-23", to: "11-21" },
    icon: "<></>",
    image: "/images/zodiacs/scorpio.jpg",
  },
  [Zodiacs.Sagittarius]: {
    name: "Стрілець",
    dateRange: { from: "11-22", to: "12-21" },
    icon: "<></>",
    image: "/images/zodiacs/sagittarius.jpg",
  },
};
