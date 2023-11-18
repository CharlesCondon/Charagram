import React, { useEffect, useState } from 'react'
import styles from './Home.module.scss'

function Home() {
    const [token, setToken] = useState(false);

    useEffect(() => {
        let token = window.localStorage.getItem("token");
        console.log(token);
        if(token) {
            setToken(true);
        }
    }, []);

    return (
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
        
                <a className={styles.signinBtn} href='/guest'>Continue as Guest</a>
            </div>
           
        </div>
    )
}

export default Home