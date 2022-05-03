import styles from './../../styles/Navbar.module.css'
import { useState } from 'react'

export default function Navbar({ setSearchQuery }){

    const [isSearchInputOpen, setIsSearchInputOpen] = useState(false);

    function searchInputOnChangeHandler(e){
        const query = e.currentTarget.value;
        setSearchQuery(query);
    }

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
                <button onClick={_ => setIsSearchInputOpen(!isSearchInputOpen)}
                            className={`${styles.backgroundImage}
                            ${styles.icon}
                            ${styles.searchBtn}`} />
                { 
                    isSearchInputOpen ? 
                    <div className={styles.searchInputContainer}>
                        <input onChange={searchInputOnChangeHandler} type={'text'} className={styles.searchInput} />
                    </div> : null
                }
                <button className={`${styles.backgroundImage} ${styles.icon} ${styles.accountBtn}`}></button>
            </div>
        </nav>
    )
}