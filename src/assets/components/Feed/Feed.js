import React, {useState, useEffect} from 'react'
import { collection, getDocs, doc, getDoc } from 'firebase/firestore/lite';
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import styles from './Feed.module.scss'
import Post from '../Post/Post'
import PostBox from '../PostBox/PostBox'
import db from '../../../db/firebase'


function Feed() {
    const [posts, setPosts] = useState([]);
    const [currentAvi, setCurrentAvi] = useState("");
    const [currentDName, setCurrentDName] = useState("");
    const [currentUserN, setCurrentUserN] = useState("");
    const [currentVerified, setCurrentVerified] = useState(false);
    const auth = getAuth();
    

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user.isAnonymous) {
                //console.log(user)
                const uid = user.uid;
                async function getPosts(db) {
                    const postCol = collection(db, 'posts');
                    const postSnap = await getDocs(postCol);
                    const postList = postSnap.docs.map(doc => doc.data());
                    postList.sort((a,b) => b.timestamp.seconds - a.timestamp.seconds)
                    setPosts(postList);
                }
                getPosts(db);

                async function checkUser() {
                    const docRef = doc(db, "users", user.displayName);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        let current = (docSnap.data());
                        //console.log(current.displayName)
                        setCurrentAvi(current.avatar);
                        setCurrentDName(current.displayName);
                        setCurrentUserN(current.username);
                        setCurrentVerified(current.verified);
                    }
                }
                checkUser();
            } else {
                signInAnonymously(auth)
                .then(() => {
                    async function getPosts(db) {
                        const postCol = collection(db, 'posts');
                        const postSnap = await getDocs(postCol);
                        const postList = postSnap.docs.map(doc => doc.data());
                        postList.sort((a,b) => b.timestamp.seconds - a.timestamp.seconds)
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

    function calcDate(original, current) {
        const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
        let ogDay = original.getDate();
        let today = current.getDate();

        // posted on a past day
        if (ogDay < today) {
            let m = months[original.getMonth()]
            let str = m + " " + ogDay;
            return str;
        }
        // posted today
        else {
            let t1 = original.getHours();
            let t2 = current.getHours();
            let str = ""
            if (t2-t1 === 0) {
                str = "1h"
            }
            else {
                str = (t2-t1) + "h"
                
            }
            return str;
        }
    }

    return (
        <div className={styles.feedContainer}>
            <PostBox avi={currentAvi} dName={currentDName} username={currentUserN} verified={currentVerified}/>
            {posts.map((p) => {
                let day = new Date(p.timestamp.seconds * 1000);
                let currentDay = new Date();
                let postTime = calcDate(day, currentDay);
                return <Post displayName={p.displayName} username={p.username} avatar={p.avatar} verified={p.verified} text={p.text} timestamp={postTime} />
            })}
        </div>
    )
}

export default Feed