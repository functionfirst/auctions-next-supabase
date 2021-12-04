import LayoutHeaderLogo from './LayoutHeaderLogo'
import LayoutHeader from './LayoutHeader'

const Layout = ({ children }) => {
  return (
    <>
      <LayoutHeader>
        <LayoutHeaderLogo />
      </LayoutHeader>

      <main className="mx-auto max-w-lg p-8">{children}</main>
    </>
  )
}

export default Layout
