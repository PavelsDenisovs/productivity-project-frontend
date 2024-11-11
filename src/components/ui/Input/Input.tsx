import React from 'react';
import styles from './Input.module.scss';

interface InputProps {
  type?: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  variant?: 'success' | 'danger';
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  value,
  placeholder,
  onChange,
  disabled = false,
  variant = '',
}) => {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className={`${styles.input} ${styles[variant]}`}
      disabled={disabled}
    />
  )
}

export default Input