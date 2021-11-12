import LayoutUserNav from './LayoutUserNav'
import LayoutHeaderLogo from './LayoutHeaderLogo'
import LayoutHeader from './LayoutHeader'
import LayoutNavigation from './LayoutNavigation'
import LayoutMenuIcon from './LayoutMenuIcon'
import NavLink from './NavLink'
import IconUserCircle from './IconUserCircle'
import IconLock from './IconLock'

const Layout = ({ children }) => {
  return (
    <>
      <LayoutHeader>
        <LayoutHeaderLogo />
        <LayoutMenuIcon />
        <LayoutNavigation />
        <LayoutUserNav />
      </LayoutHeader>

      <div className="max-w-6xl mx-auto flex gap-4 p-4 sm:px-6">
        <div className="flex flex-col gap-2 w-64">
          <NavLink href="/account"
            className="flex gap-2 py-2 px-4 rounded hover:bg-gray-100"
            exact
            activeClassName="bg-white text-indigo-600 bg-indigo-50 hover:bg-indigo-100 hover:text-indigo-800"
          >
            <IconUserCircle className="w-6 h-6" />
            Profile
          </NavLink>

          <NavLink href="/account/change-password"
            className="flex gap-2 py-2 px-4 rounded hover:bg-gray-100"
            activeClassName="bg-white text-indigo-600 bg-indigo-50 hover:bg-indigo-100 hover:text-indigo-800"
          >
            <IconLock className="w-6 h-6" />
            Password
          </NavLink>
        </div>

        <main className="flex-1">
        {children}
        </main>
      </div>
    </>
  )
}

export default Layout
