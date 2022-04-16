import Image from 'next/image'

export default function MovieCard(props){
    return(
        <div className={styles.movieCard}>
            <div className={styles.posterImageContainer}>
                <Image className={styles.posterImage} layout='fill' src={props.imageSrc} />
            </div>
            <div className={styles.details}>
                <div className={styles.detailsPosterImageContainer}>
                    <Image className={styles.detailsPosterImage} layout='fill' src={props.imageSrc} />
                </div>
                <div>Progresso</div>
                <h2>Homem aranha</h2>
                <p>Descirção do filme</p>
                <div className={styles.imdbAndButton}>
                    <div className={styles.imdb}></div>
                    <button className={styles.playButton}></button>
                </div>
            </div>
        </div>
    )
}