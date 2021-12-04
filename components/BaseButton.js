const colors = {
  gray: {
    solid: 'bg-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
    bordered:
      'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
    text: 'text-gray-700 hover:text-gray-900 focus:ring-gray-500',
  },
  red: {
    solid: 'bg-red-600 hover:bg-red-800 text-white focus:ring-red-500',
    bordered:
      'border border-red-600 hover:border-red-800 text-red-600 hover:text-red-800 focus:ring-red-500',
    text: 'text-red-600 hover:text-red-800 focus:ring-red-500',
  },
  indigo: {
    // w-full items-center inline-flex justify-center rounded-sm border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm
    solid: 'bg-indigo-600 hover:bg-indigo-800 text-white focus:ring-indigo-500',
    bordered:
      'border border-indigo-600 text-indigo-600 hover:border-indigo-800 hover:text-indigo-800 focus:ring-indigo-500',
    text: 'text-indigo-600 hover:text-indigo-800 focus:ring-indigo-500',
  },
}

const sizes = {
  xs: 'px-2 py-1 rounded-xs text-xs',
  sm: 'px-4 py-2 rounded-sm text-sm',
  md: 'px-6 py-3 rounded-sm text-base',
  lg: 'px-8 py-4 rounded-sm text-lg',
}

function BaseButton({
  color = 'gray',
  children,
  fullWidth = false,
  size = 'md',
  variant = 'solid',
  className = '',
  disabled = false,
  type = 'submit',
  leftIcon,
  rightIcon,
  loading,
  loadingText = '',
  ...props
}) {
  const css = [
    'inline-flex items-center font-medium focus:outline-none focus:ring-2 focus:ring-offset-2',
    className,
  ]
  css.push(colors[color][variant])
  css.push(sizes[size])

  if (disabled) {
    css.push('cursor-not-allowed pointer-events-none opacity-75')
  }

  return (
    <button
      type={type}
      className={css.join(' ')}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export default BaseButton
