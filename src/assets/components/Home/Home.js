import React from 'react'
import styles from './Home.module.scss'
import logo from '../../images/eye.webp'
import gear from '../../images/gear.png'
import Navbar from '../Navbar/Navbar'
import Feed from '../Feed/Feed'

function Home() {
  return (
    <div className={styles.homeContainer}>
        <nav className={styles.topNav}> 
            <a href='/'><img src={logo} alt='logo'/></a>
            <a href='/home'><img src={gear} alt='settings'/></a>
        </nav>
        
        <Feed />
       
        <Navbar/>
    </div>
    
  )
}

export default Home