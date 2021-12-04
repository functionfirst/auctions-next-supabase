import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@/contexts/UserContext'

function Logout() {
  const { signout } = useUser()
  const router = useRouter()
  const [_error, setError] = useState(null)

  useEffect(() => {
    const logout = async () => {
      const [_data, signoutError] = await signout()

      if (signoutError) {
        setError(signoutError.message)
      } else {
        // @todo trigger a success toast message
        router.push('/')
      }
    }

    logout()
  }, [router, signout])

  return null
}

export default Logout
