import React from 'react'
import styles from './Post.module.scss'
import anon from '../../images/anon.png'
import heart from '../../images/heart.png'
import comment from '../../images/comment.png'
import eye from '../../images/eye.webp'

function Post({displayName, username, avatar, verified, timestamp, text}) {
    let tempTime = timestamp;
    if (timestamp < 1) {
        tempTime = 1;
    }

    return (
        <div className={styles.postContainer}>
            <div className={styles.postAvatar}>
                {avatar ? <img src={avatar} alt='avatar' /> : <img src={anon} alt='avatar' />}
            </div>
            <div className={styles.postBody}>
                <div className={styles.postHeader}>
                    <div className={styles.postHeaderText}>
                        <h3>
                            {displayName}{" "} {verified ? <img src={eye} alt='verified'/> : <></>} <span>@{username}</span><span> ~ {tempTime}h</span>
                        </h3>
                    </div>
                    <div className={styles.postHeaderDescription}>
                        <p>{text}</p>
                    </div>
                </div>
                <div className={styles.postFooter}>
                    <button className={styles.postFooterBtn}><img src={comment} alt='comment'></img></button>
                    <button className={styles.postFooterBtn}><img src={heart} alt='like'></img></button>
                </div>
            </div>
        </div>
    )
}

export default Post