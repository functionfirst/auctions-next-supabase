import LayoutUserNav from './LayoutUserNav'
import LayoutMenu from './LayoutMenu'
import LayoutMenuIcon from './LayoutMenuIcon'
import { useApp } from '@/contexts/AppContext'

function LayoutNav () {
  const { navActive } = useApp()

  const isNavOpen = navActive ?
    'absolute z-10 top-20 bg-white inset-x-0 bottom-0 flex flex-col' :
    'flex items-center justify-between flex-1 hidden sm:flex'

  return (
    <>
    <LayoutMenuIcon />

    <div className={isNavOpen}>
      <LayoutMenu />
      <LayoutUserNav />
    </div>
    </>
  )
}

export default LayoutNav
