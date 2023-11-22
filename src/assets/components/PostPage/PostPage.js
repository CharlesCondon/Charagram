import React, {useState, useEffect} from 'react'
import {Navigate} from 'react-router-dom'
import styles from './PostPage.module.scss'
import db from '../../../db/firebase'
import { collection, addDoc, doc, getDoc } from "firebase/firestore/lite"
import back from '../../images/back.png'
import { getAuth } from "firebase/auth";
import anon from '../../images/anon.png'

function PostPage() {
    const [text, setText] = useState("");
    const [postSuccess, setPostSuccess] = useState(false);
    const [avi, setAvi] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [username, setUsername] = useState("");
    const [verified, setVerified] = useState(false);

    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
        if (user && !user.isAnonymous) {
            console.log(user);
            async function checkUser() {
                const docRef = doc(db, "users", user.displayName);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    let current = (docSnap.data());
                    console.log(current)
                    if (current.avatar === "") {
                        setAvi(anon);
                    } else {
                        setAvi(current.avatar);
                    }
                    setDisplayName(current.displayName);
                    setUsername(current.username);
                    setVerified(current.verified);
                }
            }
            checkUser();
        } else {
            setAvi(anon);
            setDisplayName("Guest");
            setUsername("guest");
            setVerified(false);
            console.log('anon');
        }
        
    }, [user])

    const sendPost = (e) => {
        e.preventDefault();
        if (!text.replace(/\s/g, '').length) {
            setText("");
            return;
        }
        try {
            async function docRef(db)  {
                await addDoc(collection(db,"posts"), {
                    avatar: avi,
                    displayName: displayName,
                    username: username,
                    text: text,
                    timestamp: new Date(),
                    verified: verified
                })
            }
            docRef(db);
            setPostSuccess(true)
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        setText("");
    }
    return (
        <div className={styles.postPageContainer}>
            {postSuccess ? <Navigate to='/home' replace={true} /> : <></>}
            <div className={styles.postPageHeader}>
                <a href='/home'><img src={back} alt='back' /></a>
                <h2>{username}</h2>
                <input onClick={sendPost} type='submit' value="Post"></input>
            </div>
            <div className={styles.postPageBody}>
                <img src={avi} alt='' />
                <textarea placeholder="What's Happening?" type='text' maxLength="280" onChange={(e) => setText(e.target.value)} value={text}></textarea>
            </div>
        </div>
    )
}

export default PostPage