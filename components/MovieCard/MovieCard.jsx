import Image from 'next/image'
import styles from './../../styles/MovieCard.module.css'
import defaultImage from './../../public/images/default-movie-img.jpg';

export default function MovieCard({movie, slideWidth, slideHeight}){
    const imageSrc = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

    return(
        <div className={styles.movieCard}>
            <div className={styles.posterImageContainer}>
                <Image className={styles.posterImage} src={imageSrc || defaultImage} width={slideWidth} height={slideHeight} />
            </div>
            <div className={styles.details}>
                <div className={styles.detailsPosterImageContainer}>
                    <Image className={styles.detailsPosterImage} src={imageSrc || defaultImage} width={300} height={350} />
                </div>
                <h2 className={styles.title}>{ movie.title }</h2>
                <p className={styles.description}>{ movie.overview }</p>
            </div>
        </div>
    )
}