"use client"

import { useState } from "react";
import styles from './SignUpForm.module.scss';
import EyeIcon from '../../../assets/icons/eye.svg';
import EyeSlashIcon from '../../../assets/icons/eye-slash.svg';

const SignUpForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted')

    if (password !== confirmPassword) {
      setError("passwords do not match");
      return;
    }
    console.log('a')
    try {
      const response = await fetch("http://localhost:8080/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email, password, confirmPassword })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Registration failed")
      }

      console.log('b')

      setSuccess("Registration successeful!");
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setSuccess(null);
      console.log("c")
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSignUp}>
      <div className={styles.form__group}>
        <label htmlFor="username" className={styles.form__label}>Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.form__input}
          required
          autoComplete="username"
        />
      </div>
      <div className={styles.form__group}>
        <label htmlFor="email" className={styles.form__label}>Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.form__input}
          required
        />
      </div>
      <div className={styles.form__group}>
        <label htmlFor="password" className={styles.form__label}>Password</label>
        <div className={styles.form__inputWrapper}>
          <input
            type={isPasswordVisible ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.form__input}
            required
            autoComplete="new-password"
          />
          {isPasswordVisible 
          ? <EyeIcon onClick={togglePasswordVisibility} className={styles.form__icon} />
          : <EyeSlashIcon onClick={togglePasswordVisibility} className={styles.form__icon} />}
        </div>
      </div>
      <div className={styles.form__group}>
        <label htmlFor="confirmPassword" className={styles.form__label}>Confirm Password</label>
        <div className={styles.form__inputWrapper}>
          <input
            type={isConfirmPasswordVisible ? "text" : "password"}
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={styles.form__input}
            required
            autoComplete="new-password"
          />
          {isConfirmPasswordVisible
          ? <EyeIcon onClick={toggleConfirmPasswordVisibility} className={styles.form__icon} />
          : <EyeSlashIcon onClick={toggleConfirmPasswordVisibility} className={styles.form__icon} />}
        </div>
      </div>
      <button type="submit" className={styles.form__button}>Sign Up</button>
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}
    </form>
  )
}

export default SignUpForm;