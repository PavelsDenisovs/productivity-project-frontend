"use client"

import Button from "@/components/ui/Button/Button"
import Link from "next/link"
import styles from "./NavBar.module.scss"

const NavBar: React.FC = () => {
  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
  }
  return (
    <nav className={styles.nav}>
      <Link href="/auth/signin">
        <Button label="Sign in" /> 
      </Link>
      <Link href="/auth/signup">
        <Button label="Sign up" /> 
      </Link>
      <Link href="/auth/verify-email">
        <Button label="Verify email" /> 
      </Link>
      <Button onClick={handleLogout} label="Logout" /> 
    </nav>
  )
}

export default NavBar