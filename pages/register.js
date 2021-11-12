import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import LayoutAuth from '../components/LayoutAuth'
import BaseLabel from '../components/BaseLabel'
import BaseInput from '../components/BaseInput'
import LoadingButton from '../components/LoadingButton'
import { supabase } from '../lib/initSupabase'
import Head from 'next/head'

function RegisterForm () {
  const router = useRouter()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const signup = async event => {
    event.preventDefault()
    setLoading(true)

    const email = event.target.email.value
    const password = event.target.password.value
    const passwordConfirm = event.target.passwordConfirm.value

    try {
      if (passwordConfirm !== password) {
        throw new Error('Please confirm both passwords are the same')
      }

      const { error } = await supabase.auth.signUp({ email, password })

      if (error) {
        throw new Error(error.message)
      }

      // @todo trigger a success toast message
      router.push('/success')
    } catch (error) {
      setError(error.message)
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
        onSubmit={signup}
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
              placeholder: '******************',
              required: true
            }
          }
        />

        <BaseLabel
          htmlFor="loginPasswordConfirm"
          className="mb-2 mt-6"
        >
          Confirm your password
        </BaseLabel>

        <BaseInput
          attributes={
            {
              id: 'loginPasswordConfirm',
              name: 'passwordConfirm',
              type: 'password',
              placeholder: '******************',
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
