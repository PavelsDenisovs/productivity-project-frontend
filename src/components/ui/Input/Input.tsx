import React from 'react';
import styles from './Input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'success' | 'danger';
}

const Input: React.FC<InputProps> = ({ variant = '',...rest }) => {
  return (
    <input
      className={`${styles.input} ${styles[variant]}`}
      {...rest}
    />
  )
}

export default Input