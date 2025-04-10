import { CopyLinkButton } from "@/app/components/copyLinkButton";
import { lifeFieldsPrediction } from "@/app/data/lifeFieldsData";
import { MAX_RATE_IMAGES } from "@/app/data/maxRateData";
import { ZODIAC_DATA } from "@/app/data/zodiacData";
import { generateLifeFieldsRate, getMaxField } from "@/app/helper/generator";
import { Zodiacs } from "@/app/types/zodiacs";
import Image from "next/image";

interface PageProps {
  params: {
    sign: Zodiacs;
    date: string;
  };
}

const ZodiacPredictionPage = async ({ params }: PageProps) => {
  const { sign, date } = await params;

  const zodiacRates = generateLifeFieldsRate(date, sign);
  const moodImage = MAX_RATE_IMAGES[getMaxField(zodiacRates)];

  return (
    <div className="zodiac">
      <h2>{`Гороскоп для ${ZODIAC_DATA[sign].name} на ${date}`}</h2>

      <div className="zodiac__images">
        <Image src={ZODIAC_DATA[sign].image} alt="знак зодіаку" width={100} height={100} />
        <Image src={moodImage} alt="настрій" width={100} height={100} />
      </div>

      <ul>
        <li>{`Здоров'я: ${zodiacRates.health} → ${lifeFieldsPrediction.health[zodiacRates.health]}`}</li>
        <li>{`Стосунки: ${zodiacRates.love} → ${lifeFieldsPrediction.love[zodiacRates.love]}`}</li>
        <li>{`Кар'єра: ${zodiacRates.career} → ${lifeFieldsPrediction.career[zodiacRates.career]}`}</li>
      </ul>

      <CopyLinkButton />
    </div>
  );
};

export default ZodiacPredictionPage;