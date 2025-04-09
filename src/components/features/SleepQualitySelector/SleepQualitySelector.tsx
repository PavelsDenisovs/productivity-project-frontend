"use client"

import styles from "./SleepQualitySelector.module.scss";

interface SleepQualitySelectorProps {
  value: number | null;
  onChange: (value: number) => void;
}

const SleepQualitySelector: React.FC<SleepQualitySelectorProps> = ({ value, onChange }) => {
  return (
    <div className={styles.selector}>
      <span>Sleep Quality:</span>
      <div className={styles.scale}>
        {[...Array(10)].map((_, i) => {
          const num = i + 1;
          const selected = value === num;
          return (
            <button
              key={num}
              className={`${styles.number} ${selected ? styles.selected : ""}`}
              onClick={() => onChange(num)}
            >
              {num}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SleepQualitySelector;
