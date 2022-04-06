import styles from './../../styles/MoviesList.module.css'
import Image from 'next/image'
import defaultImage from './../../public/images/default-movie-img.jpg'
import rightArrow from './../../public/icons/right-arrow.svg'
import leftArrow from './../../public/icons/left-arrow.svg'
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function MoviesList({ apiInfo, genreName, genreId }){
    const apiBaseUrl = apiInfo.apiBaseUrl;
    const apiKey = apiInfo.apiKey;
    const imgBaseUrl = apiInfo.imgBaseUrl;

    const { data, error } = useSWR(
        `${apiBaseUrl}/discover/movie?api_key=${apiKey}&with_genres=${genreId}`,
        fetcher
    )

    const defaultList = [];
    for(let i=0; i < 9; i++){
        defaultList.push(
            <li key={i} className={styles.movie}>
                <Image layout='fixed' src={defaultImage} width={500} height={500} />
            </li>
        )
    }

    const movieList = data?.results.map((movie, index) => {
        const imageSrc = `${imgBaseUrl}/w500${movie.poster_path}`
        return (
            <li key={index} className={styles.movie}>
                <Image layout='fixed' src={imageSrc} width={500} height={500} />
            </li>
        )
    })

    return(
        <div className={styles.container}>
            <h2 className={styles.genreTitle}>{genreName}</h2>
            <div className={styles.moviesContainer}>
                <div className={`${styles.arrowContainer} ${styles.leftArrowContainer}`}>
                        <Image layout='fixed' src={leftArrow} width={60} height={60} />
                </div>
                <div className={`${styles.arrowContainer} ${styles.rightArrowContainer}`}>
                    <Image layout='fixed' src={rightArrow} width={60} height={60} />
                </div>
                <div className={styles.moviesSlider}>
                    <ul className={styles.moviesList}>
                        { (!data || error) ? defaultList : movieList }
                    </ul>
                </div>
            </div>
        </div>
    )
}