import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
}

const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'primary',
  ...rest
}) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      {...rest}
    >
      {label}
    </button>
  )
}

export default Button