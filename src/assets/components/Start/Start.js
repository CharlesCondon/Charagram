import React, { useEffect, useState } from 'react'
import styles from './Start.module.scss'
import Footer from '../Footer/Footer'
import { Navigate } from 'react-router-dom'
import { getAuth, signOut } from "firebase/auth";

function Start() {
    const [token, setToken] = useState(false);
    const [loggedOut, setLoggedOut] = useState(false);

    useEffect(() => {
        let token = window.localStorage.getItem("token");
        //console.log(token);
        if(token !== "guest" && token !== null) {
            console.log('setting new token');
            setToken(true);
        }
    }, []);

    const setGuest = (e) => {
        e.preventDefault();
        const auth = getAuth();
        console.log(auth)
		signOut(auth).then(() => {
			setLoggedOut(true);
		}).catch((error) => {
			alert("Oh no! An error occured with signout");
			console.log(error);
		});
        const guestToken = 'guest';
        window.localStorage.setItem("token", guestToken);
        setToken(guestToken)
    }

    return (
        <>
            {token ? <Navigate to="/home" replace={true} /> 
            :<> 
            <div className={styles.loginContainer}>
                <div className={styles.imageContainer}>
                    <img className={styles.headerImg} src='./eye.webp' alt='logo'/>
                </div>
                
                <div className={styles.loginContent}>    
                    <h1>A Place for Positivity</h1>
                    <p>( for Charles )</p>
                    <h2>Join Today</h2>
                    
                    <a className={styles.signinBtn} href='/login'>Sign In</a>
                    <a className={styles.signinBtn} href='/signup'>Create Account</a>

                    <div className={styles.separatorContainer}>
                        <div>
                            <div></div>
                        </div>
                        <span>or</span>
                        <div>
                            <div></div>
                        </div>
                    </div>
            
                    <a className={styles.signinBtn} onClick={setGuest} href='/home'>Continue as Guest</a>
                </div>
            </div>
            <Footer/>
            </>
            }
            
        </>
    )
}

export default Start