import React, {useState, useEffect} from 'react'
import { collection, getDocs, doc, getDoc } from 'firebase/firestore/lite';
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import db from '../../../db/firebase'
import styles from './Home.module.scss'
import Navbar from '../Navbar/Navbar'
import Feed from '../Feed/Feed'
import NavbarTop from '../NavbarTop/NavbarTop'

function Home() {
	const [posts, setPosts] = useState([]);
    const [currentAvi, setCurrentAvi] = useState("");
    const [currentDName, setCurrentDName] = useState("");
    const [currentUserN, setCurrentUserN] = useState("");
    const [currentVerified, setCurrentVerified] = useState(false);
    const auth = getAuth();

	async function getPosts(db) {
        const postCol = collection(db, 'posts');
        const postSnap = await getDocs(postCol);
        const postList = postSnap.docs.map(doc => doc.data());
        postList.sort((a,b) => b.timestamp.seconds - a.timestamp.seconds)
        setPosts(postList);
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            // user is a signed in
            if (user && !user.isAnonymous) {
                const uid = user.uid;
                getPosts(db);
                async function checkUser() {
                    const docRef = doc(db, "users", user.displayName);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        let current = (docSnap.data());
                        setCurrentAvi(current.avatar);
                        setCurrentDName(current.displayName);
                        setCurrentUserN(current.username);
                        setCurrentVerified(current.verified);
                    }
                }
                checkUser();
            } else {
                // user is a guest
                signInAnonymously(auth)
                .then(() => {
                    getPosts(db);
                    setCurrentAvi("");
                    setCurrentDName("Guest");
                    setCurrentUserN("guest");
                    setCurrentVerified(false);
                    console.log('user is a guest')
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode + "error: " + errorMessage);
                });
            }
        });
        
        
    }, [auth]);

	return (
		<div className={styles.homeContainer}>
			<NavbarTop />
			<Feed avatar={currentAvi} displayName={currentDName} username={currentUserN} verified={currentVerified} posts={posts} />
			<Navbar/>
		</div>
		
	)
}

export default Home