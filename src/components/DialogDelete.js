import { IconWarning } from '@/components/Icon'
import Dialog from '@/components/Dialog'
import BaseButton from '@/components/BaseButton'

function DialogDelete({
  id = 'modal',
  title = '',
  description = '',
  onConfirm,
  onCancel,
}) {
  return (
    <Dialog id={id} onCancel={onCancel}>
      <Dialog.Body>
        <Dialog.Icon
          color="red"
          icon={<IconWarning className="h-6 w-6 text-red-600" />}
        />

        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <Dialog.Title
            id={id}
            className="text-lg leading-6 font-medium text-gray-900"
          >
            {title}
          </Dialog.Title>

          <Dialog.Description>{description}</Dialog.Description>
        </div>
      </Dialog.Body>

      <Dialog.Footer>
        <BaseButton
          size="sm"
          color="red"
          variant="solid"
          type="button"
          onClick={onConfirm}
        >
          Delete
        </BaseButton>

        <BaseButton size="sm" color="gray" variant="link" onClick={onCancel}>
          Cancel
        </BaseButton>
      </Dialog.Footer>
    </Dialog>
  )
}

export default DialogDelete
