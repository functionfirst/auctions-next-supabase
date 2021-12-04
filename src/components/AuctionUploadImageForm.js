import UploadButton from '@/components/UploadButton'
import { useAuction } from '@/contexts/AuctionContext'

function AuctionUploadImageForm () {
  const { uploading, uploadImage } = useAuction()

  async function upload (e) {
    e.preventDefault()

    if (!e.target.files.length) {
      return
    }

    const [file] = e.target.files
    const [data, error] = await uploadImage(file)

    if (error) {
      // @todo add error alert
      console.log(error)
    } else {
      // @todo add snackbar alert
      console.log('success', data)
    }
  }

  return (
    <UploadButton
      onUpload={upload}
      accept="image/jpeg, image/png"
      acceptString="PNG, JPG up to 10MB"
      loading={uploading}
    />
  )
}

export default AuctionUploadImageForm
