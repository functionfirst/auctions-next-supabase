function BaseInput ({ value, type, attributes }) {
  return (
    <input
      type={type||'text'}
      value={value}
      className="block border border-gray-300 w-full text-gray-700 rounded-sm py-3 px-4 mb-3 leading-tight focus:bg-white focus:ring-indigo-500 focus:border-indigo-500"
      {...attributes}
    />
  )
}

export default BaseInput
