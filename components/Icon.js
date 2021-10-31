const Icon = ({ children, className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`text-current ${className}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      {children}
    </svg>
  )
}

export default Icon
