import { useState, useEffect } from 'react'
import { supabase } from '@/lib/initSupabase'
import BaseLabel from '@/components/BaseLabel'
import BaseInput from '@/components/BaseInput'
import LoadingButton from '../components/LoadingButton'
import { executeAsync } from '@/handlers/exceptions'
import { useUser } from '@/contexts/UserContext'

export default function AccountProfile() {
  const { user } = useUser()
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [error, setError] =  useState(null)


  useEffect(() => {
    const fetchProfileData = async () => {
      return await supabase.from('profiles').select(`name`).eq('id', user.id).single()
    }

    const fetchData = async () => {
      setLoading(true)
      const [res, err] = await executeAsync(fetchProfileData)
  
      if (err) {
        setError(err)
      } else {
        const { name } = res.data
        setName(name)
      }
  
      setLoading(false)
    }

    fetchData()
  }, [user.id])

  async function updateProfileData (payload) {
    return await supabase.from('profiles').upsert(payload, {
      returning: 'minimal' // Don't return the value after inserting
    })
  }

  async function updateProfile(e) {
    e.preventDefault()
    setLoading(true)

    const updates = {
      id: user.id,
      name: e.target.name.value,
      updated_at: new Date()
    }

    const [_res, err] = await executeAsync(updateProfileData, updates)
    if (err) { setError(err) }
    setLoading(false)
  }

  return (
    <form onSubmit={updateProfile} className="flex">
      <div className="flex-1">
        <BaseLabel
          htmlFor="name"
          className="mb-2"
        >
          Name
        </BaseLabel>

        <BaseInput
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        
        <div className="text-center mt-6">
          <LoadingButton loading={loading}>
            Update
          </LoadingButton>
        </div>
      </div>
    </form>
  )
}
