import { useRouter } from 'next/router'
import { useState } from 'react'
import { useUser } from '@/contexts/UserContext'
import BaseLabel from '../components/BaseLabel'
import BaseInput from '../components/BaseInput'
import LoadingButton from '../components/LoadingButton'

function AuthResetPasswordForm () {
  const { updatePassword } = useUser()
  const router = useRouter()
  const { access_token } = router.query
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')

  const submit = async e => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const [_data, updateError] = await updatePassword({
      accessToken: access_token,
      password
    })

    if (updateError) {
      setError(updateError)
    } else {
      // @todo trigger a success toast message
      alert('Your password has been reset')
      // router.push('/')
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
            value: password,
            onChange: (e) => setPassword(e.target.value),
            required: true
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
  )
}

export default AuthResetPasswordForm
