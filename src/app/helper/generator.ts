import { LifeFields } from "../types/lifeFields";

export const generateLifeFieldsRate = (date: string, sign: string): LifeFields => {
  const key = `${date}-${sign}`;

  const randomCode = key
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const health = ((randomCode * 17) % 10) + 1;
  const love = ((randomCode * 23) % 10) + 1;
  const career = ((randomCode * 31) % 10) + 1;

  return { health, love, career };
};

export const getKeyAcpect = (fields: LifeFields) => {
  const entries = Object.entries(fields);
  entries.sort((a, b) => b[1] - a[1]);
  return entries[0][0];
};

export const getAverageRate = (rating: LifeFields) => {
  return (rating.career + rating.health + rating.love) / 3;
}

export const isAvarageRatingForCat = (rating: LifeFields) => {
  const average = getAverageRate(rating);

  return average <= 5;
};

export const getMaxField = (rating: LifeFields): string => {
  let maxKey: keyof LifeFields = "love";
  let maxValue = rating[maxKey];

  for (const key in rating) {
    if (rating[key as keyof LifeFields] > maxValue) {
      maxKey = key as keyof LifeFields;
      maxValue = rating[key as keyof LifeFields];
    }
  }

  return maxKey;
}
