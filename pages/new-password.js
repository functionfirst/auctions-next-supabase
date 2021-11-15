import { useState } from 'react'
import { useRouter } from 'next/router'
import BaseLabel from '../components/BaseLabel'
import BaseInput from '../components/BaseInput'
import LayoutAuth from '../components/LayoutAuth'
import LoadingButton from '../components/LoadingButton'
import { supabase } from '../lib/initSupabase'
import { useUser } from '@/contexts/UserContext'

function ResetPasswordForm () {
  const { updatePassword } = useUser()
  const router = useRouter()
  const { access_token } = router.query
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')

  const updateUser = async event => {
    event.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const { error } = await updatePassword({ accessToken: access_token, password })

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
              type: 'password',
              onChange: (e) => setPassword(e.target.value)
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
    <LayoutAuth>
      <ResetPasswordForm />
    </LayoutAuth>
  )
}

export default NewPassword
