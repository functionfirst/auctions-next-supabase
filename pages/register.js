import LayoutAuth from '../components/LayoutAuth'
import Head from 'next/head'
import AuthRegisterForm from '@/components/AuthRegisterForm'
import AuthLoginLink from '@/components/AuthLoginLink'

export default function Register() {
  return (
    <LayoutAuth>
      <Head>
        <title>Register - Realtime Auctions</title>
      </Head>

      <h1 className="font-semibold text-xl">
        Sign Up
      </h1>

      <p className="text-gray-500 mt-2">
        Create an account to start tracking and bidding on auctions
      </p>

      <AuthRegisterForm />

      <AuthLoginLink />
    </LayoutAuth>
  )
}
