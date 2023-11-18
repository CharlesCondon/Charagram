import React from 'react'
import styles from './NoPage.module.scss'
import Footer from '../Footer/Footer'

function NoPage() {
  return (
    <>
      <div className={styles.noPageContainer}>
          <h1>Page not found :(</h1>
          <p>OH NO! Something went wrong and now we're here ... kinda awkward</p>
          <p>Try going to the <a href='/'>home page</a> and we can pick up where we left off.</p>
      </div>
      <Footer/>
    </>
  )
}

export default NoPage