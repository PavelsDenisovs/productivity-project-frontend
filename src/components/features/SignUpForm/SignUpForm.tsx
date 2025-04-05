"use client"

import { useState } from "react";
import styles from './SignUpForm.module.scss';
import Input from "@/components/ui/Input/Input";
import Button from "@/components/ui/Button/Button";
import { useRouter } from "next/navigation";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

interface ApiResponse {
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
  const router = useRouter();
  
  const handleChange = (field: keyof FormData, value: string) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data: ApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      localStorage.setItem("unverifiedEmail", formData.email)
      router.push('/auth/verify-email');
    } catch(error) {
      setErrors({
        email: error instanceof Error ? error.message : 'Registration failed'
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">email</label>
        <Input
          type="email"
          id="email"
          value={formData.email} 
          onChange={(e) => handleChange("email", e.target.value)}
        />
        {errors.email && <p className={styles.error}>{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="password">password</label>
        <Input
          type="password"
          id="password"
          value={formData.password} 
          onChange={(e) => handleChange("password", e.target.value)}
        />
        {errors.password && <p className={styles.error}>{errors.password}</p>}
      </div>
      <div>
        <label htmlFor="confirmPassword">confirmPassword</label>
        <Input
          type="confirmPassword"
          id="confirmPassword"
          value={formData.confirmPassword} 
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
        />
        {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword}</p>}
      </div>

      <Button
        label={isSubmitting ? 'Signing Up...' : 'Sign Up'}
        type="submit" 
        disabled={isSubmitting}
        className={styles.submitButton}
      />
    </form>
  )
}

export default SignUpForm;