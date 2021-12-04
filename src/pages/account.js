import AccountProfile from '@/components/AccountProfile'
import LayoutAccount from '@/components/LayoutAccount'
import Head from 'next/head'

function Account() {
  return (
    <>
      <Head>
        <title>Account - Realtime Auctions</title>
      </Head>

      <h1 className="font-semibold text-2xl mb-6 tracking-tight">Profile</h1>

      <AccountProfile />
    </>
  )
}

Account.authRequired = true
Account.layout = LayoutAccount

export default Account
