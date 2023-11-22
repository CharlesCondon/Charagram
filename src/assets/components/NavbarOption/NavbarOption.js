import { Link } from 'react-router-dom'
import styles from './NavbarOption.module.scss'

function NavbarOption({active, text, src, user}) {
    
    if (text === "home") {
        text = "../home";
    }
    else if (text !== "post" && text !== "notifications") {
        text = "../user/" + text;
    }
    else {
        text = "../home/" + text;
    }
    //console.log(user)

    return (
        <div className={`${styles.navOptionContainer} ${active && styles['navOption--active']}`}>
            <Link to={text} >
                <img src={src} alt={text}  />
                <h2>{text}</h2>
            </Link>
        </div>
    )
}

export default NavbarOption