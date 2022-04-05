import MoviesList from '../MoviesList/MoviesList.jsx'

export default function MoviesCatalogue(props){
    const genresJson = props.genresJson;
    const genresList = genresJson.genres.map(genreObj => {
        const genreName = genreObj.name;
        return <MoviesList genre={genreName} />
    })
    return(
        <section>
            { genresList }
        </section>
    )
}