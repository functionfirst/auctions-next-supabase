import { supabase } from '@/lib/initSupabase'

function fetchDiscover({ from = 0, to = 9 } = {}) {
  return supabase
    .from('auctions')
    .select('id, name, slug, enabled, auction_images(public_url)')
    .eq('enabled', true)
    .range(from, to)
}

export { fetchDiscover }
