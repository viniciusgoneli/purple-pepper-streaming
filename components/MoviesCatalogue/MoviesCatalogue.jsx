import MoviesList from '../MoviesList/MoviesList.jsx'

export default function MoviesCatalogue(props){
    const genresJson = props.genresJson;
    const genresList = genresJson.genres.map((genreObj, index) => {
        const genreName = genreObj.name;
        const genreId = genreObj.id;
        return <MoviesList key={index} genreName={genreName} genreId={genreId} apiInfo={props.apiInfo} />
    })
    return(
        <section>
            { genresList }
        </section>
    )
}