import { useAuction } from '@/contexts/AuctionContext'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { IconTrash, IconSpinner } from '@/components/Icon'

function ImageCard ({ src, isSelected, toggle }) {
  return (
    <div className="bg-white border border-gray-100 rounded relative shadow-sm">
      <div className={`${isSelected ? 'border-indigo-600' : null } border-2 border-transparent`}>
        <label className="cursor-pointer block p-2 inset-0 absolute z-10">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={toggle}
          />
        </label>

        <div className="h-32 relative w-full">
          <Image
            src={src}
            alt=""
            layout="fill"
          />
        </div>
      </div>
    </div>
  )
}

function AuctionImages ({ className = '' }) {
  const [error, setError] = useState(null)
  const { images, deleting, deleteImages, fetchAuctionImages } = useAuction()
  const [selected, setSelected] = useState([])

  const imageSelected = imageId => selected && selected.some(item => item.id === imageId)

  const remove = async () => {
    const [_data, deleteError] = await deleteImages(selected)

    if (deleteError) {
      // @todo display error message
      console.log(deleteError.message)
      setError(deleteError.message)
    } else {
      // @todo confirm deleted via snackbar
      setSelected([])
    }
  }

  const hasSelected = Object.keys(selected).length

  const toggle = (image) => {
    if (imageSelected(image.id)) {
      setSelected(prevState => prevState.filter(item => item.id !== image.id))
    } else {
      setSelected(prevState => [...prevState, image])
    }
  }

  useEffect(() => {
    fetchAuctionImages()
  }, [fetchAuctionImages])

  return (
    <div className={`${className} grid grid-cols-4 gap-6 mb-6`}>
      <div className="col-span-4 flex items-center justify-between -mb-2">
        <h4 className="font-medium text-lg">Current Images</h4>

        <button
          type="button"
          onClick={remove}
          className={`
            inline-flex justify-center items-center gap-1 px-3 py-2 text-sm font-medium border rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
            border-red-500 text-red-500 hover:text-red-800 hover:border-red-800 focus-visible:ring-red-500 
            ${hasSelected ? null : 'invisible'}
            ${deleting ? 'pointer-events-none': 'cursor-pointer'}
          `}
        >
          {
            deleting ?
            <IconSpinner className="h-5 w-5" /> :
            <IconTrash className="h-5 w-5" />
          }
          { deleting ? 'Deleting' : 'Delete selected'}
        </button>
      </div>

      {
        images.map(image =>
          <ImageCard
            key={image.id}
            src={image.src}
            isSelected={imageSelected(image.id)}
            toggle={() => toggle(image)}
          />
        )
      }
    </div>
  )
}

export default AuctionImages
