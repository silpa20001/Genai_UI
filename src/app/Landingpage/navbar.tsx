import React from 'react';
import Link from 'next/link';
import styles from './navbar.module.css'
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';

const Navbar = () => {
  return (
    <nav className={styles.navbar}> 
      <ul className='mb-0 pl-0'>
        <li>
          <Link href="/">
            <img src="/metalogo.svg" alt="User Icon" style={{width: "100px"}} />
          </Link>
        </li>

      </ul>
      <div className={styles['user-icon']}>
        {/* <Link href="/profile" > */}
        <Avatar alt="Remy Sharp" src="/avatar.webp" />
        {/* </Link> */}
      </div>
    </nav>
  );
};

export default Navbar;
