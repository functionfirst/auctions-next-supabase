import { useUser } from '@/contexts/UserContext'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

function AuthRequired({ children }) {
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [router, user])

  if (user) {
    return <>{children}</>
  }

  return null
}

export default AuthRequired
