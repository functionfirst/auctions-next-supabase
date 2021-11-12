import { useState } from 'react'
import BaseLabel from '../components/BaseLabel'
import BaseInput from '../components/BaseInput'
import LayoutAuth from '../components/LayoutAuth'
import LoadingButton from '../components/LoadingButton'
import { supabase } from '../lib/initSupabase'

function ForgotPasswordForm () {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const resetPassword = async event => {
    event.preventDefault()
    const email = event.target.resetEmail.value

    setError(null)
    setLoading(true)

    try {
      const { error } = await supabase.auth.api.resetPasswordForEmail(email)

      if (error) {
        throw new Error(error.message)
      }

      // @todo trigger a success toast message
      alert('Check your email for a password recovery link')
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
      <h1 className="font-semibold text-xl">
        Forgot your password?
      </h1>

      <p className="text-gray-500 mt-2">
        Enter the email associated with your account and we'll send an email with a link to reset your password.
      </p>

      <form
        className="w-full max-w-lg mt-6"
        onSubmit={resetPassword}
      >
        <BaseLabel
          htmlFor="resetEmail"
          className="mb-2"
        >
          Email Address
        </BaseLabel>

        <BaseInput
          attributes={
            {
              id: 'resetEmail',
              name: 'resetEmail',
              type: 'email',
              placeholder: 'your@email.com',
              required: true
            }
          }
        />

        {errorMessage}

        <div className="text-center mt-6">
          <LoadingButton loading={loading}>
            Reset Password
          </LoadingButton>
        </div>
      </form>
    </div>
  )
}

function ForgotPassword() {
  return (
    <LayoutAuth>
      <ForgotPasswordForm />
    </LayoutAuth>
  )
}

export default ForgotPassword
