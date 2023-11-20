import React from 'react'
import styles from './Navbar.module.scss'
import house from '../../images/home.png'
import bell from '../../images/bell.png'
import user from '../../images/user.png'
import post from '../../images/addition.png'
import NavbarOption from '../NavbarOption/NavbarOption'

function Navbar() {
  return (
    <nav className={styles.bottomNav} role='navigation'>
        <NavbarOption active src={house} text="home"/>
        <NavbarOption src={bell} text="notifications"/>
        <NavbarOption src={post} text="post"/>
        <NavbarOption src={user} text="account"/>
            {/* <a href='/home'><img src={house} alt='home'/></a>
            <a href='/home'><img src={bell} alt='notifications'/></a>
            <a href='/home'><img src={user} alt='user'/></a> */}
    </nav>
  )
}

export default Navbar