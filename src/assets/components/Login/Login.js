import React, {useState} from 'react'
import styles from './Login.module.scss'
import Footer from '../Footer/Footer'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Navigate } from 'react-router-dom'

function Login() {
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [user, setUser] = useState(false);


	const handleSubmit = (e) => {
		e.preventDefault();

		const auth = getAuth();
		signInWithEmailAndPassword(auth, email, pass)
		.then((userCredential) => {
			//const user = userCredential.user;
			setUser(true);
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(errorCode + " : " + errorMessage);
			alert("incorrect username or password");
		});
	}
	return (
		<>
		 	{user ? <Navigate to="/home" replace={true} /> 
            :<></> }
			<div className={styles.signupContainer}>
				<img src='./eye.webp' alt='logo'/>
				<h1>Charagram</h1>
				<form action='' id='login'>
					<label for='email'></label>
					<input onChange={(e) => setEmail(e.target.value)} value={email} className={styles.input} type='email' name='email' placeholder='Email'></input>
					<label for='password'></label>
					<input onChange={(e) => setPass(e.target.value)} value={pass} className={styles.input} type='password' name='password' placeholder='Password'></input>
					<div className={styles.submitBtn}>
						<input onClick={handleSubmit} type="submit" value="Log in"/>
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