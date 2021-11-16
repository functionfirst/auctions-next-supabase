import ContentHero from '../components/ContentHero'
import useCheckPasswordRecovery from '@/hooks/useCheckPasswordRecovery'
import Head from 'next/head'

function Home() {
  useCheckPasswordRecovery()

  return (
    <>
      <Head>
        <title>Realtime Auctions - Create your own online auction</title>
      </Head>

      <ContentHero />
    </>
  )
}

export default Home
