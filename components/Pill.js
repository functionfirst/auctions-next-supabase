function Pill({ active, activeText = 'Active', inactiveText = 'Inactive' }) {
  const pillCss = [
    'px-2 inline-block text-xs leading-5 font-semibold rounded-full',
  ]

  if (active) {
    pillCss.push('bg-green-100 text-green-800')
  } else {
    pillCss.push('bg-gray-100 text-gray-800')
  }

  return (
    <span className={pillCss.join(' ')}>
      {active ? activeText : inactiveText}
    </span>
  )
}

export default Pill
