'use client';

import Image from "next/image";
import styles from "./copyLink.module.scss";
import IconCopy from "../../assets/icons/copy.svg";

export const CopyLinkButton = () => {
  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <button className={styles.copy} onClick={handleCopy}>
      <p className={styles.copy__text}>Скопіювати посилання</p>
      <Image alt="копіювати" src={IconCopy} width={20} height={20} />
    </button>
  );
};
