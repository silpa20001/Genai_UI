import React from 'react';
import Link from 'next/link';
import styles from './navbar.module.css'

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles['nav-menu']}>
        <li>
          <Link href="/">Meta</Link>
        </li>
        
      </ul>
      <div className={styles['user-icon']}>
        <Link href="/profile">
          <img src="/user-icon.svg" alt="User Icon" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
