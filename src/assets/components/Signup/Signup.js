import React from 'react'
import styles from './Signup.module.scss'
import Footer from '../Footer/Footer'

function Signup() {
	return (
		<>
			<div className={styles.signupContainer}>
					<img src='./eye.webp' alt='logo'/>
					<h2>Sign up to start sharing positivity with your friends.</h2>
					<form action=''>
							<label for='email'></label>
							<input className={styles.input} type='text' name='email' placeholder='Email'></input>
							<label for='name'></label>
							<input className={styles.input} type='text' name='name' placeholder='Full Name'></input>
							<label for='username'></label>
							<input className={styles.input} type='text' name='username' placeholder='Username'></input>
							<label for='password'></label>
							<input className={styles.input} type='password' name='password' placeholder='Password'></input>
							<div className={styles.submitBtn}>
									<input type="submit" value="Sign Up"/>
							</div>
					</form>
					<div>
							<span>Have an account? <a href='./login'>Log In</a></span>
					</div>
			</div>
			<Footer/>
		</>
	)
}

export default Signup