import { useRouter } from 'next/router'
import { useState } from 'react'
import { useUser } from '@/contexts/UserContext'

import BaseLabel from '../components/BaseLabel'
import BaseInput from '../components/BaseInput'
import LoadingButton from '../components/LoadingButton'

function AuthRegisterForm () {
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

  const submit = async e => {
    e.preventDefault()
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
    <form
      className="w-full max-w-lg mt-6"
      onSubmit={submit}
    >
      <BaseLabel htmlFor="loginEmail" className="mb-2">
        Email Address
      </BaseLabel>

      <BaseInput
        id="loginEmail"
        name="email"
        placeholder="your@email.com"
        type="email"
        value={credentials.email}
        onChange={handleChange}
        required
      />

      <BaseLabel
        htmlFor="loginPassword"
        className="mb-2 mt-6"
      >
        Password
      </BaseLabel>

      <BaseInput
        id="loginPassword"
        name="password"
        type="password"
        value={credentials.password}
        placeholder='******************'
        onChange={handleChange}
        required
      />

      <BaseLabel
        htmlFor="loginConfirmPassword"
        className="mb-2 mt-6"
      >
        Confirm your password
      </BaseLabel>

      <BaseInput
        id="loginConfirmPassword"
        name="confirmPassword"
        type="password"
        value={credentials.confirmPassword}
        placeholder='******************'
        onChange={handleChange}
        required
      />

      {errorMessage}

      <div className="text-center mt-6">
        <LoadingButton loading={loading}>
          Create an account
        </LoadingButton>
      </div>
    </form>
  )
}

export default AuthRegisterForm
