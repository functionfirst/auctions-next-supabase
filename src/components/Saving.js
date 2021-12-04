import { IconSpinner } from '@/components/Icon'

function Saving ({
  saving,
  savingText = 'Saving...'
}) {
  if (!saving) {
    return null
  }

  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-12 py-6 text-sm text-white bg-indigo-900 rounded-md shadow-sm">
        <IconSpinner className="h-5 w-5" />
        {savingText}
    </div>
  )
}

export default Saving
