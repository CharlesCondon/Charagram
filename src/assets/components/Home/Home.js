import React from 'react'
import styles from './Home.module.scss'
import house from '../../images/home.png'
import bell from '../../images/bell.png'
import user from '../../images/user.png'
import logo from '../../images/eye.webp'
import gear from '../../images/gear.png'

function Home() {
  return (
    <>
        <nav className={styles.topNav}> 
            <img src={logo} alt='logo'/>
            <a href='/home'><img src={gear} alt='settings'/></a>
        </nav>
        <div className={styles.homeContainer}>
            <h2>Under Construction :P</h2>
        </div>
        <nav className={styles.bottomNav} role='navigation'>
            <a href='/home'><img src={house} alt='home'/></a>
            <a href='/home'><img src={bell} alt='notifications'/></a>
            <a href='/home'><img src={user} alt='user'/></a>
        </nav>
    </>
    
  )
}

export default Home