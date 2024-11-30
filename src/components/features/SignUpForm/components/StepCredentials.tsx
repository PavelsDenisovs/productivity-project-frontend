import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import React, { useState } from 'react';
import styles from '../SignUpForm.module.scss';
import EyeIcon from '../../../../assets/icons/eye.svg';
import EyeSlashIcon from '../../../../assets/icons/eye-slash.svg';
import { formData } from '../types';

interface StepCredentialsProps {
  formData: formData;
  updateFormData: (data: formData) => void;
  handleBack: () => void;
}

const StepCredentials: React.FC<StepCredentialsProps> = ({ formData, updateFormData, handleBack }) => {
  const [localFormData, setLocalFormData] = useState({
    username: '',
    password: '',
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setLocalFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <>
      <div className={styles.form__group}>
        <label className={styles.form__label} htmlFor="username">@Username</label>
        <Input
          type="text"
          id="username"
          value={formData.username}
          onChange={(e) => handleInputChange("username", e.target.value)}
          className={styles.form__input}
          required
        />
      </div>
      <div className={styles.form__group}>
        <label className={styles.form__label} htmlFor="password">Password</label>
        <div className={styles.form__inputWrapper}>
          <Input
            type={isPasswordVisible ? "text" : "password"}
            id="password"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            className={styles.form__input}
            required
          />
          {isPasswordVisible
            ? <EyeIcon onClick={togglePasswordVisibility} className={styles.form__icon} size={20} />
            : <EyeSlashIcon onClick={togglePasswordVisibility} className={styles.form__icon} size={20} />}
        </div>
      </div>
      <div className={styles.form__buttonsWrapper}>
        <Button
          label="Finish Registration"
          type="button" 
          onClick={handleBack}
        />
      </div>
    </>
  )
}

export default StepCredentials;