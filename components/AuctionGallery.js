import Image from 'next/image'

function Gallery ({ className, images }) {
  return (
    <div
      data-controller="gallery"
      data-gallery-target="carousel"
      data-gallery-current-slide-value="0"
      className={`${className} border-2 bg-gray-100 border-gray-200 flex flex-col items-center relative`}
      style={{ height: '500px' }}
    >
      <div className="flex w-full overflow-x-scroll snap-x">
        {images.map((image, index) => (
          <div
            id={`gallery-${index}`}
            key={index}
            data-gallery-target="image"
            className="flex flex-shrink-0 h-full items-center justify-center snap-start w-full"
          >
            <Image src={image} alt={auction.name} />
          </div>
        ))}
      </div>

      <div className="flex absolute bottom-16 items-center">
        {images.map((_image, index) => (
          <a
            key={index}
            data-action="gallery#selectIndicator"
            data-gallery-target="indicator"
            href={`#gallery-${index}`}
            className="border-2 border-white w-2 mr-2 h-2 text-gray-700 rounded-full bg-white flex justify-center items-center"
            data-turbolinks="false"
          >
            xx
          </a>
        ))}
      </div>
    </div>
  )
}

function AuctionGallery ({ images }) {
  return (
    <>
      <Gallery images={images} />
    </>
  )
}

export default AuctionGallery
