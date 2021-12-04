import { useRouter } from 'next/router'
import { useState } from 'react'
import { useAuction } from '@/contexts/AuctionContext'
import BaseButton from '@/components/BaseButton'
import { IconTrash } from '@/components/Icon'
import DialogDelete from '@/components/DialogDelete'
import { supabase } from '@/lib/initSupabase'

function DeleteButton({ openModal }) {
  return (
    <BaseButton
      color="red"
      className="flex items-center gap-2"
      type="button"
      onClick={openModal}
    >
      <IconTrash className="h-4 w-4" />
      Delete
    </BaseButton>
  )
}

function AuctionDelete({ className = '' }) {
  const router = useRouter()
  const { auction } = useAuction()
  const [isOpen, setIsOpen] = useState(false)

  const confirmDelete = async () => {
    const { error } = await supabase
      .from('auctions')
      .delete()
      .eq('id', auction.id)

    if (error) {
      throw new Error(error.message)
    }

    // @todo this is in the wrong place
    router.push('/my-auctions')
  }

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <div className={`${className} p-6 flex justify-end`}>
      {isOpen ? (
        <DialogDelete
          id="DeleteAuction"
          title="Delete this Auction"
          description="This action cannot be undone. This will permanently delete this auction as well as all current bids."
          onConfirm={confirmDelete}
          onCancel={closeModal}
        />
      ) : null}

      <DeleteButton openModal={openModal} />
    </div>
  )
}

export default AuctionDelete
