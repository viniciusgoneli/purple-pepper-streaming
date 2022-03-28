import styles from './../../styles/Navbar.module.css'

export default function Navbar(){
    return(
        <nav className={styles.navbar}>
            <div className={styles.leftContent}>
                <a className={`${styles.backgroundImage} ${styles.logoImg}`} href='#'></a>
                <ul className={styles.menuList}>
                    <li className={styles.menuListItem}><a className={styles.menuLink} href='#'>Home</a></li>
                    <li className={styles.menuListItem}><a className={styles.menuLink} href='#'>Categories</a></li>
                    <li className={styles.menuListItem}><a className={styles.menuLink} href='#'>My area</a></li>
                </ul>
            </div>
            <div className={styles.rightContent}>
                <button className={`${styles.backgroundImage} ${styles.icon} ${styles.searchBtn}`}></button>
                <button className={`${styles.backgroundImage} ${styles.icon} ${styles.accountBtn}`}></button>
            </div>
        </nav>
    )
}