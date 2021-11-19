const LayoutHeader = ({ children }) => {
  return (
    <div className="max-w-6xl mx-auto p-4 md:py-6">
      <header className="flex items-center gap-10">
        {children}
      </header>
    </div>
  )
}

export default LayoutHeader
