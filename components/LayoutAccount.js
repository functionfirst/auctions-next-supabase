import LayoutUserNav from './LayoutUserNav'
import LayoutHeaderLogo from './LayoutHeaderLogo'
import LayoutHeader from './LayoutHeader'
import LayoutNavigation from './LayoutNavigation'
import LayoutMenuIcon from './LayoutMenuIcon'
import ActiveLink from './ActiveLink'
import { IconLock, IconUserCircle } from './Icon'

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
          <ActiveLink
            href="/account"
            activeClassName="bg-white text-indigo-600 bg-indigo-50 hover:bg-indigo-100 hover:text-indigo-800"
          >
            <a className="flex gap-2 py-2 px-4 rounded hover:bg-gray-100">
              <IconUserCircle className="w-6 h-6" />
              Profile
            </a>
          </ActiveLink>

          <ActiveLink
            href="/account/change-password"
            activeClassName="bg-white text-indigo-600 bg-indigo-50 hover:bg-indigo-100 hover:text-indigo-800"
          >
            <a className="flex gap-2 py-2 px-4 rounded hover:bg-gray-100">
              <IconLock className="w-6 h-6" />
              Password
            </a>
          </ActiveLink>
        </div>

        <main className="flex-1">
        {children}
        </main>
      </div>
    </>
  )
}

export default Layout
