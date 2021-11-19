function BaseInput ({ type, attributes, className }) {
  return (
    <input
      type={type||'text'}
      className={`${className} block border shadow-sm border-gray-300 w-full text-gray-700 rounded-sm py-3 px-4 leading-tight focus:bg-white focus:border-gray-300`}
      {...attributes}
    />
  )
}

export default BaseInput
