// import Account from '../components/Account'
import Layout from '../components/Layout'
import Head from 'next/head'

function Account({ session }) {
  return (
    <Layout>
      <Head>
        <title>Account</title>
      </Head>
      {/* <Account key={session.user.id} session={session} /> */}
    </Layout>
  )
}

export default Account
