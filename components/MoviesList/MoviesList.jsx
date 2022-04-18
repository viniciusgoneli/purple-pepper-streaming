import styles from './../../styles/MoviesList.module.css'
import Image from 'next/image'
import MovieCard from './../MovieCard/MovieCard.jsx'
import defaultImage from './../../public/images/default-movie-img.jpg'
import rightArrow from './../../public/icons/right-arrow.svg'
import leftArrow from './../../public/icons/left-arrow.svg'
import useSWR from 'swr';
import { useRef, useEffect, useState } from 'react'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function MoviesList({ apiInfo, genreName, genreId }){
    const apiBaseUrl = apiInfo.apiBaseUrl;
    const apiKey = apiInfo.apiKey;

    const moviesSliderRef = useRef(null)
    const sliderOffset = 850;
    const slideWidth = 500;
    const slideHeight = 500;

    let initialOffsetLeft;

    const [pageIndex, setPageIndex] = useState(1);

    useEffect(() => {
        initialOffsetLeft = 40;
        moviesSliderRef.current.style.transition = 'left 0.35s ease-out'

        moviesSliderRef.current.ontransitionstart = movieSliderTransitionHandler;
        moviesSliderRef.current.ontransitionend = movieSliderTransitionHandler;
    })

    function movieSliderTransitionHandler(){
        const finalOffsetLeft = (moviesSliderRef.current.offsetWidth - window.innerWidth) * -1;
        const finalFetchPoint = finalOffsetLeft - slideWidth;
        const initialFetchPoint = initialOffsetLeft + slideWidth;

        if(isMovieSliderOffsetLeftAt(initialFetchPoint)){
            if(pageIndex > 1) {
                moviesSliderRef.current.style.transition = 'none'
                moviesSliderRef.current.style.left = finalOffsetLeft + 'px';

                setPageIndex(--pageIndex);
                return;
            }

            moviesSliderRef.current.style.left = initialOffsetLeft + 'px';
            return;
        }

        if(isMovieSliderOffsetLeftAt(finalFetchPoint)){
            moviesSliderRef.current.style.transition = 'none'
            moviesSliderRef.current.style.left = initialOffsetLeft + 'px';

            setPageIndex(++pageIndex);
            return;
        }
    }

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

    const { data } = useSWR(
        `${apiBaseUrl}/discover/movie?api_key=${apiKey}&with_genres=${genreId}&page=${pageIndex}`,
        fetcher
    )

    const movieList = data?.results.map((movie, index) => {
        return (
            <li key={index}>
                <MovieCard movie={movie} slideWidth={slideWidth} slideHeight={slideHeight} />
            </li>
        )
    })

    return(
        <div className={styles.container}>
            <h2 className={styles.genreTitle}>{genreName}</h2>
            <div className={styles.moviesContainer}>
                <div className={styles.moviesSlider} ref={moviesSliderRef}>
                    <ul className={styles.moviesList}>
                        { movieList }
                    </ul>
                </div>
                <div onClick={leftArrowHandleClick} className={`${styles.arrowContainer} ${styles.leftArrowContainer}`}>
                    <Image draggable={false} layout='fixed' src={leftArrow} width={60} height={60} />
                </div>
                <div onClick={rightArrowHandleClick} className={`${styles.arrowContainer} ${styles.rightArrowContainer}`}>
                    <Image draggable={false} layout='fixed' src={rightArrow} width={60} height={60} />
                </div>
            </div>
        </div>
    )
}