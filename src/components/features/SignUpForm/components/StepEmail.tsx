"use client"

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import React, { useEffect, useRef, useState } from 'react';
import styles from '../SignUpForm.module.scss';
import { validateDisplayName, validateEmail } from '../utils';
import { formData } from '../types';

interface StepEmailProps {
  updateFormData: (data: formData) => void;
  handleNext: () => void;
  formData: formData;
}

const StepEmail: React.FC<StepEmailProps> = ({ updateFormData, handleNext, formData }) => {
  const [localFormData, setLocalFormData] = useState({
    email: formData.email || '',
    displayName: formData.displayName || '',
  })
  const [errors, setErrors] = useState<{ displayName?: string, email?: string }>({});

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setErrors({
        displayName:
          localFormData.displayName &&
          validateDisplayName(localFormData.displayName),
        email: localFormData.email && validateEmail(localFormData.email),
      });
    }, 1500);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [localFormData]);

  const handleInputChange = (field: string, value: string) => {
    setErrors({});
    setLocalFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleContinue = async () => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (!localFormData.displayName) {
      setErrors({
        ...errors,
        displayName: "This field is required"
      });
      return;
    }

    if (!localFormData.email) {
      setErrors({
        ...errors,
        email: "This field is required"
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/user/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(localFormData)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Validation failed");
      }

      const data = await response.json();
      if (data.errors && Object.keys(data.errors).length > 0) {
        setErrors(data.errors);
        return;
      }

      updateFormData(localFormData);
      handleNext();
    } catch (err: any) {
      throw new Error(err);
    }

  };
  
  return (
    <>
      <div className={styles.form__group}>
        <label className={styles.form__label} htmlFor="displayName">Display Name</label>
        <Input
          type="text"
          id="displayName"
          value={localFormData.displayName}
          onChange={(e) => handleInputChange("displayName", e.target.value)}
          className={styles.form__input}
          required
        />
        {errors.displayName && <p className={styles.error}>{errors.displayName}</p>}
      </div>
      <div className={styles.form__group}>
        <label className={styles.form__label} htmlFor="email">Email</label>
        <Input
          type="email"
          id="email"
          value={localFormData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          className={styles.form__input}
          required
        />
        {errors.email && <p className={styles.error}>{errors.email}</p>}
      </div>
      <div className={styles.form__buttonsWrapper}>
        <Button label="Next" type="button" onClick={handleContinue} className={styles.form__button} />
      </div>
    </>
  )
}

export default StepEmail;