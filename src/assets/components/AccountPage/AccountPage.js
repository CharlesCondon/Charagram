import React, {useState, useEffect} from 'react'
import styles from './AccountPage.module.scss'
import Navbar from '../Navbar/Navbar'
import anon from '../../images/anon.png';
import logo from '../../images/eye.webp';
import NavbarTop from '../NavbarTop/NavbarTop';
import { collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore/lite';
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import db from '../../../db/firebase'
import Post from '../Post/Post'

function AccountPage() {
    const [posts, setPosts] = useState([]);
    const [avi, setAvi] = useState("");
    const [displayName, setDisplay] = useState("");
    const [username, setUsername] = useState("");
    const [verified, setVerified] = useState(false);
    const [guest, setGuest] = useState(false);
    const auth = getAuth();


    async function getPosts(db, user) {
        const postCol = query(collection(db, 'posts'), where("username", "==", user));
        const postSnap = await getDocs(postCol);
        const postList = postSnap.docs.map(doc => doc.data());
        postList.sort((a,b) => b.timestamp.seconds - a.timestamp.seconds)
        setPosts(postList);
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            // user is a signed in
            if (user && !user.isAnonymous) {
                const uid = user.uid;
                
                async function checkUser() {
                    const docRef = doc(db, "users", user.displayName);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        let current = (docSnap.data());
                        if (current.avatar === "") {
                            setAvi(anon);
                        }
                        else {
                            setAvi(current.avatar);
                        }
                        setDisplay(current.displayName);
                        setVerified(current.verified);
                        setUsername(current.username);
                        getPosts(db, current.username);
                        
                    }
                }
                checkUser();
            } else {
                // user is a guest
                signInAnonymously(auth)
                .then(() => {
                    
                    setAvi(anon);
                    setDisplay("Guest");
                    setVerified(false);
                    setGuest(true);
                    setUsername("guest");
                    getPosts(db, "guest");
                    
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
        <div className={styles.accountPageContainer}>
            <NavbarTop />
            <div className={styles.accountPageHeader}>
                <img src={avi} alt='avatar' />
                <div className={styles.accountPageHeaderContent}>
                    <h1>@{username}</h1>
                    {!guest ? <button>Edit profile</button> : <></>}
                </div>
            </div>
            <div className={styles.accountPageBody}>
                <h1>{displayName} {verified ? <span><img src={logo} alt='verified'/></span> : <></>} </h1>
                <p>Test descriptionasdf ;alk sj ;aj ;asdf asd asd asdf asdfea df aef adsjf ;adksjf; aldsaj;sl ja;sdk lja;s j;alksdjf; lj</p>
            </div>
            <div className={styles.accountPagePosts}>
                <h2>Posts</h2>
                {posts.map((p) => {
                    let day = new Date(p.timestamp.seconds * 1000);
                    let currentDay = new Date();
                    let postTime = calcDate(day, currentDay);
                    return <Post displayName={p.displayName} username={p.username} avatar={p.avatar} verified={p.verified} text={p.text} timestamp={postTime} />
                })}
            </div>
            <Navbar/>
        </div>
    )
}

export default AccountPage