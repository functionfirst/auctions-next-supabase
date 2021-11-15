import LayoutAuth from '../components/LayoutAuth'
import Head from 'next/head'
import AuthResetPasswordForm from '@/components/AuthResetPasswordForm'

function NewPassword () {
  return (
    <LayoutAuth>
      <Head>
        <title>Reset your password - Realtime Auctions</title>
      </Head>

      <h1 className="font-semibold text-xl">
        Reset your password
      </h1>

      <AuthResetPasswordForm />
    </LayoutAuth>
  )
}

export default NewPassword
