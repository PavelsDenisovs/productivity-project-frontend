"use client"

import Button from "@/components/ui/Button/Button"
import Link from "next/link"
import styles from "./NavBar.module.scss"
import { useEffect, useState } from "react"

interface apiResponse {
  email?: string;
  error?: string;
}

const NavBar: React.FC = () => {
  const [email, setEmail] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/current-user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        })

        const data: apiResponse = await response.json();

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}` || "Fetching current user failed")
        }

        setEmail(data.email);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }

    fetchCurrentUser();
  }, [])
  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })

      const data: apiResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failing logout")
      }

      setEmail(undefined);
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <nav className={styles.nav}>
      {email ? (
        <>
          <p>{`you're signed in: ${email}`}</p>
          <Button onClick={handleLogout} label="Logout"/>
        </>
      ) : (
        <>
          <Link href="/auth/signin">
            <Button label="Sign in" /> 
          </Link>
          <Link href="/auth/signup">
            <Button label="Sign up" /> 
          </Link>
          <Link href="/auth/verify-email">
            <Button label="Verify email" /> 
          </Link>
        </>)}
    </nav>
  )
}

export default NavBar