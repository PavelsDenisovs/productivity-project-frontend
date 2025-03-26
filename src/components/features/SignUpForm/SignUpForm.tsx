"use client"

import { useState } from "react";
import styles from './SignUpForm.module.scss';
import { formData } from './types';
import Input from "@/components/ui/Input/Input";
import { useRouter } from "next/router";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
}

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const routes = useRouter();

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))

    if (errors[field]) {
      setErrors(prev => ({...prev, [field]: ''}));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.email.includes('@')) {
      newErrors.email = 'Valid email required';
    }
    
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be 8+ characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords must match';
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = () => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(`$`)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">email</label>
        <Input onChange={(e) => handleChange("email", e.target.value)} value={formData.email} />
      </div>
    </form>
  )
}

export default SignUpForm;