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

    // const navBtns = document.querySelectorAll('.navBtn');
    //     navBtns.forEach((btn) => {
    //         btn.addEventListener("click", (e) => {
    //             navBtns.forEach((f) => f.classList.remove('navOption--active'));
    //             e.target.classList.toggle('navOption--active')
    //         })
    // })

    // const toggleActive = (e) => {
        
    // }

    return (
        <div className={`${styles.navOptionContainer} navBtn`}>
            <Link to={url} >
                <img src={src} alt={text}  />
                <h2>{text}</h2>
            </Link>
        </div>
    )
}

export default NavbarOption