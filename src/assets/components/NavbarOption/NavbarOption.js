import styles from './NavbarOption.module.scss'

function NavbarOption({active, text, src}) {
    
    // let navLink = text;
    // if (navLink !== 'guest') {
    //     navLink = ''
    // }

    return (
        <div className={`${styles.navOptionContainer} ${active && styles['navOption--active']}`}>
            <a href={text}> 
                <img src={src} alt={text} />
                <h2>{text}</h2>
            </a>
        </div>
    )
}

export default NavbarOption