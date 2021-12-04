import Image from 'next/image'
import Link from 'next/link'
import { BlurData } from '@/components/BlurImage'

export default function Card({ href, className = '', title, children }) {
  return (
    <Link href={href}>
      <a
        title={title}
        className={`shadow-sm rounded p-3 border border-gray-100 ${className}`}
      >
        {children}
      </a>
    </Link>
  )
}

function CardTitle({ className = '', children }) {
  return (
    <h2 className={`text-lg font-medium overflow-ellipsis overflow-hidden sm:truncate ${className}`}>
      {children}
    </h2>
  )
}

function CardImage({ imageUrl, name }) {
  if (!imageUrl) {
    return null
  }

  return (
    <Image
      src={imageUrl}
      title={name}
      alt={name}
      width="250"
      height="250"
      layout="intrinsic"
      placeholder="blur"
      blurDataURL={BlurData}
      priority
    />
  )
}

Card.Image = CardImage
Card.Title = CardTitle
