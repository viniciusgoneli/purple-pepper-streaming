import { useState } from 'react';
import MoviesList from '../MoviesList/MoviesList.jsx'
import MovieDetailsDialog from './../MovieDetailsDialog/MovieDetailsDialog.jsx'

export default function MoviesCatalogue(props){

    const [movie, setMovie] = useState(null);
    const [isMovieDetailsDialogDisplayed, setIsMovieDetailsDialogDisplayed] = useState(false);

    function onMovieListItemClick(movie){
        setMovie(movie);
        setIsMovieDetailsDialogDisplayed(true);
    }

    function closeMovieDetailsDialog(){
        setIsMovieDetailsDialogDisplayed(false);
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

    const searchList = <MoviesList genreName={`Because you've searched for '${props.searchQuery}'`}
            apiInfo={props.apiInfo}
            onMovieListItemClick={onMovieListItemClick}
            searchQuery={props.searchQuery} />

    return(
        <>
            { 
                isMovieDetailsDialogDisplayed ? <MovieDetailsDialog movie={movie}
                closeDialog={closeMovieDetailsDialog}/> : null
            }
            <section>
                { !props.searchQuery ? genresList : searchList }
            </section>
        </>
    )
}