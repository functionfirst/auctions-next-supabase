import AccountProfile from '@/components/AccountProfile'
import LayoutAccount from '@/components/LayoutAccount'
import Head from 'next/head'

function Account() {
  return (
    <LayoutAccount>
      <Head>
        <title>Account - Realtime Auctions</title>
      </Head>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h1 className="font-semibold text-2xl mb-6 tracking-tight">
          Profile
        </h1>

        <AccountProfile />
      </div>
    </LayoutAccount>
  )
}

Account.authRequired = true

export default Account
