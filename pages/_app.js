import 'tailwindcss/tailwind.css'
import { UserContextProvider } from '@/contexts/UserContext'
import { AppContextProvider } from '@/contexts/AppContext'
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
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

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
