import React, {useState} from 'react'
import styles from './PostBox.module.scss'
import anon from '../../images/anon.png'
import db from '../../../db/firebase'
import { collection, addDoc } from "firebase/firestore/lite"; 

function PostBox({avi, dName, username, verified}) {
    const [text, setText] = useState("");
    if (!avi) {
        avi = anon
    }
    //console.log({dName})

    const sendPost = (e) => {
        e.preventDefault();
        if (!text.replace(/\s/g, '').length) {
            setText("")
            return;
        }
        try {
            async function docRef(db)  {
                await addDoc(collection(db,"posts"), {
                    avatar: avi,
                    displayName: `${dName}`,
                    username: `${username}`,
                    text: text,
                    timestamp: new Date(),
                    verified: verified
                })
            }
            docRef(db);
            console.log('post made')
            //window.location.reload(false);
            setText("");
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        
    }

    return (
        <div className={styles.postBoxContainer}>
            
            <img src={avi} alt='avatar' />
            <form className={styles.postBoxBody}>
                <textarea placeholder="What's Happening?" type='text' maxLength="280" onChange={(e) => setText(e.target.value)} value={text}></textarea>
                <div></div>
                <input onClick={sendPost} type='submit' value="Post"></input>
            </form>            
        </div>
    )
}

export default PostBox