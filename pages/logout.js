import { useEffect, useState } from 'react'
import { supabase } from '../lib/initSupabase'
import { useRouter } from 'next/router'

function Logout() {
  const router = useRouter()
  const [error, setError] = useState(null)

  useEffect(() => {
    signout()
  }, [])

  const signout = async () => {
    try {
      const { error } = await supabase.auth.signOut()

      if (error) {
        throw new Error(error.message)
      }

      // @todo trigger a success toast message
      router.push('/')
    } catch (error) {
      setError(error.message)
    }
  }

  return null
}

export default Logout
