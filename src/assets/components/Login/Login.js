import React from 'react'
import styles from './Login.module.scss'

function Login() {
  return (
    <div className={styles.signupContainer}>
        <img src='./eye.webp' alt='logo'/>
        <form action=''>
            <label for='username'></label>
            <input className={styles.input} type='text' name='username' placeholder='Username'></input>
            <label for='password'></label>
            <input className={styles.input} type='password' name='password' placeholder='Password'></input>
            <input className={styles.submitBtn} type="submit" value="Log in"/>
        </form>
        <div>
            <span>Don't have an account? <a href='./signup'>Sign up</a></span>
        </div>
    </div>
  )
}

export default Login