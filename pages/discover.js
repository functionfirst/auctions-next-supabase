import Head from 'next/head'
import AuctionList from '../components/AuctionList'
import { executeAsync } from '@/handlers/exceptions'
import { fetchDiscover } from '@/lib/useAuctions'
import ErrorPage from 'next/error'
import useCacheControl from '@/lib/useCacheControl'
import Heading from '@/components/Heading'
import Container from '@/components/Container'

export default function Discover({ auctions, error, status }) {
  if (error) {
    return <ErrorPage statusCode={status} title={error.message} />
  }

  return (
    <Container>
      <Head>
        <title>Discover - Realtime Auctions</title>
      </Head>

      <Heading>Discover</Heading>

      <AuctionList auctions={auctions} />
    </Container>
  )
}

export async function getServerSideProps({ res }) {
  useCacheControl(res)

  const [auctions, error, status] = await executeAsync(fetchDiscover)

  if (error) {
    res.statusCode = status
  }

  return {
    props: {
      auctions,
      error,
      generatedAt: new Date().toString(),
      status,
    },
  }
}
