import Head from 'next/head'
import Navbar from './../components/Navbar/Navbar.jsx'
import MoviesCatalogue from './../components/MoviesCatalogue/MoviesCatalogue.jsx'

export default function Home(props) {
  return (
    <>
      <Head>
        <title>Purple pepper</title>
        <meta name="description" content="Watch all your favorite movies and series. Our cataloge is full." />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>
      <Navbar />
      <MoviesCatalogue apiInfo={props.apiInfo} genresJson={props.genresJson}/>
    </>
  )
}

export async function getStaticProps(){

  const apiBaseUrl = process.env.API_BASE_URL
  const apiKey = process.env.API_KEY;

  const genresResponse = await fetch(`${apiBaseUrl}/genre/movie/list?api_key=${apiKey}`);
  const genresJson = await genresResponse.json();
  
  return {
    props: {
      apiInfo: {
        apiKey,
        apiBaseUrl
      },
      genresJson
    }
  }
}