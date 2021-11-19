import UploadButton from '@/components/UploadButton'
import { useAuction } from '@/contexts/AuctionContext'

function AuctionUploadImageForm () {
  const { uploading, uploadImage } = useAuction()

  async function upload (e) {
    e.preventDefault()

    if (!e.target.files || e.target.files.length == 0) {
      throw 'You must select an image to upload.'
    }

    const file = e.target.files[0]
    const [data, error] = await uploadImage(file)

    if (error) {
      // @todo add error alert
      console.log('error')
    } else {
      // @todo add snackbar alert
      console.log('success', data)
    }
  }

  return (
    <UploadButton
      onUpload={upload}
      loading={uploading}
    />
  )
}

export default AuctionUploadImageForm
