import BaseButtonRound from './BaseButtonRound'
import { IconSpinner } from './Icon'

function LoadingButton ({
  disabled = false,
  loading = false,
  children = null,
  loadingText = 'Loading...'
}) {
  const loader = loading ? loadingText : children

  const spinner = loading ? <IconSpinner className="h-4 w-4 absolute right-6" /> : null

  return (
    <BaseButtonRound
      color="primary"
      className={`
        inline-flex items-center relative
        ${loading ? 'pl-16' : null }
      `}
      disabled={loading||disabled}
    >
      <span className={`transform transition-transform duration-300 ease-in-out ${loading ? '-translate-x-6' : null }`}>
        {loader}
      </span>

      {spinner}
    </BaseButtonRound>
  )
}

export default LoadingButton
