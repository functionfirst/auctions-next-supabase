import 'tailwindcss/tailwind.css'
import { UserContextProvider } from '@/contexts/UserContext'
import { supabase } from '@/lib/initSupabase'
import Head from 'next/head'
import AuthRequired from '@/components/AuthRequired'
import LayoutDefault from '../components/Layout'

function MyApp({ Component, pageProps }) {
  const Layout = Component.layout || LayoutDefault
  let app = <Component {...pageProps} />

  if (Component.authRequired) {
    app = <AuthRequired>{app}</AuthRequired>
  }
1
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
          key="viewport"
        />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="description"
          content="Realtime Auctions app using next.js and supabase"
          key="description"
        />
      </Head>

      <UserContextProvider supabase={supabase}>
        <Layout {...pageProps}>
          {app}
        </Layout>
      </UserContextProvider>
    </>
  )
}

export default MyApp
