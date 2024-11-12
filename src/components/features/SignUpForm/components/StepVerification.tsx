"use client"

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import React, { useState } from 'react';
import styles from '../SignUpForm.module.scss';

interface StepVerificationProps {
  handleNext: () => void;
  handleBack: () => void;
}

const StepVerification: React.FC<StepVerificationProps> = ({ handleNext, handleBack }) => {
  const [code, setCode] = useState('');

  const handleVerify = () => {
    if (code === '123456') {
      handleNext();
    } else {
      alert("Invalid verification code");
    }
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
      </div>
      <div className={styles.form__buttonsWrapper}>
        <Button label="Back" type="button" onClick={handleBack} />
        <Button label="Verify" type="button" onClick={handleVerify} />
      </div>
   </>  
  )
}

export default StepVerification;