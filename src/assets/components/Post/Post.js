import React, {useEffect, useState} from 'react'
import styles from './Post.module.scss'
import anon from '../../images/anon.png'
import heart from '../../images/heart.png'
import comment from '../../images/comment.png'
import eye from '../../images/eye.webp'
import { doc, updateDoc, increment } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";
import db from '../../../db/firebase'

function Post({displayName, username, avatar, verified, timestamp, text, id, likes}) {
    const [isAnon, setIsAnon] = useState(false);

    const handleComment = (e) => {
        alert("~ feature coming soon ~")
    }

    const handleLike = (e) => {
        if (isAnon) {
            alert("Sorry, only signed-in users can like posts");
        } else {
            let postId = e.target.parentElement.dataset.id
            updateLikes(db, postId);
        }
        
    }

    async function updateLikes(db, id) {
        console.log(db)
        const docRef = doc(db, "posts", id);
        console.log(docRef)
        await updateDoc(docRef, {
            likes: increment(1)
        });
    }

    // const auth = getAuth();
    // const user = auth.currentUser;

    // useEffect(() => {
    //     if (user && !user.isAnonymous) {
    //         setIsAnon(false);
    //     } else {
    //         setIsAnon(true);
    //     }
        
    // }, [user])

    return (
        <div className={`${styles.postContainer} animate__animated animate__bounceInUp`}>
            <div className={styles.postAvatar}>
                {avatar ? <img src={avatar} alt='avatar' /> : <img src={anon} alt='avatar' />}
            </div>
            <div className={styles.postBody}>
                <div className={styles.postHeader}>
                    <div className={styles.postHeaderText}>
                        <h3>
                            {displayName}{" "} {verified ? <img src={eye} alt='verified'/> : <></>} <span>@{username}</span><span> ~ {timestamp}</span>
                        </h3>
                    </div>
                    <div className={styles.postHeaderDescription}>
                        <p>{text}</p>
                    </div>
                </div>
                <div className={styles.postFooter}>
                    <button onClick={handleComment} data-id={`${id}`} className={styles.postFooterBtn}><img src={comment} alt='comment'></img></button>

                    <div className={styles.postFooterLikes}>
                        <button data-id={`${id}`} onClick={handleLike} className={styles.postFooterBtn}><img src={heart} alt='like'></img></button>
                        <span>{likes}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post