import React from 'react'
import styles from './Notifications.module.scss'
import NavbarTop from '../NavbarTop/NavbarTop'
import Navbar from '../Navbar/Navbar'

function NotificationsPage() {
  return (
    <div className={styles.navPageContainer}>
        <NavbarTop />
        <div className={styles.navPageBody}>
            <h1>Page Coming Soon</h1>
        </div>
        <Navbar />
    </div>
  )
}

export default NotificationsPage