import React from 'react';
import styles from './MainNavBar.module.scss';
import Link from 'next/link';

const MainNavBar: React.FC = () => {
  const routes = ['messages', 'profile', 'posts'];

  return (
    <nav className={styles.nav}>
      <div className={styles.router}>
        {routes.map((route) => (
          <Link href={`/${route}`} className={styles.route} key={route}>
            {route}
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default MainNavBar;