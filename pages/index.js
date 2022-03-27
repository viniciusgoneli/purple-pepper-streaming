import Head from 'next/head'
import Navbar from './../components/Navbar/Navbar.jsx'

export default function Home() {
  return (
    <>
      <Head>
        <title>Purple pepper</title>
        <meta name="description" content="Watch all your favorite movies and series. Our cataloge is full." />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>
      <Navbar />
    </>
  )
}
