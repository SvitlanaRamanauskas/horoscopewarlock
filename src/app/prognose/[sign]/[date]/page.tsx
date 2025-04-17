import { CopyLinkButton } from '@/app/components/CopyLink/copyLinkButton';
import { lifeFieldsPrediction } from '@/app/data/lifeFieldsData';
import styles from './zodiacPredictionPage.module.scss';
import { MAX_RATE_IMAGES } from '@/app/data/maxRateData';
import { ZODIAC_DATA } from '@/app/data/zodiacData';
import { generateLifeFieldsRate, getMaxField } from '@/app/helper/generator';
import { Zodiacs } from '@/app/types/zodiacs';
import Image from 'next/image';

import IconHealth from '../../../assets/icons-dark-theme/health-dark-theme.svg';
import IconLove from '../../../assets/icons-dark-theme/love-dark-theme.svg';
import IconCareer from '../../../assets/icons-dark-theme/career.svg';

interface PageProps {
  params: Promise<{
    sign: Zodiacs;
    date: string;
  }>;
}

const ZodiacPredictionPage = async ({ params }: PageProps) => {
  const { sign, date } = await params;

  const zodiacRates = generateLifeFieldsRate(date, sign as Zodiacs);
  const moodImage = MAX_RATE_IMAGES[getMaxField(zodiacRates)];

  return (
    <div  style={{
      backgroundColor: 'black',
    }}>
      <div className={styles.zodiac}>
        <h2
          className={styles.zodiac__title}
        >{`${ZODIAC_DATA[sign as Zodiacs].name} | гороскоп на ${date}-2025`}</h2>

        <section className={styles.zodiac__section}>
          <div className={styles.zodiac__image}>
            <Image src={moodImage} alt="настрій" width={100} height={100} />
          </div>
          <ul className={styles['zodiac__description-list']}>
            <li className={styles.zodiac__description}>
              <Image alt="здоровя" src={IconHealth} width={30} height={30} />
              <p>{lifeFieldsPrediction.health[zodiacRates.health]}</p>
            </li>

            <li className={styles.zodiac__description}>
              <Image alt="стосунки" src={IconLove} width={30} height={30} />
              <p>{lifeFieldsPrediction.love[zodiacRates.love]}</p>
            </li>

            <li className={styles.zodiac__description}>
              <Image alt="карєра" src={IconCareer} width={30} height={30} />
              <p>{lifeFieldsPrediction.career[zodiacRates.career]}</p>
            </li>
          </ul>
        </section>

        <CopyLinkButton />
      </div>

      <div
        style={{
          backgroundImage: `url(${ZODIAC_DATA[sign as Zodiacs].image})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'top',
          height: '500px',
        }}
      ></div>
    </div>
  );
};

export default ZodiacPredictionPage;
