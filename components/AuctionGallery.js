import { useState } from 'react'
import Image from 'next/image'

function GalleryImage ({ src, size = 64 }) {
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
            <GalleryImage src={image.public_url} />
            <span className="sr-only">Display Image</span>
          </button>
        ))}
      </div>

      <div className="border border-gray-50 shadow-sm">
        <GalleryImage
          size="512"
          src={preview.public_url}
        />
      </div>
    </div>
  )
}

export default AuctionGallery
