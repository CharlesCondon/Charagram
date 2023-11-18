import React from 'react'
import styles from './Login.module.scss'
import Footer from '../Footer/Footer'

function Login() {
	return (
		<>
		<div className={styles.signupContainer}>
			<img src='./eye.webp' alt='logo'/>
			<h1>Charagram</h1>
			<form action=''>
				<label for='username'></label>
				<input className={styles.input} type='text' name='username' placeholder='Username'></input>
				<label for='password'></label>
				<input className={styles.input} type='password' name='password' placeholder='Password'></input>
				<div className={styles.submitBtn}>
					<input type="submit" value="Log in"/>
				</div>
			</form>
			<div>
				<span>Don't have an account? <a href='./signup'>Sign up</a></span>
			</div>
		</div>
		<Footer/>
		</>
	)
}

export default Login