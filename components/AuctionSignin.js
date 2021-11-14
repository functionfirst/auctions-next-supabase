import { useRouter } from 'next/router'
import Link from 'next/link'
import { supabase } from '@/lib/initSupabase'

function AuctionSignin ({ className }) {
  const user = supabase.auth.user()
  const { asPath } = useRouter()

  if (user) {
    return null
  }

  return (
    <Link href={`/login?redirect=${asPath}`}>
      <a className={`${className} py-2 px-3 rounded-sm block text-center border-transparent bg-indigo-600 text-white hover:bg-indigo-800`}>
        Sign in to bid
      </a>
    </Link>
  )
}

export default AuctionSignin
