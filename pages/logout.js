import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@/contexts/UserContext'

function Logout() {
  const { signout } = useUser()
  const router = useRouter()
  const [error, setError] = useState(null)

  useEffect(() => {
    logout()
  }, [])

  const logout = async () => {
    const [_data, signoutError] = await signout()

    if (signoutError) {
      setError(signoutError)
    } else {
      // @todo trigger a success toast message
      router.push('/')
    }
  }

  return null
}

export default Logout
