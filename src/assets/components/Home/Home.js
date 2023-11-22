import React from 'react'
import styles from './Home.module.scss'
import Navbar from '../Navbar/Navbar'
import Feed from '../Feed/Feed'
import NavbarTop from '../NavbarTop/NavbarTop'

function Home() {
	return (
		<div className={styles.homeContainer}>
			<NavbarTop />
			<Feed />
			<Navbar/>
		</div>
		
	)
}

export default Home