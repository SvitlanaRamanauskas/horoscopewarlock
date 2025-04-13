export enum Zodiacs {
  Capricorn = 'Capricorn',   // Козеріг
  Aquarius = 'Aquarius',     // Водолій
  Pisces = 'Pisces',         // Риби
  Aries = 'Aries',           // Овен
  Taurus = 'Taurus',         // Тілець
  Gemini = 'Gemini',         // Близнюки
  Cancer = 'Cancer',         // Рак
  Leo = 'Leo',               // Лев
  Virgo = 'Virgo',           // Діва
  Libra = 'Libra',           // Терези
  Scorpio = 'Scorpio',       // Скорпіон
  Sagittarius = 'Sagittarius' // Стрілець
}

export type ZodiacInfo = {
  name: string;
  dateRange: { from: string; to: string };
  icon: React.ReactNode;
  image: string;
};
