function BaseLabel ({ className = '', children, htmlFor }) {
  return (
    <label
      className={`${className} ${ htmlFor ? 'cursor-pointer' : null } inline-block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1`}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  )
}

export default BaseLabel
