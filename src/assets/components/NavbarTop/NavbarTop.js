import styles from './NavbarTop.module.scss'
import React, {useState} from 'react'
import { getAuth, signOut } from "firebase/auth";
import logo from '../../images/eye.webp'
import gear from '../../images/gear.png'
import close from '../../images/close.png'
import { Navigate } from 'react-router-dom';

function NavbarTop() {
    const [show, setShow] = useState(false);
	const [settingsImg, setSettingsImg] = useState(gear);
	const [loggedOut, setLoggedOut] = useState(false);

	const showSettings = () => {
		if (show) {
			setShow(false);
			setSettingsImg(gear);
		}
		else {
			setShow(true);
			setSettingsImg(close);
		}
		
	}

	const handleLogout = () => {
		const auth = getAuth();
		signOut(auth).then(() => {
			alert("Successfully signed out!");
			setLoggedOut(true);
		}).catch((error) => {
			alert("Oh no! An error occured with signout");
			console.log(error);
		});
	}
    return (
        <>		
            <nav className={styles.topNav}> 
                <a href='/'><img src={logo} alt='logo'/></a>
                <img onClick={showSettings} className={styles.settingsBtn} src={gear} alt='settings'/>
            </nav>
            {show ? 
                <div className={styles.settingsContainer}>
                    <div className={styles.settingsHeader}>
                        <h2>Settings</h2>
                        <img onClick={showSettings} className={`${styles.settingsBtn} ${styles.settingsBtnX}`} src={settingsImg} alt='settings'/>
                    </div>
                    <div className={styles.settingsBody}>
                        <button onClick={handleLogout}>Log Out</button>
                    </div>
                </div> 
                : <></>}
            {loggedOut ? <Navigate to="/" replace={true}/>: <></>}
		</>	
    )
}

export default NavbarTop