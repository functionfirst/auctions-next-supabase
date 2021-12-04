import { supabase } from '../lib/initSupabase'
import { useRouter } from 'next/router'
import { useUser } from '@/contexts/UserContext'
import { WatchContextProvider } from '@/contexts/WatchContext'
import WatchButton from '@/components/WatchButton'

function AuctionWatch () {
  const { user_id } = useUser()
  const router = useRouter()
  const { auction_id } = router.query

  return (
    <WatchContextProvider
      auction_id={auction_id}
      supabase={supabase}
      user_id={user_id}
    >
      {user_id ? <WatchButton /> : null }
    </WatchContextProvider>
  )
}

export default AuctionWatch
