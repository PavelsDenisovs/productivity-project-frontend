"use client"

import { useState } from "react";
import styles from './SignUpForm.module.scss';
import ProgressBar from "./components/ProgressBar";
import StepEmail from "./components/StepEmail";
import StepVerification from "./components/StepVerification";
import StepCredentials from "./components/StepCredentials";

const SignUpForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    displayName: '',
    username: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Registration failed")
      }

      setSuccess("Registration successeful!");
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setSuccess(null);
    }
  }

  const handleNext = () => setStep((prevStep) => (prevStep + 1));
  const handleBack = () => setStep((prevStep) => (prevStep - 1));

  const updateFormData = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}

      <ProgressBar step={step} totalSteps={3} />

      {step === 1 && (
        <StepEmail 
          formData={formData}
          updateFormData={updateFormData}
          handleNext={handleNext}
        />
      )}
      {step === 2 && (
        <StepVerification 
          handleNext={handleNext}
          handleBack={handleBack}
        />
      )}
      {step === 3 && (
        <StepCredentials 
          formData={formData}
          updateFormData={updateFormData}
          handleBack={handleBack}
        />
      )}
    </form>
  )
}

export default SignUpForm;