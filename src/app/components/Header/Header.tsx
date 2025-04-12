"use client"
import Image from "next/image";
import cn from "classnames";
import Logo from "../../assets/Logo.svg";
import LogoDark from "../../assets/Logo-dark-theme.svg";
import styles from './header.module.scss';
import { useHoroscope } from "@/app/context/horoscopeContext";

export const Header = () => {
  const { darkMode } = useHoroscope();

  return (
    <header className={cn(styles.header, { [styles["header--dark"]]: darkMode })}>
      <div className="header__logo">
        {darkMode ? (
          <Image src={LogoDark} alt="Logo-dark" width={40} height={40}/>
        ) : (
          <Image src={Logo} alt="Logo" width={40} height={40}/>
        )}
      </div>
      <h1>Гороскоп warlock</h1>
    </header>
  );
};
