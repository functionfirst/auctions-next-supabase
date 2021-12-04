function BaseToggle ({
  label,
  checked,
  onChange,
  className = '',
  ...inputProps
}) {
  const toggle = ['w-14 rounded-full shadow-sm p-0.5']
  const switcher = ['block h-6 w-6 rounded-full bg-white shadow-sm transform transition ease-in-out duration-200']

  if (checked) {
    toggle.push('bg-indigo-600')
    switcher.push('translate-x-7')
  } else {
    toggle.push('bg-gray-400')
    switcher.push('translate-x-0')
  }

  return (
    <label
      htmlFor={inputProps.id}
      className={`${className} inline-flex items-center gap-2 cursor-pointer`}
    >
      <div className={toggle.join(' ')}>
        <span className={switcher.join(' ')}/>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="absolute opacity-0 h-0 w-0 overflow-hidden appearance-none m-0"
          {...inputProps}
        />
      </div>

      {label}
    </label>
  )
}

export default BaseToggle
