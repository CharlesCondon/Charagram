import React from 'react'
import styles from './Home.module.scss'
import house from '../../images/home.png'
import bell from '../../images/bell.png'
import user from '../../images/user.png'

function Home() {
  return (
    <>
        <div className={styles.homeContainer}>

        </div>
        <nav role='navigation'>
            <a href='/home'><img src={house} alt='home'/></a>
            <a href='/home'><img src={bell} alt='notifications'/></a>
            <a href='/home'><img src={user} alt='user'/></a>
        </nav>
    </>
    
  )
}

export default Home