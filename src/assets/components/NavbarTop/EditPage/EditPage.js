import React, {useState} from 'react'
import styles from './EditPage.module.scss'
import db from '../../../../db/firebase'
import { doc, updateDoc } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";

function EditPage({username, displayName, bio, avatar}) {
    const [name, setName] = useState(displayName);
    const [desc, setBio] = useState(bio);
    const [avi, setAvatar] = useState(avatar);

    const auth = getAuth();
    const user = auth.currentUser;

    async function updateProfile(db, n) {
        const docRef = doc(db, "users", n);
        console.log(docRef);
        await updateDoc(docRef, {
            avatar: avi,
            bio: desc,
            displayName: name
        });
        alert("Account updated, refresh to see changes")
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user)
        if (user && !user.isAnonymous && user.displayName === username) {
            updateProfile(db, username)
        }
    }

    return (
        <div className={`${styles.editPageContainer} animate__animated animate__fadeInDown`}>
            <form className={styles.editForm}>
                <div className={styles.editInput}>
                    <label for='avatar'>Avatar:</label>
                    <input id='avatar' onChange={(e) => setAvatar(e.target.value)} value={avi} className={styles.input} type='text' name='name' placeholder='This must be an image url for now'></input>
                </div>
                <div className={styles.editInput}>
                    <label for='name'>Name:</label>
                    <input id='name' onChange={(e) => setName(e.target.value)} value={name} className={styles.input} type='text' name='name'></input>
                </div>
                <div className={styles.editInput}>
                    <label for='bio'>Bio:</label>
                    <input id='bio' onChange={(e) => setBio(e.target.value)} value={desc} className={styles.input} type='text' name='name'></input>
                </div>
                <div className={styles.submitBtn}>
                    <input onClick={handleSubmit} type="submit" value="Submit"/>
                </div>
            </form>
        </div>
    )
}

export default EditPage