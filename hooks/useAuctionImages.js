import { useEffect, useState } from 'react'
import { supabase } from '@/lib/initSupabase'

async function fetchCurrentImages (auctionId) {
  const { data, error } = await supabase.from('auction_images').select('id, image_url').eq('auction_id', auctionId)

  if (error) {
    throw error
  }

  return data
}

function fetchPublicUrl ({ image_url }) {
  const { publicURL, error} = supabase.storage.from('auction-images').getPublicUrl(image_url)

  if (error) {
    throw error
  }

  return publicURL
}

function useAuctionImages(auctionId) {
  const [error, setError] = useState(null)
  const [images, setImages] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCurrentImages(auctionId)
        const sources = data.map(fetchPublicUrl)
        setImages(sources)
      } catch (err) {
        setError(err.message)
      }
    }

    fetchData()
  }, [auctionId])

  return {
    error,
    images
  }
}

export default useAuctionImages
