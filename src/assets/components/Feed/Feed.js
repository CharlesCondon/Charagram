import React, {useState, useEffect} from 'react'
import { collection, getDocs, doc, getDoc } from 'firebase/firestore/lite';
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import styles from './Feed.module.scss'
import Post from '../Post/Post'
import PostBox from '../PostBox/PostBox'
import db from '../../../db/firebase'


function Feed({avatar, displayName, username, verified, posts}) {

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
            let str = "";
            if (t2-t1 === 0) {
                str = "1h";
            }
            else {
                str = (t2-t1) + "h";
            }
            return str;
        }
    }

    return (
        <div className={styles.feedContainer}>
            <PostBox avi={avatar} dName={displayName} username={username} verified={verified}/>
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