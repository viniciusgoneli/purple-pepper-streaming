import styles from './../../styles/MoviesList.module.css'
import Image from 'next/image'
import defaultImage from './../../public/images/default-movie-img.jpg'

export default function MoviesList(props){
    return(
        <div className={styles.container}>
            <h2 className={styles.genreTitle}>{props.genre}</h2>
            <div className={styles.moviesWrapper}>
                <ul className={styles.moviesList}>
                    <li className={styles.movie}>
                        <Image layout='fixed' src={defaultImage} width={250} height={180} />
                    </li>
                    <li className={styles.movie}>
                        <Image layout='fixed' src={defaultImage} width={250} height={180} />
                    </li>
                    <li className={styles.movie}>
                        <Image layout='fixed' src={defaultImage} width={250} height={180} />
                    </li>
                    <li className={styles.movie}>
                        <Image layout='fixed' src={defaultImage} width={250} height={180} />
                    </li>
                    <li className={styles.movie}>
                        <Image layout='fixed' src={defaultImage} width={250} height={180} />
                    </li>
                    <li className={styles.movie}>
                        <Image layout='fixed' src={defaultImage} width={250} height={180} />
                    </li>
                    <li className={styles.movie}>
                        <Image layout='fixed' src={defaultImage} width={250} height={180} />
                    </li>
                    <li className={styles.movie}>
                        <Image layout='fixed' src={defaultImage} width={250} height={180} />
                    </li>
                </ul>
            </div>
        </div>
    )
}