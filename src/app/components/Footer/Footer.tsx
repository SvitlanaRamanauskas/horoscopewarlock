"use client"

import { useHoroscope } from "@/app/context/horoscopeContext";
import styles from "./footer.module.scss";
import cn from "classnames";

export const Footer = () => { 
  const { darkMode } = useHoroscope();
  return (
    <footer className={cn(styles.footer, { [styles["footer--dark"]]: darkMode })}>
      <p className={styles.footer__text}>© 2025 Гороскопи warlock</p>
    </footer>
  )
};
