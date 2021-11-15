function BaseInput ({ attributes, className = '', children }) {
  const toggle = ['w-14 rounded-full shadow-sm p-0.5']
  const switcher = ['block h-6 w-6 rounded-full bg-white shadow-sm transform ring-0 ring-0 transition ease-in-out duration-200']

  if (attributes.checked) {
    toggle.push('bg-indigo-600')
    switcher.push('translate-x-7')
  } else {
    toggle.push('bg-gray-600')
    switcher.push('translate-x-0')
  }

  return (
    <label
      htmlFor={attributes.id}
      className={`${className} flex gap-2 cursor-pointer`}
    >
      <div className={toggle.join(' ')}>
        <span className={switcher.join(' ')}/>
      </div>

      <input
        type='checkbox'
        className="hidden"
        {...attributes}
      />
      {children}
    </label>
  )
}

export default BaseInput
