import ContentHero from '../components/ContentHero'
import CheckPasswordRecovery from '../components/CheckPasswordRecovery'
import Head from 'next/head'

function Home() {
  return (
    <>
      <Head>
        <title>Realtime Auctions - Create your own online auction</title>
      </Head>

      <ContentHero />
      <CheckPasswordRecovery />
    </>
  )
}

export default Home
