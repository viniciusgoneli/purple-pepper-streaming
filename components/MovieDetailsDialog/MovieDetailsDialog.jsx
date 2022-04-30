import styles from './../../styles/MovieDetailsDialog.module.css'
import { useRef, useEffect } from 'react'

export default function MovieDetailsDialog({ movie, closeDialog }){

    const body = document.querySelector('body');
    const dialogRoot = useRef(null);

    const backdropImageSrc = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`

    useEffect(() => {
        createDialogAtCurrentScrollPosition();
        disableBodyScroll();
    })

    function createDialogAtCurrentScrollPosition(){
        dialogRoot.current.style.top = window.scrollY + 'px';
        dialogRoot.current.style.left = window.scrollX + 'px';
    }

    function disableBodyScroll(){
        body.style.overflowY = 'hidden';
    }

    function enableBodyScroll(){
        body.style.overflowY = 'auto';
    }

    function restaureDefaultAndCloseDialog(){
        enableBodyScroll();
        closeDialog();
    }

    return(
        <div className={styles.dialogRoot} ref={dialogRoot}>
            <div className={styles.darkBackground} onClick={restaureDefaultAndCloseDialog}></div>
            <div className={styles.dialogBackground}>
                <button className={styles.closeButton} onClick={restaureDefaultAndCloseDialog}></button>
                <img className={styles.movieImage} src={backdropImageSrc}/>
                <h1 className={styles.movieTitle}>{ movie.title }</h1>
                <p className={styles.movieOverview}>{ movie.overview }</p>
                <div className={styles.watchButtonContainer}>
                    <button className={styles.watchButton}>Watch</button>
                </div>
            </div>
        </div>
    )
}