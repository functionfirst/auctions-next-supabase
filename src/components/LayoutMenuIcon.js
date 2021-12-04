import { IconMenu } from './Icon'

import { useApp } from '@/contexts/AppContext'

const LayoutMenuIcon = () => {
  const { toggleNav } = useApp()

  return (
    <button
      className="flex flex-col sm:hidden h-12 w-12 items-center justify-center ml-auto text-sm"
      onClick={toggleNav}
    >
      <IconMenu className="w-6 h-6" />
      <span>Menu</span>
    </button>
  )
}

export default LayoutMenuIcon
