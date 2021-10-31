function BaseLabel ({ className = '', children, htmlFor }) {
  return (
    <label
      className={`${className} ${ htmlFor ? 'cursor-pointer' : null } block uppercase tracking-wide text-gray-700 text-xs font-bold`}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  )
}

export default BaseLabel
