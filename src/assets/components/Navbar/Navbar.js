import React from 'react'
import styles from './Navbar.module.scss'
import house from '../../images/home.png'
import bell from '../../images/bell.png'
import person from '../../images/user.png'
import post from '../../images/addition.png'
import NavbarOption from '../NavbarOption/NavbarOption'
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import db from '../../../db/firebase'

function Navbar() {
	let account = "";
 	const auth = getAuth();
	const user = auth.currentUser;
	if (user) {
		//console.log(user);
		account = user.displayName;
	} else {
		account = "guest";
		//console.log('anon');
	}

	return (
		<nav className={styles.bottomNav} role='navigation'>
			<NavbarOption active src={house} text="home"/>
			<NavbarOption src={bell} text="notifications"/>
			<NavbarOption src={post} text="post"/>
			<NavbarOption src={person} text={account}/>
		</nav>
	)
}

export default Navbar