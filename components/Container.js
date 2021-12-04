export default function Container({ children, width = '6xl' }) {
  return <div className={`max-w-${width} mx-auto px-4 sm:px-6`}>{children}</div>
}
