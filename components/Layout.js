import LayoutUserNav from './LayoutUserNav'
import LayoutHeaderLogo from './LayoutHeaderLogo'
import LayoutHeader from './LayoutHeader'
import LayoutNavigation from './LayoutNavigation'
import LayoutMenuIcon from './LayoutMenuIcon'

const Layout = ({ children }) => {
  return (
    <>
      <div>
        <LayoutHeader>
          <LayoutHeaderLogo />
          <LayoutMenuIcon />
          <LayoutNavigation />
          <LayoutUserNav />
        </LayoutHeader>

        <main className="max-w-6xl mx-auto p-4 sm:px-6">
          {children}
        </main>
      </div>
    </>
  )
}

export default Layout
