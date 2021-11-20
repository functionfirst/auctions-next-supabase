import { supabase } from '@/lib/initSupabase'

export function getPublicUrl (imageUrl) {
  const { publicURL } = supabase.storage.from('auction-images').getPublicUrl(imageUrl)
  return publicURL ?? null
}
