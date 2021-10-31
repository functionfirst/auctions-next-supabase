const LayoutHeader = ({ children }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <header className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
        {children}
      </header>
    </div>
  )
}

export default LayoutHeader
