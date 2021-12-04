import { useState, useEffect } from 'react'
import BaseLabel from '@/components/BaseLabel'
import BaseInput from '@/components/BaseInput'
import LoadingButton from '../components/LoadingButton'
import { executeAsync } from '@/handlers/exceptions'
import { useUser } from '@/contexts/UserContext'
import { fetchProfile, updateProfileMinimal } from '@/lib/useProfile'

export default function AccountProfile() {
  const { user, user_id } = useUser()
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      const [data, fetchError] = await executeAsync(fetchProfile, user_id)

      if (fetchError) {
        setError(fetchError.message)
      } else {
        setName(data.name)
      }

      setLoading(false)
    }

    fetchData()
  }, [user_id])

  async function saveProfile(e) {
    e.preventDefault()
    setLoading(true)

    const updates = {
      id: user.id,
      name: e.target.name.value,
      updated_at: new Date(),
    }

    const [_data, updateError] = await executeAsync(
      updateProfileMinimal,
      updates
    )

    if (updateError) {
      setError(updateError.message)
    }

    setLoading(false)
  }

  return (
    <form onSubmit={saveProfile} className="flex">
      <div className="flex-1">
        <BaseLabel htmlFor="name" className="mb-2">
          Name
        </BaseLabel>

        <BaseInput
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {error}

        <div className="text-center mt-6">
          <LoadingButton loading={loading}>Update</LoadingButton>
        </div>
      </div>
    </form>
  )
}
