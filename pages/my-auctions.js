import Layout from '../components/Layout'
import Head from 'next/head'

function MyAuctions() {
  return (
    <Layout>
      <Head>
        <title>My Auctions - Realtime Auctions</title>
      </Head>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h1 className="font-semibold text-2xl mb-4">
          My Auctions
        </h1>
      </div>
    </Layout>
  )
}

export default MyAuctions
