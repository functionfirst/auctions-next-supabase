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

  const buttonCss = ['inline-flex items-center relative']
  const loaderCss = ['transform transition-transform duration-300 ease-in-out']

  if (loading) {
    buttonCss.push('pl-16')
    loaderCss.push('-translate-x-6')
  }

  return (
    <BaseButtonRound
      color="primary"
      className={buttonCss.join(' ')}
      disabled={loading||disabled}
    >
      <span className={loaderCss.join(' ')}>
        {loader}
      </span>

      {spinner}
    </BaseButtonRound>
  )
}

export default LoadingButton
