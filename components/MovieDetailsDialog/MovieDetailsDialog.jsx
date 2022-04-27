import styles from './../../styles/MovieDetailsDialog.module.css'
import { useRef, useEffect } from 'react'

export default function MovieDetailsDialog({ movie, closeDialog }){

    const imageSrc = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`

    const dialogRoot = useRef(null);

    useEffect(() => {
        dialogRoot.current.style.top = window.scrollY + 'px';
        dialogRoot.current.style.left = window.scrollX + 'px';
    })

    return(
        <div className={styles.dialogRoot} ref={dialogRoot}>
            <div className={styles.darkBackground} onClick={_ => closeDialog()}></div>
            <div className={styles.dialogBackground}>
                <div className={styles.closeButton} onClick={_ => closeDialog()}><button>X</button></div>
                <img className={styles.movieImage} src={imageSrc}/>
                <h1 className={styles.movieTitle}>{ movie.title }</h1>
                <p className={styles.movieOverview}>{ movie.overview }</p>
                <div className={styles.watchButtonContainer}>
                    <button className={styles.watchButton}>Watch</button>
                </div>
            </div>
        </div>
    )
}