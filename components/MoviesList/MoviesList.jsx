import styles from './../../styles/MoviesList.module.css'
import Image from 'next/image'
import MovieCard from './../MovieCard/MovieCard.jsx'
import rightArrow from './../../public/icons/right-arrow.svg'
import leftArrow from './../../public/icons/left-arrow.svg'
import useSWR from 'swr';
import { useRef, useEffect, useState } from 'react'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function MoviesList({ apiInfo, genreName, genreId, onMovieListItemClick, searchQuery }){
    const apiBaseUrl = apiInfo.apiBaseUrl;
    const apiKey = apiInfo.apiKey;

    const [pageIndex, setPageIndex] = useState(1);
    const [isSliderLeftArrowDisplayed, setIsSliderLeftArrowDisplayed] = useState(false);
    const [isSliderRightArrowDisplayed, setIsSliderRightArrowDisplayed] = useState(true);

    const url = !searchQuery 
    ? `${apiBaseUrl}/discover/movie?api_key=${apiKey}&with_genres=${genreId}&page=${pageIndex}`
    : `${apiBaseUrl}/search/movie?api_key=${apiKey}&page=${pageIndex}&query=${searchQuery}`;

    const { data } = useSWR(
        url,
        fetcher
    )

    const moviesSliderRef = useRef(null)

    const sliderOffset = 850;
    const slideWidth = 500;
    const slideHeight = 500;

    const firstPage = 1;
    const lastPage = data?.total_pages;

    let initialOffsetLeft;
    let finalOffsetLeft;

    useEffect(() => {
        initialOffsetLeft = 40;
        finalOffsetLeft = ((moviesSliderRef.current.offsetWidth - window.innerWidth) * -1) - 40;

        moviesSliderRef.current.ontransitionstart = _ => onTransitionSliderHandler()
        moviesSliderRef.current.ontransitionend = _ => onTransitionSliderHandler()
    })

    useEffect(() => {
        moviesSliderRef.current.style.left = initialOffsetLeft + 'px';
    }, [searchQuery])

    function onTransitionSliderHandler(){

        if(isMovieSliderOffsetLeftAt(initialOffsetLeft)){
            moviesSliderRef.current.style.left = initialOffsetLeft + 'px';   
            if(pageIndex === firstPage) setIsSliderLeftArrowDisplayed(false);
            return;
        }
        if(isMovieSliderOffsetLeftAt(finalOffsetLeft)){
            moviesSliderRef.current.style.left = finalOffsetLeft + 'px';  
            if(pageIndex === lastPage) setIsSliderRightArrowDisplayed(false);
            return; 
        }

        setIsSliderLeftArrowDisplayed(true);
        setIsSliderRightArrowDisplayed(true);
    }

    function rightArrowHandleClick(){
        moviesSliderRef.current.style.left = moviesSliderRef.current.offsetLeft - sliderOffset + 'px';

        if(isMovieSliderOffsetLeftAt(finalOffsetLeft) && pageIndex < lastPage){
            setPageIndex(++pageIndex);
            moviesSliderRef.current.style.left = initialOffsetLeft + 'px';           
        }
    }

    function leftArrowHandleClick(){
        moviesSliderRef.current.style.left = moviesSliderRef.current.offsetLeft + sliderOffset + 'px';

        if(isMovieSliderOffsetLeftAt(initialOffsetLeft) && pageIndex > firstPage){
            setPageIndex(--pageIndex);
            moviesSliderRef.current.style.left = finalOffsetLeft + 'px';           
        }
    }

    function isMovieSliderOffsetLeftAt(offsetLeft){
        if(offsetLeft > 0) return moviesSliderRef.current.offsetLeft >= offsetLeft
        return moviesSliderRef.current.offsetLeft <= offsetLeft;
    }

    const movieList = data?.results.map((movie, index) => {
        return (
            <li key={index}>
                <div className={styles.cardBtnWrapper} onClick={_ => onMovieListItemClick(movie)}>
                    <MovieCard movie={movie} slideWidth={slideWidth} slideHeight={slideHeight} />  
                </div>
            </li>
        )
    })

    const sliderLeftArrow = 
    <div onClick={leftArrowHandleClick} className={`${styles.arrowContainer} ${styles.leftArrowContainer}`}>
        <Image draggable={false} layout='fixed' src={leftArrow} width={60} height={60} />
    </div>

    const sliderRightArrow = 
    <div onClick={rightArrowHandleClick} className={`${styles.arrowContainer} ${styles.rightArrowContainer}`}>
        <Image draggable={false} layout='fixed' src={rightArrow} width={60} height={60} />
    </div>

    return(
        <div className={styles.container}>
            <h2 className={styles.genreTitle}>{genreName}</h2>
            <div className={styles.moviesContainer}>
                <div className={styles.moviesSlider} ref={moviesSliderRef}>
                    <ul className={styles.moviesList}>
                        { movieList }
                    </ul>
                </div>
                { isSliderLeftArrowDisplayed ? sliderLeftArrow : null}
                { isSliderRightArrowDisplayed ? sliderRightArrow : null }
            </div>
        </div>
    )
}