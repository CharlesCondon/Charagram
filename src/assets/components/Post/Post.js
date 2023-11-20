import React from 'react'
import styles from './Post.module.scss'
import anon from '../../images/anon.png'
import heart from '../../images/heart.png'
import comment from '../../images/comment.png'

function Post({displayName, username, avatar, text}) {

    return (
        <div className={styles.postContainer}>
            <div className={styles.postAvatar}>
                <img src={anon} alt='avatar' />
            </div>
            <div className={styles.postBody}>
                <div className={styles.postHeader}>
                    <div className={styles.postHeaderText}>
                        <h3>
                            Charles{" "} <span>@Charles</span><span>~ 4h</span>
                        </h3>
                    </div>
                    <div className={styles.postHeaderDescription}>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ultrices viverra felis et consectetur. Mauris finibus maximus elit quis dignissim. </p>
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