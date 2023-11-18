import React from 'react'
import styles from './Footer.module.scss'

function Footer() {
  return (
    <div className={styles.footerContainer}>
        <div className={styles.footerLinks}>
            <a href='./'>Home</a>
            <a href='./about'>About</a>
            <a href='./help'>Help</a>
        </div>
        <div>
            <span>@ 2023 Charagram by Charles</span>
        </div>
    </div>
  )
}

export default Footer