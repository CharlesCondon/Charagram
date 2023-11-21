import React, {useState} from 'react'
import {Navigate} from 'react-router-dom'
import styles from './PostPage.module.scss'
import db from '../../../db/firebase'
import { collection, addDoc } from "firebase/firestore/lite"
import back from '../../images/back.png'

function PostPage() {
    const [text, setText] = useState("");
    const [postSuccess, setPostSuccess] = useState(false)

    const sendPost = (e) => {
        e.preventDefault();
        try {
            async function docRef(db)  {
                await addDoc(collection(db,"posts"), {
                    avatar: "https://media.giphy.com/avatars/charlescon/EtvekJKzkGUC.JPG",
                    displayName: "Charles",
                    username: "char",
                    text: text,
                    timestamp: new Date(),
                    verified: true
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
                <input onClick={sendPost} type='submit' value="Post"></input>
            </div>
            <div className={styles.postPageBody}>
                <img src='https://media.giphy.com/avatars/charlescon/EtvekJKzkGUC.JPG' alt='' />
                <textarea placeholder="What's Happening?" type='text' maxLength="280" onChange={(e) => setText(e.target.value)} value={text}></textarea>
            </div>
        </div>
    )
}

export default PostPage