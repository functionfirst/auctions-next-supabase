import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@/contexts/UserContext'
import parseISO from 'date-fns/parseISO'
import format from 'date-fns/format'

const AuctionContext = createContext({ user: null, session: null })

export const AuctionContextProvider = (props) => {
  const router = useRouter()
  const { user } = useUser()
  const auction_id = router.query.id
  const { supabase } = props
  const [auction, setAuction] = useState({})
  const [images, setImages] = useState([])
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [dirtyAuction, setDirtyAuction] = useState({})

  const normaliseAuctionData = useCallback((auction) => {
    auction.created_at = format(parseISO(auction.created_at), "io MMM yyyy 'at' HH:mm")
    auction.updated_at = format(parseISO(auction.updated_at), "io MMM yyyy 'at' HH:mm")
    auction.start_date = format(parseISO(auction.start_date), "yyyy-MM-dd'T'hh:mm")
    auction.end_date = format(parseISO(auction.end_date), "yyyy-MM-dd'T'hh:mm")
    setAuction(auction)
  }, [])

  function fetchPublicUrl ({ id, image_url }) {
    const { publicURL, error} = supabase.storage.from('auction-images').getPublicUrl(image_url)

    if (error) {
      throw error
    }

    return {
      id,
      src: publicURL
    }
  }

  async function uploadImage (file) {
    setUploading(true)

    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const image_url = `${user.id}/${auction_id}/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('auction-images')
      .upload(image_url, file)

    if (uploadError) {
      return [null, uploadError.message]
    }

    let { error: updateError } = await supabase.from('auction_images').upsert({
      auction_id,
      image_url
    })
    
    if (updateError) {
      return [null, updateError.message]
    }

    const [data, fetchError] = await fetchAuctionImages()

    if (fetchError) {
      return [null, fetchError.message]
    }

    setUploading(false)

    return [data]
  }

  async function deleteImages (images) {
    const src = images.map(image => image.src)
    const ids = images.map(image => image.id)

    try {
      const { error: storageError } = await supabase
        .storage
        .from('auction-images')
        .remove(src)

      if (storageError) {
        throw storageError
      }

      const { deleteError } = await supabase
        .from('auction_images')
        .delete()
        .in('id', ids)

      if (deleteError) {
        throw deleteError
      }

      fetchAuctionImages()
    } catch (err) {
      setError(err.message)
    }
  }

  async function fetchAuctionImages () {
    // try {
    const { data, error } = await supabase.from('auction_images').select('id, image_url').eq('auction_id', auction_id)

    if (error) {
      return [null, error.message]
    }

    const sources = data.map(fetchPublicUrl)
    setImages(sources)
    return [data]
    // } catch (err) {
    //   setError(err.message)
    // }
  }

  async function fetchAuction () {
    // @todo secure this to the loggedin user
    const { data, error: err } = await supabase.rpc('auction_by_id', { auction_id })

    if (err) {
      console.log(err.message)
    } else {
      normaliseAuctionData(data)
    }
  }

  async function saveAuction() {
    setError(null)
    setSaving(true)

    const isFormDirty = Boolean(Object.values(dirtyAuction).length)

    if (!isFormDirty) {
      console.log('Do not submit. Form isn\'t dirty')
      return
    }

    const { data, error: err } = await supabase.from('auctions').update(payload).eq('id', auction_id).eq('owner_id', user.id, dirtyAuction)

    if (err) {
      console.log(err.message)
    } else {
      setDirtyAuction({})
    }

    setSaving(false)
  }

  const value = {
    auction,
    deleteImages,
    error,
    images,
    fetchAuctionImages,
    fetchAuction,
    saveAuction,
    saving,
    setAuction,
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
