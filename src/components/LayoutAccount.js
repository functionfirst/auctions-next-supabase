import LayoutHeaderLogo from './LayoutHeaderLogo'
import LayoutHeader from './LayoutHeader'
import LayoutNavigation from './LayoutNavigation'
import ActiveLink from './ActiveLink'
import { IconLock, IconUserCircle } from './Icon'

function NavLink({ item }) {
  return (
    <ActiveLink
      href={item.href}
      activeClassName="border-indigo-600 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 hover:text-indigo-800 hover:border-indigo-800"
    >
      <a className="border-l-4 border-transparent flex gap-3 p-3 hover:bg-gray-100">
        {item.icon}
        {item.text}
      </a>
    </ActiveLink>
  )
}

const Layout = ({ children }) => {
  const nav = [
    {
      href: '/account',
      text: 'Profile',
      icon: <IconUserCircle className="w-6 h-6" />,
    },
    {
      href: '/account/change-password',
      text: 'Password',
      icon: <IconLock className="w-6 h-6" />,
    },
  ]

  const navigation = nav.map((item) => <NavLink key={item.href} item={item} />)

  return (
    <div className="min-h-screen bg-gray-100">
      <LayoutHeader>
        <LayoutHeaderLogo />
        <LayoutNavigation />
      </LayoutHeader>

      <div className="max-w-6xl mx-auto flex bg-white shadow rounded-lg">
        <div className="flex flex-col gap-2 w-64 border-r pt-6">
          {navigation}
        </div>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}

export default Layout
