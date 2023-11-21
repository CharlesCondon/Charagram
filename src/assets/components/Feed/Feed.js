import React, {useState, useEffect} from 'react'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth, signInAnonymously } from "firebase/auth";
import styles from './Feed.module.scss'
import Post from '../Post/Post'
import PostBox from '../PostBox/PostBox'
import db from '../../../db/firebase'


function Feed() {
    const [posts, setPosts] = useState([]);
    const auth = getAuth();
    

    useEffect(() => {
        signInAnonymously(auth)
            .then(() => {
                async function getPosts(db) {
                    const postCol = collection(db, 'posts');
                    const postSnap = await getDocs(postCol);
                    const postList = postSnap.docs.map(doc => doc.data());
                    setPosts(postList);
                }
                getPosts(db);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
        });
        
    }, []);

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