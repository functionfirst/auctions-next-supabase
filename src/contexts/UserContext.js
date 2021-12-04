import { createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext({ user: null, session: null })

export const UserContextProvider = (props) => {
  const { supabase } = props
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const session = supabase.auth.session()
    setSession(session)
    setUser(session?.user ?? null)

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
      }
    )

    return () => {
      authListener?.unsubscribe()
    }
  }, [])

  const resetPassword = async (email) => {
    const { data, error } = await supabase.auth.api.resetPasswordForEmail(email)

    if (error) {
      return [null, error.message]
    }

    return [data]
  }

  const signup = async ({ email, password, confirmPassword }) => {
    if (confirmPassword !== password) {
      return [null, 'Please confirm both your passwords are the same']
    }

    const { data, error } = await supabase.auth.signUp({ email, password })

    if (error) {
      return [null, error.message]
    }

    return [data]
  }

  const signin = async ({ email, password, redirect = '/' }) => {
    const { data, error } = await supabase.auth.signIn({ email, password })

    if (error) {
      return [null, error.message]
    }

    return [data]
  }
  
  const signout = async () => {
    const { data, error } = await supabase.auth.signOut()

    if (error) {
      return [null, error.message]
    }

    return [data]
  }

  const updatePassword = async ({ accessToken, password }) => {
    const { data, error } = await supabase.auth.api.updateUser(accessToken, { password })

    if (error) {
      return [null, error.message]
    }

    return [data]
  }

  const value = {
    session,
    user,
    user_id: user?.id,
    resetPassword,
    signup,
    signin,
    signout,
    updatePassword
  }

  return (
    <UserContext.Provider value={value} {...props} />
  )
}

export const useUser = () => {
  const context = useContext(UserContext)

  if (context === undefined) {
    throw new Error('useUser must be used within a UserContextProvider')
  }

  return context
}
