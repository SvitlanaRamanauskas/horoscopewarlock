"use client"
import React, { useState } from "react";
import cn from "classnames";
import { Zodiacs } from "@/app/types/zodiacs";
import { ZODIAC_DATA } from "@/app/data/zodiacData";
import styles from "./SelectInput.module.scss";

type SelectProps = {
  label: string;
  value: Zodiacs | number;
  onChangeHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options?: Array<{ value: Zodiacs | number; label: string }>;
  isZodiacSelect?: boolean;
};

export const SelectInput: React.FC<SelectProps> = ({
  label,
  value,
  onChangeHandler,
  options = [],
  isZodiacSelect = false,
}) => {
  const [isSelectFocused, setIsSelectFocused] = useState(false);

  const handleSelectBlur = () => {
    setIsSelectFocused(false);
  };

  const handleSelectFocus = () => {
    setIsSelectFocused(!isSelectFocused);
  };

  return (
    <div className={cn(styles.dropdown__input, {
      [styles["dropdown__input--focused"]]: isSelectFocused,
    })}>
      <label htmlFor="select" className={styles["dropdown__input-label"]}>
        {label}
      </label>

      <select
        onChange={onChangeHandler}
        value={value}
        name="select"
        className={styles["dropdown__select"]}
        onBlur={handleSelectBlur}
        onClick={handleSelectFocus}
      >
        {isZodiacSelect ? (
          Object.keys(ZODIAC_DATA).map((key) => (
            <option
              className={styles["select-input__option"]}
              key={key}
              value={key}
            >
              {ZODIAC_DATA[key as Zodiacs].name}
            </option>
          ))
        ) : (
          options.map((option) => (
            <option
              className={styles["dropdown__option"]}
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))
        )}
      </select>
    </div>
  );
};
