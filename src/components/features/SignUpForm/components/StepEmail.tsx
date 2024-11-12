"use client"

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import React from 'react';
import styles from '../SignUpForm.module.scss';

interface StepEmailProps {
  formData: { email: string, displayName: string };
  updateFormData: (field: string, value: string) => void;
  handleNext: () => void;
}

const StepEmail: React.FC<StepEmailProps> = ({ formData, updateFormData, handleNext }) => {
  const handleContinue = () => {
    if (formData.displayName && formData.email) {
      handleNext();
    } else {
      alert("Please fill in all fields");
    }
  };
  
  return (
    <>
      <div className={styles.form__group}>
        <label className={styles.form__label} htmlFor="displayName">Display Name</label>
        <Input
          type="text"
          id="displayName"
          value={formData.displayName}
          onChange={(e) => updateFormData("displayName", e.target.value)}
          className={styles.form__input}
          required
        />
      </div>
      <div className={styles.form__group}>
        <label className={styles.form__label} htmlFor="email">Email</label>
        <Input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => updateFormData("email", e.target.value)}
          className={styles.form__input}
          required
        />
      </div>
      <div className={styles.form__buttonsWrapper}>
        <Button label="Next" type="button" onClick={handleContinue} className={styles.form__button} />
      </div>
    </>
  )
}

export default StepEmail;