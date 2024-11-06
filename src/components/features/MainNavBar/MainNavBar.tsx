import React from 'react';
import styles from './MainNavBar.module.scss';
import Link from 'next/link';

const MainNavBar: React.FC = () => {
  const routes = ['messages', 'profile', 'posts', 'people', 'communities', 'settings', 'notifications'];

  return (
    <nav className={styles.nav}>
      <div className={styles.router}>
        {routes.map((route) => (
          <Link href={`/${route}`} className={styles.route} key={route}>
            {route}
          </Link>
        ))}
      </div>
      <div className={styles.router}>
        <Link href="/auth/signin" className={styles.route}>
          Sign In
        </Link>
        <Link href="/auth/signup" className={styles.route}>
          Sign Up
        </Link>
      </div>
    </nav>
  )
}

export default MainNavBar;