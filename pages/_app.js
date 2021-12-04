import 'tailwindcss/tailwind.css'
import { UserContextProvider } from '@/contexts/UserContext'
import { AppContextProvider } from '@/contexts/AppContext'
import { supabase } from '@/lib/initSupabase'
import AuthRequired from '@/components/AuthRequired'
import LayoutDefault from '@/components/Layout'
import Meta from '@/components/Meta'

function MyApp({ Component, pageProps }) {
  const Layout = Component.layout || LayoutDefault
  let app = <Component {...pageProps} />

  if (Component.authRequired) {
    app = <AuthRequired>{app}</AuthRequired>
  }

  return (
    <>
      <Meta />

      <AppContextProvider>
        <UserContextProvider supabase={supabase}>
          <Layout {...pageProps}>
            {app}
          </Layout>
        </UserContextProvider>
      </AppContextProvider>
    </>
  )
}

export default MyApp
