import { IconCloudUpload, IconSpinner } from '@/components/Icon'

function UploadButton ({ onUpload, loading }) {
  return (
    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border border-gray-300 border-dashed rounded-md">
      <div className="space-y-1 text-center">
        {
          loading ?
          <IconSpinner className="mx-auto h-12 w-12 text-gray-400" /> :
          <IconCloudUpload className="mx-auto h-12 w-12 text-gray-400" />
        }

        <div className="flex text-sm text-gray-600 gap-1">
          <label
            htmlFor="file-upload"
            className={`
              ${loading ? 'pointer-events-none' : 'cursor-pointer' }
              font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500
            `}
          >
            <span>Upload a file</span>

            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
              accept="image/jpeg, image/png"
              onChange={onUpload}
              disabled={loading}
            />
          </label>

          <p><strike>or drag and drop</strike></p>
        </div>

        <p className="text-xs text-gray-500">
          PNG, JPG up to 10MB
        </p>
      </div>
    </div>
  )
}

export default UploadButton
