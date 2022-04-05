import MoviesList from '../MoviesList/MoviesList.jsx'

export default function MoviesCatalogue(props){
    const genresJson = props.genresJson;
    const genresList = genresJson.genres.map((genreObj, index) => {
        const genreName = genreObj.name;
        return <MoviesList key={index} genre={genreName} />
    })
    return(
        <section>
            { genresList }
        </section>
    )
}