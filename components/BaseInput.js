function BaseInput ({
  value,
  onChange,
  className = '',
  type = 'text',
  ...inputProps
}) {
  return (
    <input
      value={value}
      onChange={onChange}
      type={type}
      className={`${className} block border shadow-sm border-gray-300 w-full text-gray-700 rounded-sm py-3 px-4 leading-tight focus:bg-white focus:border-gray-300`}
      {...inputProps}
    />
  )
}

export default BaseInput
