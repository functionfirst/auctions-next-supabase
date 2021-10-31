import { useEffect } from 'react'
import { useRouter } from 'next/router'

function CheckPasswordRecovery () {
  const router = useRouter()
  const { asPath } = router
  const recoverPassword = asPath.includes('recovery') || asPath.includes('magiclink')
  const params = asPath.replace('/#', '')

  useEffect(() => {
    if (recoverPassword) {
      router.push(`/new-password?${params}`)
    }
  }, [])

  return null
}

export default CheckPasswordRecovery
