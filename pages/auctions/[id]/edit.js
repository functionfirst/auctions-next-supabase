import { supabase } from '@/lib/initSupabase'
import { AuctionContextProvider } from '@/contexts/AuctionContext'
import AuctionImages from '@/components/AuctionImages'
import AuctionHead from '@/components/AuctionHead'
import AuctionEditForm from '@/components/AuctionEditForm'
import AuctionUploadImageForm from '@/components/AuctionUploadImageForm'

function EditAuction () {
  return (
    <AuctionContextProvider supabase={supabase}>
      <AuctionHead />

      <div className="bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid gap-6 grid-cols-3">
          <h1 className="font-semibold text-2xl mb-4 col-span-3">
            Edit Auction
          </h1>

          <div className="col-span-1">
            <h3 className="text-gray-700 font-medium text-lg">Auction Details</h3>

            <p className="text-sm text-gray-500">Manage the main properties of your auction</p>
          </div>

          <AuctionEditForm className="rounded-sm bg-white shadow-sm col-span-2" />

          <hr className="border-t border-gray-200 col-span-3" />

          <div className="col-span-1">
            <h3 className="text-gray-700 font-medium text-lg">Auction Images</h3>

            <p className="text-sm text-gray-500">Manage images for your auction</p>
          </div>

          <div className="bg-white p-6 rounded-sm shadow-sm col-span-2">
            <AuctionImages />

            <AuctionUploadImageForm />
          </div>
        </div>
      </div>
    </AuctionContextProvider>
  )
}

EditAuction.authRequired = true

export default EditAuction
