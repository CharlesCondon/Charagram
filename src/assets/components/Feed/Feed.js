import React from 'react'
import styles from './Feed.module.scss'
import Post from '../Post/Post'

function Feed() {
  return (
    <div className={styles.feedContainer}>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
    </div>
  )
}

export default Feed