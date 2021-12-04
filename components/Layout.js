import LayoutHeaderLogo from './LayoutHeaderLogo'
import LayoutHeader from './LayoutHeader'
import LayoutNavigation from './LayoutNavigation'

const Layout = ({ children }) => {
  return (
    <>
      <LayoutHeader>
        <LayoutHeaderLogo />
        <LayoutNavigation />
      </LayoutHeader>

      <main>{children}</main>
    </>
  )
}

export default Layout
