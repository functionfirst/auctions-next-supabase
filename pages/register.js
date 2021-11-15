import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import LayoutAuth from '../components/LayoutAuth'
import BaseLabel from '../components/BaseLabel'
import BaseInput from '../components/BaseInput'
import LoadingButton from '../components/LoadingButton'
import Head from 'next/head'
import { useUser } from '@/contexts/UserContext'

function RegisterForm () {
  const { signup } = useUser()
  const router = useRouter()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    const setData = prevState => ({
      ...prevState,
      [name]: value
    })

    setCredentials(setData)
  }

  const submit = async event => {
    event.preventDefault()
    setLoading(true)

    const [_data, signupError] = await signup(credentials)

    if (signupError) {
      setError(signupError)
    } else {
      // @todo trigger a success toast message
      router.push('/success')
    }

    setLoading(false)
  }

  const errorMessage = error ? (
    <p
      className="text-red-600 my-4"
      role="alert"
    >
      {error}
    </p>
  ) : null

  return (
    <div>
      <Head>
        <title>Register - Realtime Auctions</title>
      </Head>

      <h1 className="font-semibold text-xl">
        Sign Up
      </h1>

      <p className="text-gray-500 mt-2">
        Create an account to start tracking and bidding on auctions
      </p>

      <form
        className="w-full max-w-lg mt-6"
        onSubmit={submit}
      >
        <BaseLabel htmlFor="loginEmail" className="mb-2">
          Email Address
        </BaseLabel>

        <BaseInput
          attributes={
            {
              id: 'loginEmail',
              name: 'email',
              placeholder: 'your@email.com',
              type: 'email',
              value: credentials.email,
              onChange: handleChange,
              required: true
            }
          }
        />

        <BaseLabel
          htmlFor="loginPassword"
          className="mb-2 mt-6"
        >
          Password
        </BaseLabel>

        <BaseInput
          attributes={
            {
              id: 'loginPassword',
              name: 'password',
              type: 'password',
              value: credentials.password,
              placeholder: '******************',
              onChange: handleChange,
              required: true
            }
          }
        />

        <BaseLabel
          htmlFor="loginConfirmPassword"
          className="mb-2 mt-6"
        >
          Confirm your password
        </BaseLabel>

        <BaseInput
          attributes={
            {
              id: 'loginConfirmPassword',
              name: 'confirmPassword',
              type: 'password',
              value: credentials.confirmPassword,
              placeholder: '******************',
              onChange: handleChange,
              required: true
            }
          }
        />

        {errorMessage}

        <div className="text-center mt-6">
          <LoadingButton loading={loading}>
            Create an account
          </LoadingButton>
        </div>
      </form>

      <p className="text-center text-gray-500 mt-6">
        Already have an account?
        {' '}
        <Link href="/login">
          <a className="text-indigo-600 hover:text-indigo-800">
            Log In
          </a>
        </Link>
      </p>
    </div>
  )
}

export default function Register() {
  return (
    <LayoutAuth>
      <RegisterForm />
    </LayoutAuth>
  )
}
