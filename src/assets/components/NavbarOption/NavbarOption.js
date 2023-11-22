import { Link } from 'react-router-dom'
import styles from './NavbarOption.module.scss'

function NavbarOption({active, text, src, user}) {
    let url = text;
    if (text === "home") {
        url = "../home";
    }
    else if (text !== "post" && text !== "notifications") {
        url = "../user/" + url;
    }
    else {
        url = "../home/" + url;
    }
    //console.log(user)

    return (
        <div className={`${styles.navOptionContainer} ${active && styles['navOption--active']}`}>
            <Link to={url} >
                <img src={src} alt={text}  />
                <h2>{text}</h2>
            </Link>
        </div>
    )
}

export default NavbarOption