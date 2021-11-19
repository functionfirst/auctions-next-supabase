import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const AppContext = createContext()

export const AppContextProvider = (props) => {
  const router = useRouter()
  const [navActive, setNavActive] = useState(false)

  const toggleNav = () => {
    setNavActive(prevState => !prevState)
  }

  useEffect(() => {
    console.log('effect')
    if (navActive) {
      setNavActive(!navActive)
    }
  }, [router.asPath])

  const value = {
    navActive,
    toggleNav
  }

  return (
    <AppContext.Provider value={value} {...props} />
  )
}

export const useApp = () => {
  const context = useContext(AppContext)

  if (context === undefined) {
    throw new Error('useApp must be used within a AppContextProvider')
  }

  return context
}
