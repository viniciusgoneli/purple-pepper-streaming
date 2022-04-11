import styles from './../../styles/MoviesList.module.css'
import Image from 'next/image'
import defaultImage from './../../public/images/default-movie-img.jpg'
import rightArrow from './../../public/icons/right-arrow.svg'
import leftArrow from './../../public/icons/left-arrow.svg'
import useSWR from 'swr';
import { useRef, useEffect } from 'react'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function MoviesList({ apiInfo, genreName, genreId }){
    const apiBaseUrl = apiInfo.apiBaseUrl;
    const apiKey = apiInfo.apiKey;
    const imgBaseUrl = apiInfo.imgBaseUrl;

    const moviesSliderRef = useRef(null)
    const sliderItemWidth = 500;
    const sliderOffset = 850;

    let initialOffsetLeft;
    let finalOffsetLeft;

    useEffect(() => {
        initialOffsetLeft = moviesSliderRef.current.offsetLeft;
        finalOffsetLeft = (moviesSliderRef.current.offsetWidth - window.innerWidth) * -1;
        
        moviesSliderRef.current.ontransitionstart = _ => {
            if(isMovieSliderOffsetLeftAt(initialOffsetLeft)){
                moviesSliderRef.current.style.left = initialOffsetLeft + 'px';
            }
            if(isMovieSliderOffsetLeftAt(finalOffsetLeft)){
                moviesSliderRef.current.style.left = finalOffsetLeft + 'px';
            }
        }
    })

    function rightArrowHandleClick(){
        moviesSliderRef.current.style.left = moviesSliderRef.current.offsetLeft - sliderOffset + 'px';
    }

    function leftArrowHandleClick(){
        moviesSliderRef.current.style.left = moviesSliderRef.current.offsetLeft + sliderOffset + 'px';
    }

    function isMovieSliderOffsetLeftAt(offsetLeft){
        if(offsetLeft > 0) return moviesSliderRef.current.offsetLeft >= offsetLeft
        return moviesSliderRef.current.offsetLeft <= offsetLeft;
    }

    const { data, error } = useSWR(
        `${apiBaseUrl}/discover/movie?api_key=${apiKey}&with_genres=${genreId}`,
        fetcher
    )

    const defaultList = data?.results.map((_, index) => {
        return(
            <li key={index}>
                <div className={styles.imageContainer}>
                    <Image layout='fixed' src={defaultImage} width={sliderItemWidth} height={sliderItemWidth} />
                </div>
            </li>
        )
    })

    const movieList = data?.results.map((movie, index) => {
        const imageSrc = `${imgBaseUrl}/w500${movie.poster_path}`
        return (
            <li key={index}>
                <div className={styles.imageContainer}>
                    <Image layout='fixed' src={imageSrc} width={sliderItemWidth} height={sliderItemWidth} />
                </div>
            </li>
        )
    })

    return(
        <div className={styles.container}>
            <h2 className={styles.genreTitle}>{genreName}</h2>
            <div className={styles.moviesContainer}>
                <div onClick={leftArrowHandleClick} className={`${styles.arrowContainer} ${styles.leftArrowContainer}`}>
                    <Image layout='fixed' src={leftArrow} width={60} height={60} />
                </div>
                <div onClick={rightArrowHandleClick} className={`${styles.arrowContainer} ${styles.rightArrowContainer}`}>
                    <Image layout='fixed' src={rightArrow} width={60} height={60} />
                </div>
                <div className={styles.moviesSlider} ref={moviesSliderRef}>
                    <ul className={styles.moviesList}>
                        { (!data || error) ? defaultList : movieList }
                    </ul>
                </div>
            </div>
        </div>
    )
}