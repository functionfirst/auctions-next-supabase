import { useRouter } from 'next/router'
import { useState } from 'react'
import { useUser } from '@/contexts/UserContext'
import Link from 'next/link'
import LoadingButton from '../components/LoadingButton'
import BaseLabel from '../components/BaseLabel'
import BaseInput from '../components/BaseInput'

function AuthLoginForm () {
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
        id="loginEmail"
        name="email"
        value={credentials.email}
        onChange={handleChange}
        placeholder="your@email.com"
        required
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
        id="loginPassword"
        type="password"
        name="password"
        value={credentials.password}
        onChange={handleChange}
        placeholder='******************'
        required
      />

      {errorMessage}

      <div className="text-center mt-6">
        <LoadingButton loading={loading}>
          Login
        </LoadingButton>
      </div>
    </form>
  )
}

export default AuthLoginForm
