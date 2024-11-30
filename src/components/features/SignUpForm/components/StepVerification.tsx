"use client"

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import React, { useState } from 'react';
import styles from '../SignUpForm.module.scss';

interface StepVerificationProps {
  handleNext: () => void;
  handleBack: () => void;
  email: string;
}

const apiUrl = process.env.REACT_APP_API_URL

const StepVerification: React.FC<StepVerificationProps> = ({ handleNext, handleBack, email }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleVerify = async () => {
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/user/verify-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          email: email,
          code: code,
        }).toString(),
      });

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Verification failed");
      }

      handleNext();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred");
    };
  };

  return (
    <>
      <div className={styles.form__group}>
        <label className={styles.form__label} htmlFor="code">Verification Code:</label>
        <Input 
          type="text"
          id="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className={styles.form__input}
          required
        />
        {error && <p className={styles.error}>{error}</p>}
      </div>
      <div className={styles.form__buttonsWrapper}>
        <Button label="Back" type="button" onClick={handleBack} />
        <Button label="Verify" type="button" onClick={handleVerify} />
      </div>
   </>  
  )
}

export default StepVerification;