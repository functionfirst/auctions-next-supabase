import LayoutAccount from '@/components/LayoutAccount'
import Head from 'next/head'

function ChangePassword() {
  return (
    <LayoutAccount>
      <Head>
        <title>Change Password - Realtime Auctions</title>
      </Head>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h1 className="font-semibold text-2xl mb-6 tracking-tight">
          Change Password
        </h1>
      </div>
    </LayoutAccount>
  )
}

ChangePassword.authRequired = true

export default ChangePassword
