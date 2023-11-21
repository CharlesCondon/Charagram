import React, {useState, useEffect} from 'react'
import styles from './Signup.module.scss'
import Footer from '../Footer/Footer'
import db from '../../../db/firebase'
import { collection, addDoc, doc, getDoc } from "firebase/firestore/lite"; 

function Signup() {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		

		async function checkUser() {
			const docRef = doc(db, "users", username);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				console.log('user exists');
				setUsername("")
			}
			else {
				try {
					async function docRef(db)  {
						await addDoc(collection(db,"users"), {
							avatar: "",
							displayName: name,
							username: username,
							email: email,
							verified: false,
							password: password
						})
					}
					docRef(db);
				} catch (e) {
					console.error("Error adding document: ", e);
				}
			}
		}
		checkUser();
	}

	return (
		<>
			<div className={styles.signupContainer}>
					<img src='./eye.webp' alt='logo'/>
					<h2>Sign up to start sharing positivity with your friends.</h2>
					<form>
							<label for='email'></label>
							<input onChange={(e) => setEmail(e.target.value)} value={email} className={styles.input} type='email' name='email' placeholder='Email'></input>
							<label for='name'></label>
							<input onChange={(e) => setName(e.target.value)} value={name} className={styles.input} type='text' name='name' placeholder='Display Name'></input>
							<label for='username'></label>
							<input onChange={(e) => setUsername(e.target.value)} value={username} className={styles.input} type='text' name='username' placeholder='Username'></input>
							<label for='password'></label>
							<input onChange={(e) => setPassword(e.target.value)} value={password} className={styles.input} type='password' name='password' placeholder='Password'></input>
							<div className={styles.submitBtn}>
								<input onClick={handleSubmit} type="submit" value="Sign Up"/>
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