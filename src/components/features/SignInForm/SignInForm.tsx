"use client"

import Button from '@/components/ui/Button/Button';
import Input from '@/components/ui/Input/Input';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface FormData {
  email: string;
  password: string;
}

interface ApiResponse {
  message?: string;
  error?: string;
}

const SignInForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const router = useRouter();

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  }

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.email.includes('@')) {
      newErrors.email = 'Valid email required';
    }
    
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be 8+ characters';
    }
    setErrors(newErrors);
    return Object.keys(errors).length === 0;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data: ApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      router.push('/');
    } catch (error) {
      setErrors({
        email: error instanceof Error ? error.message : 'Registration failed'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <Input
          type="text"
          id="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          required
        />
        {errors.email && <p>{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <Input
          type="password"
          id="password"
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
          required
        />
        {errors.password && <p>{errors.password}</p>}
      </div>
      <Button
        label="Submit"
        type="submit"
      />
    </form>
  );
};

export default SignInForm;