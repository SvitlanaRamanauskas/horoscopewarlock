import styles from './mode.module.scss';
import cn from 'classnames';

type Props = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Mode: React.FC<Props> = ({ setDarkMode, darkMode }) => {
  return (
    <div className={styles.mode}>
      <p className={styles.mode__title}>денна/ нічна тема</p>
      <button
        className={styles['mode__button']}
        onClick={() => setDarkMode((prev) => !prev)}
      >
        <div
          className={cn(styles.mode__circle, {
            [styles['mode__circle--dark']]: darkMode,
          })}
        ></div>
      </button>
    </div>
  );
};
