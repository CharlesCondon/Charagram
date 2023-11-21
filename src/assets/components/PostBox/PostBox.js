import React, {useState} from 'react'
import styles from './PostBox.module.scss'
import anon from '../../images/anon.png'
import db from '../../../db/firebase'
import { collection, addDoc } from "firebase/firestore/lite"; 

function PostBox() {
    const [text, setText] = useState("");

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
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        setText("");
    }

    return (
        <div className={styles.postBoxContainer}>
            <img src={anon} alt='avatar' />
            <form className={styles.postBoxBody}>
                <textarea placeholder="What's Happening?" type='text' maxLength="280" onChange={(e) => setText(e.target.value)} value={text}></textarea>
                <div></div>
                <input onClick={sendPost} type='submit' value="Post"></input>
            </form>            
        </div>
    )
}

export default PostBox