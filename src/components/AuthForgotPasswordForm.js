import { useState } from 'react'
import { useUser } from '@/contexts/UserContext'
import BaseLabel from '../components/BaseLabel'
import BaseInput from '../components/BaseInput'
import LoadingButton from '../components/LoadingButton'

function AuthForgotPasswordForm () {
  const { resetPassword } = useUser()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const submit = async e => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const [_data, resetError] = await resetPassword(email)

    if (resetError) {
      setError(resetError)
    } else {
      // @todo trigger a success toast message
      alert('Check your email for a password recovery link')
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
      <BaseLabel
        htmlFor="resetEmail"
        className="mb-2"
      >
        Email Address
      </BaseLabel>

      <BaseInput
        id="resetEmail"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
      />

      {errorMessage}

      <div className="text-center mt-6">
        <LoadingButton loading={loading}>
          Reset Password
        </LoadingButton>
      </div>
    </form>
  )
}

export default AuthForgotPasswordForm
