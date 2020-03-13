import React from 'react'

import styles from './home.module.css'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className={styles.home}>
      <div className={styles.buttonLink}>
        <Link to='/auth'>Get Access Token</Link>
      </div>
      <div className={styles.text}>
        <span>If you're not authorized</span><br />
        <span>- or -</span><br />
        <span>Get Data By:</span>
      </div>
      <div>
        <div className={styles.buttonLink}>
          <Link to='/paperid'>Paper ID</Link>
        </div>
        <div className={styles.buttonLink}>
          <Link to='/clientid'>Client ID</Link>
        </div>
      </div>
    </div>
  )
}

export default Home