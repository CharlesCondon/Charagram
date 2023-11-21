import React, {useState, useEffect} from 'react'
import styles from './Signup.module.scss'
import Footer from '../Footer/Footer'
import db from '../../../db/firebase'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, setDoc, doc, getDoc } from "firebase/firestore/lite"; 

function Signup() {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	function checkInput(e, inputId) {
		switch (inputId) {
			case 0:
				if (!e.replace(/\s/g, '').length) {
					console.log('email cannot be empty')
					return false;
				}
				else if (!e.includes('@')) {
					console.log('email missing @ symbol');
				}
				else {
					return true;
				}
				break;
			case 1:
				if (e.replace(/\s/g, '').length < 4) {
					console.log('name must be at least 5 characters long')
					return false;
				}
				else {
					return true;
				}
			case 2:
				if (e.replace(/\s/g, '').length < 4) {
					console.log('username must be at least 5 characters long')
					return false;
				}
				else {
					return true;
				}
			
			case 3:
				if (e.replace(/\s/g, '').length < 6) {
					console.log('password must be at least 6 characters long')
					return false;
				}
				else {
					return true;
				}
			default:
				console.log('something went wrong')
				break;
			
		}
		
	}

	const auth = getAuth();
	const handleSubmit = (e) => {
		e.preventDefault();
		

		// checkInput(email, 0);
		// checkInput(name, 1);
		// checkInput(username, 2);
		// checkInput(password, 3);
		if (checkInput(email, 0) && checkInput(name, 1) && checkInput(username, 2) && checkInput(password, 3)) {
			async function checkUser() {
				const docRef = doc(db, "users", username);
				const docSnap = await getDoc(docRef);
				if (docSnap.exists()) {
					alert("Sorry that username already exists")
					console.log('user exists');
					setUsername("")
				}
				else {
					try {
						createUserWithEmailAndPassword(auth, email, password)
							.then((userCredential) => {
								const user = userCredential.user;
								console.log(user)
								async function docRef(db)  {
									const ref = collection(db, "users")
									await setDoc(doc(ref, username), {
										avatar: "",
										displayName: name,
										username: username,
										email: email,
										verified: false,
										password: password
									});
									setEmail('');
									setName('');
									setUsername('');
									setPassword('');
									window.location.href = "http://localhost:3000/home";
								}
								docRef(db);
							})
							.catch((error) => {
								const errorCode = error.code;
								const errorMessage = error.message;
								console.log(errorCode + " : " + errorMessage )
								alert('Sorry that email is in use, try a different one.')
							});
						
					} catch (e) {
						console.error("Error adding document: ", e);
					}
				}
			}
			checkUser();
		}
		else {
			console.log('error')
		}

		
	}

	return (
		<>
			<div className={styles.signupContainer}>
					<img src='./eye.webp' alt='logo'/>
					<h2>Sign up to start sharing positivity with your friends.</h2>
					<form>
						<label for='email'></label>
						<input id='email' onChange={(e) => setEmail(e.target.value)} value={email} className={styles.input} type='email' name='email' placeholder='Email'></input>
						<label for='name'></label>
						<input id='name' onChange={(e) => setName(e.target.value)} value={name} className={styles.input} type='text' name='name' placeholder='Display Name'></input>
						<label for='username'></label>
						<input id='user' onChange={(e) => setUsername(e.target.value)} value={username} className={styles.input} type='text' name='username' placeholder='Username'></input>
						<label for='password'></label>
						<input id='pass' onChange={(e) => setPassword(e.target.value)} value={password} className={styles.input} type='password' name='password' placeholder='Password'></input>
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