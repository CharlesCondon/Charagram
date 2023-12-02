import React, {useState} from 'react'
import styles from './PostBox.module.scss'
import anon from '../../images/anon.png'
import db from '../../../db/firebase'
import { collection, addDoc } from "firebase/firestore/lite"; 
import axios from 'axios';
// import {NaturalLanguageUnderstandingV1} from 'ibm-watson/natural-language-understanding/v1';
// import { IamAuthenticator } from 'ibm-watson/auth';
// import { IamAuthenticator } from 'ibm-watson/auth';

function PostBox({avi, dName, username, verified}) {
    const [text, setText] = useState("");
    const [textEval, setTextEval] = useState("negative");
    if (!avi) {
        avi = anon
    }
    
    function handleText(str) {
        if (!str.toLowerCase().includes("charles")) {
            alert('Oh No! looks like you\'re not posting something about Charles. Try again with Charles in mind.')
            return false
        }
        else {
            return true;
        }
        
    }

    const sendPost = (e) => {
        e.preventDefault();
        if (!text.replace(/\s/g, '').length) {
            setText("")
            return;
        }
        if (!handleText(text)) {
            setText("");
            return;
        }
        else {
            // axios({
            //     method: 'post',
            //     baseURL: "https://13.58.222.53:5000",
            //     data: {text},
            //     headers: {
            //         'Content-Type': 'text/plain;charset=utf-8'
            //     }
            // })
            axios.post("https://3.129.36.10:5000", {text})
            .then((res) => {
                setTextEval(res.data)
                if (textEval === "negative") {
                    alert("Oh no looks like your post isn't postive")
                }
                else if (textEval === "neutral") {
                    alert("Oh no, it seems your post isn't positive enough to pass")
                }
                else {
                    alert("YAY")
                    // try {
                    //     async function docRef(db)  {
                    //         await addDoc(collection(db,"posts"), {
                    //             avatar: avi,
                    //             displayName: `${dName}`,
                    //             username: `${username}`,
                    //             text: text,
                    //             timestamp: new Date(),
                    //             verified: verified
                    //         })
                    //     }
                    //     docRef(db);
                    //     console.log('post made')
                    //     //window.location.reload(false);
                    //     setText("");
                    // } catch (e) {
                    //     console.error("Error adding document: ", e);
                    // }
                }
            })
            .catch((error) => {
                console.log(error)
            })
            
        }
    }

    return (
        <div className={styles.postBoxContainer}>
            
            <img src={avi} alt='avatar' />
            <form className={styles.postBoxBody} id='post'>
                <textarea placeholder="What's Happening?" type='text' maxLength="280" onChange={(e) => setText(e.target.value)} value={text}></textarea>
                <div></div>
                <input onClick={sendPost} type='submit' value="Post"></input>
            </form>            
        </div>
    )
}

export default PostBox