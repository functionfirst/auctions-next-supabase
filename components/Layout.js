import LayoutUserNav from './LayoutUserNav'
import LayoutHeaderLogo from './LayoutHeaderLogo'
import LayoutHeader from './LayoutHeader'
import LayoutNavigation from './LayoutNavigation'
import LayoutMenuIcon from './LayoutMenuIcon'

const Layout = ({ children }) => {
  return (
    <>
      <LayoutHeader>
        <LayoutHeaderLogo />
        <LayoutMenuIcon />
        <LayoutNavigation />
        <LayoutUserNav />
      </LayoutHeader>

      <main>
        {children}
      </main>
    </>
  )
}

export default Layout
