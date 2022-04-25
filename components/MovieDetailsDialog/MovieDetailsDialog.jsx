

export default function MovieDetailsDialog({ movie }){
    return(
        <div>
            <div>
                <div><button>X</button></div>
                <div>Image</div>
                <h1>{ movie.title }</h1>
                <p>{ movie.overview }</p>
                <button>Watch</button>
            </div>
        </div>
    )
}