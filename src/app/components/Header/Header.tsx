import Image from "next/image";
import Logo from "../../assets/Logo.svg";
import styles from './header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className="header__logo">
      <Image src={Logo} alt="Logo" width={40} height={40}/>
      </div>
      <h1>Гороскоп warlock</h1>
    </header>
  );
};
