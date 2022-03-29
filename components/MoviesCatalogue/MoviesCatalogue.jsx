import MoviesList from '../MoviesList/MoviesList.jsx'
import styles from './../../styles/MoviesCatalogue.module.css'

export default function MoviesCatalogue(){
    return(
        <section className={styles.mainContainer}>
            <MoviesList />
            <MoviesList />
            <MoviesList />
            <MoviesList />
            <MoviesList />
        </section>
    )
}