import Layout from '../components/Layout'
import Head from 'next/head'

function Upcoming() {
  return (
    <Layout>
      <Head>
        <title>Upcoming - Realtime Auctions</title>
      </Head>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h1 className="font-semibold text-2xl mb-4">
          Upcoming
        </h1>
      </div>
    </Layout>
  )
}

export default Upcoming
