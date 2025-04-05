"use client"

import Button from "@/components/ui/Button/Button";
import Input from "@/components/ui/Input/Input";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ApiResponse {
  message?: string;
  error?: string;
}

const VerifyEmailForm: React.FC = () => {
  const [code, setCode] = useState("");
  const email = localStorage.getItem("unverifiedEmail");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email === undefined || "") {
      console.error("No email")
      return
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email,
          code: code
        }),
      });

      const data: ApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      router.push('/');
    } catch(error) {
      console.error(error ? error : "verification failed")
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="code">Code</label>
          <Input 
            value={code}
            onChange={e => setCode(e.target.value)}
          />
        </div>
        <Button 
          type="submit"
          label="Submit"
        />
      </form>
    </>
  );
}

export default VerifyEmailForm;