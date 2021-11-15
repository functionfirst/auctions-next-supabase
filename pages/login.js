import LayoutAuth from "../components/LayoutAuth"
import Head from 'next/head'
import AuthLoginForm from '@/components/AuthLoginForm'
import AuthSignupLink from '@/components/AuthSignupLink'

function Login() {
  return (
    <LayoutAuth>
      <Head>
        <title>Login - Realtime Auctions</title>
      </Head>

      <h1 className="font-semibold text-xl">
        Welcome back
      </h1>

      <p className="text-gray-500 mt-2">
        Sign in to your account
      </p>

      <AuthLoginForm />

      <AuthSignupLink />
    </LayoutAuth>
  )
}

export default Login