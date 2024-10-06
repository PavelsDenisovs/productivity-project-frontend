import React from 'react';
import styles from './MainNavBar.module.scss';

const MainNavBar: React.FC = () => {
  const routes = ['messages', 'profile', 'posts'];

  return (
    <nav className={styles.nav}>
      {routes.map((route) => (
        <div className={styles.route} key='route'>{route}</div>
      ))}
    </nav>
  )
}

export default MainNavBar;