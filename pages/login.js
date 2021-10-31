import { useState } from 'react'
import Link from 'next/link'
import LayoutBase from "../components/LayoutBase"
import LoadingButton from '../components/LoadingButton'
import BaseLabel from '../components/BaseLabel'
import BaseInput from '../components/BaseInput'
import { supabase } from '../lib/initSupabase'
import { useRouter } from 'next/router'

function LoginForm () {
  const router = useRouter()
  const { redirect } = router.query
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const signin = async (event) => {
    event.preventDefault()
    setLoading(true)

    const payload = {
      email: event.target.email.value,
      password: event.target.password.value
    }

    try {
      const { error } = await supabase.auth.signIn(payload)

      if (error) {
        throw new Error(error.message)
      }

      // @todo trigger a success toast message
      router.push(redirect || '/')
    } catch (error) {
      setError(error)
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
        onSubmit={signin}
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
    <LayoutBase>
      <LoginForm />
    </LayoutBase>
  )
}

export default Login