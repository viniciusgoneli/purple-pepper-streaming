import MoviesList from '../MoviesList/MoviesList.jsx'

export default function MoviesCatalogue(){
    return(
        <section>
            <MoviesList genre='Action' />
            <MoviesList genre='Comedy' />
            <MoviesList genre='Drama' />
            <MoviesList genre='Adventure' />
            <MoviesList genre='Horror' />
        </section>
    )
}