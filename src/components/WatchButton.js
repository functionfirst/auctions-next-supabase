import { IconHeart, IconHeartFull, IconSpinner } from '@/components/Icon'
import { useWatch } from '@/contexts/WatchContext'

function WatchButton () {
  const { loading, watching, toggleWatch } = useWatch()

  const classes = ['flex gap-2 items-center justify-center shadow-sm border py-1.5 px-3 text-sm rounded-sm shadow-sm']
  let icon, text

  if (watching) {
    classes.push('border-transparent bg-indigo-600 text-white hover:bg-indigo-800')
    icon = <IconHeartFull className="w-4 h-4" />
    text = 'Added to Watchlist'
  } else {
    classes.push('border-indigo-600 bg-white text-indigo-600 hover:text-indigo-900 hover:border-indigo-900')
    icon = <IconHeart className="w-4 h-4" />
    text = 'Add to Watchlist'
  }

  if (loading) {
    icon = <IconSpinner className="w-4 h-4" />
  }

  return (
    <button
      type="button"
      disabled={loading}
      className={classes.join(' ')}
      onClick={toggleWatch}
    >
      {icon}
      {text}
    </button>
  )
}

export default WatchButton
