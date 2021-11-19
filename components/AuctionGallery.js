import { useEffect, useState } from 'react'
import Image from 'next/image'
import { supabase } from '@/lib/initSupabase'

function GalleryImage ({ imageUrl, size = 64 }) {
  const [src, setSrc] = useState('')

  useEffect(() => {
    const fetchImage = () => {
      const { publicURL, error} = supabase.storage.from('auction-images').getPublicUrl(imageUrl)

      if (error) {
        throw error
      }

      setSrc(publicURL)
    }

    fetchImage()
  }, [imageUrl])

  if (!src) {
    return null
  }

  return (
    <Image
      src={src}
      alt=''
      width={size}
      height={size}
      layout="intrinsic"
    />
  )
}

function AuctionGallery ({ className = '', images }) {
  const [preview, setPreview] = useState(images[0])

  return (
    <div className={`${className} flex gap-6 items-start`}>
      <div className="flex flex-col gap-6">
        {images.map(image => (
          <button
            key={image.id}
            onClick={() => setPreview(image)}
          >
            <GalleryImage imageUrl={image.image_url} />
            <span class="sr-only">Display Image</span>
          </button>
        ))}
      </div>

      <div className="border border-gray-50 shadow-sm">
        <GalleryImage
          size="512"
          imageUrl={preview.image_url}
        />
      </div>
    </div>
  )
}

export default AuctionGallery
