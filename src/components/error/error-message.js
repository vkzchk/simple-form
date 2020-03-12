import React from 'react'
import styles from './error.module.css'
import { Link } from 'react-router-dom'

const ErrorMessage = () => {

  return (
    <div className={styles.error}>
      <h2>Invalid token</h2>
      <span>Your token has expired.</span>
      <div className={styles.link}>
        <Link className={styles.button} to={'/auth'}>Get New Token</Link>
      </div>

    </div>
  )
}

export default ErrorMessage