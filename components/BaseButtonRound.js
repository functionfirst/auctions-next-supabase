import { loadGetInitialProps } from "next/dist/shared/lib/utils"

export default function BaseButtonRound({
  color = '',
  children,
  disabled = false,
  type = 'submit'
}) {
  const css = [
    color === 'primary' && !disabled ? 'bg-indigo-500 hover:bg-indigo-700 text-white' : null,
    color === 'secondary' && !disabled ? 'bg-gray-300 hover:bg-gray-500' : null,
    disabled ? 'cursor-not-allowed pointer-events-none bg-gray-300 text-gray-600' : null,
    'px-10 py-4 rounded-full uppercase tracking-wider font-semibold text-xs'
  ]

  return (
    <button
      type={type}
      className={css.join(' ')}
      disabled={disabled}
    >
      {children}
    </button>
  )
}