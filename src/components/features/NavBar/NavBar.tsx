"use client"

import Button from "@/components/ui/Button/Button"
import Link from "next/link"
import styles from "./NavBar.module.scss"

interface apiResponse {
  email?: string;
  error?: string;
}

interface NavBarProps {
  email?: string;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ email, isSidebarOpen, toggleSidebar }) => {
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

      window.location.reload();
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <nav className={styles.nav}>
      <button className={styles.toggleBtn} onClick={toggleSidebar}>
        {isSidebarOpen ? "← Close" : "☰ Menu"}
      </button>

      {email ? (
        <Button onClick={handleLogout} label="Logout"/>
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