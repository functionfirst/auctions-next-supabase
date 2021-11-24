import { useState } from 'react'
import Image from 'next/image'

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
            <Image
              src={image.public_url}
              alt=''
              width="64"
              height="64"
              layout="intrinsic"
              quality="10"
              placeholder="blur"
              blurDataURL={BlurData}
              priority
            />

            <span className="sr-only">Display Image</span>
          </button>
        ))}
      </div>

      <div className="border border-gray-50 shadow-sm">
        <Image
          src={preview.public_url}
          alt=''
          width="512"
          height="512"
          layout="intrinsic"
          quality="10"
          placeholder="blur"
          blurDataURL={BlurData}
          priority
        />
      </div>
    </div>
  )
}

export default AuctionGallery
