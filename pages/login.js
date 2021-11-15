import { useState } from 'react'
import Link from 'next/link'
import LayoutAuth from "../components/LayoutAuth"
import LoadingButton from '../components/LoadingButton'
import BaseLabel from '../components/BaseLabel'
import BaseInput from '../components/BaseInput'
import { useUser } from '@/contexts/UserContext'
import { useRouter } from 'next/router'
import Head from 'next/head'

function LoginForm () {
  const { signin } = useUser()
  const router = useRouter()
  const redirect = router?.query?.redirect || '/'
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    redirect
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    const setData = prevState => ({
      ...prevState,
      [name]: value
    })

    setCredentials(setData)
  }


  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const [_data, signinError] = await signin(credentials)

    if (signinError) {
      setError(signinError)
    } else {
      // @todo trigger a success toast message
      router.push(redirect)
    }

    setLoading(false)
  }

  let errorMessage = null

  if (error) {
    errorMessage = (
      <p
        className="text-red-600 my-4"
        role="alert"
      >
        {error}
      </p>
    )
  }

  return (
    <div>
      <h1 className="font-semibold text-xl">
        Welcome back
      </h1>

      <p className="text-gray-500 mt-2">
        Sign in to your account
      </p>

      <form
        className="w-full max-w-lg mt-6"
        onSubmit={submit}
      >
        <BaseLabel
          htmlFor="loginEmail"
          className="mb-2"
        >
          Email Address
        </BaseLabel>

        <BaseInput
          attributes={
            {
              id: "loginEmail",
              name: 'email',
              value: credentials.email,
              onChange: handleChange,
              placeholder: "your@email.com",
              required: true
            }
          }
        />

        <div className="flex mb-2 items-center mt-6">
          <BaseLabel
            htmlFor="loginPassword"
            className="flex-1"
          >
            Password
          </BaseLabel>

          <Link href="/forgot-password">
            <a className="text-indigo-600 hover:text-indigo-800">
              Forgot your password?
            </a>
          </Link>
        </div>

        <BaseInput
          attributes={
            {
              id: 'loginPassword',
              type: 'password',
              name: 'password',
              value: credentials.password,
              onChange: handleChange,
              placeholder: '******************',
              required: true
            }
          }
        />

        {errorMessage}

        <div className="text-center mt-6">
          <LoadingButton loading={loading}>
            Login
          </LoadingButton>
        </div>
      </form>

      <p className="text-center text-gray-500 mt-6">
        Don't have an account?
        {' '}
        <Link href="/register">
          <a className="text-indigo-600 hover:text-indigo-800">
            Sign up
          </a>
        </Link>
      </p>
    </div>
  )
}

function Login() {
  return (
    <LayoutAuth>
      <Head>
        <title>Login - Realtime Auctions</title>
      </Head>

      <LoginForm />
    </LayoutAuth>
  )
}

export default Login