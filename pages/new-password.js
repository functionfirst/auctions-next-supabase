import { useState } from 'react'
import { useRouter } from 'next/router'
import BaseLabel from '../components/BaseLabel'
import BaseInput from '../components/BaseInput'
import LayoutBase from '../components/LayoutBase'
import LoadingButton from '../components/LoadingButton'
import { supabase } from '../lib/initSupabase'

function ResetPasswordForm () {
  const router = useRouter()
  const { access_token } = router.query
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const updateUser = async event => {
    event.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const password = event.target.password.value

      const { error } = await supabase.auth.api.updateUser(
        access_token,
        {
          password
        }
      )

      if (error) {
        throw new Error(error.message)
      }

      // @todo trigger a success toast message
      router.push('/')
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
        Set your password
      </h1>

      <form
        className="w-full max-w-lg mt-6"
        onSubmit={updateUser}
      >
        <BaseLabel
          htmlFor="newPassword"
          className="mb-2"
        >
          Enter your new password
        </BaseLabel>

        <BaseInput
          attributes={
            {
              id: 'newPassword',
              name: 'password',
              type: 'password'
            }
          }
        />

        {errorMessage}

        <div className="text-center mt-6">
          <LoadingButton loading={loading}>
            Set Password
          </LoadingButton>
        </div>
      </form>
    </div>
  )
}

function NewPassword () {
  return (
    <LayoutBase>
      <ResetPasswordForm />
    </LayoutBase>
  )
}

export default NewPassword
