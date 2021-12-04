import { supabase } from '@/lib/initSupabase'
import { AuctionContextProvider } from '@/contexts/AuctionContext'
import AuctionAddForm from '@/components/AuctionAddForm'
import AuctionHead from '@/components/AuctionHead'

function CreateAuction() {
  return (
    <>
      <AuctionContextProvider supabase={supabase}>
        <AuctionHead />

        <div className="bg-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid gap-6 grid-cols-3">
            <h1 className="font-semibold text-2xl mb-4 col-span-3">
              Create an Auction
            </h1>

            <div className="col-span-1">
              <h3 className="text-gray-700 font-medium text-lg">
                Auction Details
              </h3>

              <p className="text-sm text-gray-500">
                Manage the main properties of your auction
              </p>
            </div>

            <AuctionAddForm className="rounded-sm bg-white shadow-sm col-span-2" />
          </div>
        </div>
      </AuctionContextProvider>
    </>
  )
}

CreateAuction.authRequired = true

export default CreateAuction
