import { supabase } from '@/lib/initSupabase'

function fetchProfile(userId) {
  return supabase.from('profiles').select(`name`).eq('id', userId).single()
}

function updateProfile(payload, config) {
  return supabase.from('profiles').upsert(payload, config)
}

// Don't return the value after inserting
function updateProfileMinimal(payload) {
  return updateProfile(payload, {
    returning: 'minimal',
  })
}

export { fetchProfile, updateProfile, updateProfileMinimal }
