import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import BaseButtonRound from './BaseButtonRound'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (email) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signIn({ email })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleLogin(email)
          }}
        >
          <h1 className="font-semibold text-xl">Supabase + Next.js</h1>

          <p className="text-gray-500 mt-2">Sign in via magic link with your email below</p>

          <div>
            <input
              className="block border border-gray-300 w-full text-gray-700 rounded-sm py-3 px-4 mb-3 leading-tight focus:bg-white focus:border-gray-300"
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <BaseButtonRound
              color="primary"
              disabled={loading}
            >
              <span>{loading ? 'Loading' : 'Send magic link'}</span>
            </BaseButtonRound>
          </div>
        </form>
      </div>
    </div>
  )
}
