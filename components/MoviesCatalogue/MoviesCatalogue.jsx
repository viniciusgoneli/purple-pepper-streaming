import { useState } from 'react';
import MoviesList from '../MoviesList/MoviesList.jsx'
import MovieDetailsDialog from './../MovieDetailsDialog/MovieDetailsDialog.jsx'

export default function MoviesCatalogue(props){
    const [movie, setMovie] = useState(null);

    function onMovieListItemClick(movie){
        setMovie(movie);
    }

    const genresJson = props.genresJson;
    const genresList = genresJson.genres.map((genreObj, index) => {
        const genreName = genreObj.name;
        const genreId = genreObj.id;
        return <MoviesList key={index}
        genreName={genreName}
        genreId={genreId}
        apiInfo={props.apiInfo}
        onMovieListItemClick={onMovieListItemClick} />
    })
    return(
        <>
            { movie ? <MovieDetailsDialog movie={movie} /> : null }
            <section>
                { genresList }
            </section>
        </>
    )
}