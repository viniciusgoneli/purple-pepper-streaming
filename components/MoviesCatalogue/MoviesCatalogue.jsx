import { useState } from 'react';
import MoviesList from '../MoviesList/MoviesList.jsx'

export default function MoviesCatalogue(props){
    const [isCardExpanded, setIsCardExpanded] = useState(false);

    function onMovieListItemClick(movie){
        setIsCardExpanded(true);
        console.log('expanded')
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
            {/* isCardExpanded ? <ExpandedMovieCard /> : null*/ }
            <section>
                { genresList }
            </section>
        </>
    )
}