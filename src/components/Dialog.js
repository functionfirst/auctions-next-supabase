function Dialog({ children, id, onCancel }) {
  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby={id}
      aria-modal="true"
      role="dialog"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          onClick={onCancel}
        />

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &ZeroWidthSpace;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          {children}
        </div>
      </div>
    </div>
  )
}

function DialogIcon({ color, icon }) {
  const bg = `bg-${color}-100`
  return (
    <div
      className={`${bg} mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10`}
    >
      {icon}
    </div>
  )
}

function DialogBody({ children }) {
  return (
    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div className="sm:flex sm:items-start">{children}</div>
    </div>
  )
}

function DialogTitle({ children }) {
  return (
    <h3 className="text-lg leading-6 font-medium text-gray-900">{children}</h3>
  )
}

function DialogDescription({ children }) {
  return (
    <div className="mt-2">
      <p className="text-sm text-gray-500">{children}</p>
    </div>
  )
}

function DialogFooter({ children }) {
  return (
    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-3">
      {children}
    </div>
  )
}

Dialog.Body = DialogBody
Dialog.Icon = DialogIcon
Dialog.Description = DialogDescription
Dialog.Title = DialogTitle
Dialog.Footer = DialogFooter

export default Dialog
