import 'tailwindcss/tailwind.css'
import { UserContextProvider } from '@/contexts/UserContext'
import { supabase } from '@/lib/initSupabase'

function MyApp({ Component, pageProps }) {
  return (
    <UserContextProvider supabase={supabase}>
      <Component {...pageProps} />
    </UserContextProvider>
  )
}

export default MyApp
