import { createContext, useContext, useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@/contexts/UserContext'
import parseISO from 'date-fns/parseISO'
import format from 'date-fns/format'

const AuctionContext = createContext({ user: null, session: null })

export const AuctionContextProvider = (props) => {
  const router = useRouter()
  const { user } = useUser()
  const { auction_id } = router.query
  const { supabase } = props
  const [auction, setAuction] = useState({})
  const [images, setImages] = useState([])
  const [deleting, setDeleting] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  const normaliseAuctionData = useCallback((auction) => {
    auction.created_at = format(parseISO(auction.created_at), "io MMM yyyy 'at' HH:mm")
    auction.updated_at = format(parseISO(auction.updated_at), "io MMM yyyy 'at' HH:mm")
    auction.start_date = format(parseISO(auction.start_date), "yyyy-MM-dd'T'hh:mm")
    auction.end_date = format(parseISO(auction.end_date), "yyyy-MM-dd'T'hh:mm")
    setAuction(auction)
  }, [])

  function fetchPublicUrl ({ id, image_url }) {
    const { publicURL, error } = supabase.storage.from('auction-images').getPublicUrl(image_url)

    if (error) {
      throw error
    }

    return {
      id,
      image_url,
      src: publicURL
    }
  }

  async function uploadImage (file) {
    try {
      setUploading(true)

      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const image_url = `${user.id}/${auction_id}/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('auction-images')
        .upload(image_url, file)

      if (uploadError) {
        throw uploadError
      }

      let { error: updateError } = await supabase.from('auction_images').upsert({
        auction_id,
        image_url
      })

      if (updateError) {
        throw updateError
      }

      const [data, fetchError] = await fetchAuctionImages()

      if (fetchError) {
        throw fetchError
      }

      return [data]
    } catch (error) {
      return [null, error.message]
    } finally {
      setUploading(false)
    }
  }

  async function deleteImages (images) {
    try {
      setDeleting(true)

      const urls = images.map(image => image.image_url)
      const { data: storageData, error: storageError } = await supabase.storage.from('auction-images').remove(urls)

      if (storageError) {
        throw storageError
      }

      const ids = images.map(image => image.id)
      const { error: deleteError } = await supabase.from('auction_images').delete().in('id', ids)

      if (deleteError) {
        throw deleteError
      }

      const [data, fetchError] = await fetchAuctionImages()

      if (fetchError) {
        throw fetchError
      }

      return [data]
    } catch (error) {
      return [null, error.message]
    } finally {
      setDeleting(false)
    }
  }

  async function fetchAuctionImages () {
    try {
      setLoading(true)

      const { data, error } = await supabase.from('auction_images').select('id, image_url').eq('auction_id', auction_id)

      if (error) {
        throw error.message
      }

      const sources = data.map(fetchPublicUrl)
      setImages(sources)
      return [data]
    } catch (error) {
      return [null, error.message]
    } finally {
      setLoading(false)
    }
  }

  async function fetchAuction () {
    try {
      setLoading(true)

      // @todo secure this to the loggedin user
      const { data, error } = await supabase.rpc('auction_by_id', { auction_id })

      if (error) {
        throw error
      }

      const auctions = normaliseAuctionData(data)

      return [auctions]
    } catch (error) {
      return [null, error.message]
    } finally {
      setLoading(false)
    }
  }

  async function saveAuction(formData) {
    try {
      setSaving(true)

      const { data, error } = await supabase.from('auctions').update(formData).eq('id', auction_id).eq('owner_id', user.id)

      if (error) {
        throw error
      }

      return [data]
    } catch (error) {
      return [null, error.message]
    } finally {
      setSaving(false)
    }
  }

  const value = {
    auction,
    deleteImages,
    deleting,
    images,
    fetchAuctionImages,
    fetchAuction,
    saveAuction,
    saving,
    setAuction,
    loading,
    uploading,
    uploadImage
  }

  return (
    <AuctionContext.Provider value={value} {...props} />
  )
}

export const useAuction = () => {
  const context = useContext(AuctionContext)

  if (context === undefined) {
    throw new Error('useAuction must be used within a AuctionContextProvider')
  }

  return context
}
