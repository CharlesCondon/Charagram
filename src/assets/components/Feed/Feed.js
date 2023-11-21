import React, {useState, useEffect} from 'react'
import { collection, getDocs } from 'firebase/firestore/lite';
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import styles from './Feed.module.scss'
import Post from '../Post/Post'
import PostBox from '../PostBox/PostBox'
import db from '../../../db/firebase'


function Feed() {
    const [posts, setPosts] = useState([]);
    const auth = getAuth();
    

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user.isAnonymous) {

              const uid = user.uid;
              console.log(user)
            } else {
                signInAnonymously(auth)
                .then(() => {
                    async function getPosts(db) {
                        const postCol = collection(db, 'posts');
                        const postSnap = await getDocs(postCol);
                        const postList = postSnap.docs.map(doc => doc.data());
                        setPosts(postList);
                    }
                    getPosts(db);
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
        <div className={styles.feedContainer}>
            <PostBox />
            {posts.map((p) => {
                let time = new Date(p.timestamp.seconds * 1000).getHours();
                let current = new Date().getHours();
                return <Post displayName={p.displayName} username={p.username} avatar={p.avatar} verified={p.verified} text={p.text} timestamp={current - time} />
            })}
        </div>
    )
}

export default Feed