import React from 'react'
import { Link } from 'react-router-dom'
import styles from './header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.nav}>
          <li><Link to='/'>PaperID</Link></li>
          <li><Link to='/clientid'>ClientID</Link></li>
         </ul>
      </nav>
    </header>
  )
}

export default Header;