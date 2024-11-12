import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
}

const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'primary',
  className = '',
  ...rest
}) => {
  const combinedClassName = `${styles.button} ${styles[variant]} ${className}`

  return (
    <button className={combinedClassName} {...rest} >
      {label}
    </button>
  )
}

export default Button