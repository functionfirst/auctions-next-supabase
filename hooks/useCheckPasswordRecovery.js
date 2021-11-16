import { useEffect } from 'react'
import { useRouter } from 'next/router'

function useCheckPasswordRecovery () {
  const router = useRouter()
  const { asPath } = router
  
  useEffect(() => {
    const recoverPassword = asPath.includes('recovery') || asPath.includes('magiclink')
    const params = asPath.replace('/#', '')

    if (recoverPassword) {
      router.push(`/new-password?${params}`)
    }
  }, [asPath, router])
}

export default useCheckPasswordRecovery
