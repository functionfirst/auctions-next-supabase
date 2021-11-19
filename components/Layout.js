import LayoutHeaderLogo from './LayoutHeaderLogo'
import LayoutHeader from './LayoutHeader'
import LayoutNavigation from './LayoutNavigation'
import LayoutMenuIcon from './LayoutMenuIcon'
import { useApp } from '@/contexts/AppContext'

const Layout = ({ children }) => {
  const { navActive } = useApp()

  const isNavOpen = navActive ?
    'absolute z-10 top-20 bg-white inset-x-0 bottom-0 flex flex-col' :
    'flex items-center justify-between flex-1 hidden sm:flex'
  return (
    <>
      <LayoutHeader>
        <LayoutHeaderLogo />
        <LayoutNavigation />
      </LayoutHeader>

      <main>
        {children}
      </main>
    </>
  )
}

export default Layout
