import React from 'react';
import styles from '../SignUpForm.module.scss';

interface ProgressBarProps {
  step: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ step, totalSteps }) => {
  const progressPercentage = (step / totalSteps) * 100;
  return (
    <>
      <p className={styles.form__progressBarText}>
        Step {step} of {totalSteps}
      </p>
      <div className={styles.form__progressBar}>
        <div
          className={styles.form__progressBarFill}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </>
  )
}

export default ProgressBar;