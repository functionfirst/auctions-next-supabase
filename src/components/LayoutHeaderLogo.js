import Link from 'next/link'
import Logo from './Logo'

const LayoutHeaderLogo = () => {
  return (
    <Link href="/">
      <a className="inline-flex items-center text-xl sm:text-2xl text-indigo-700 hover:text-indigo-500">
        <Logo className="w-10 h-10" />
        <span className="font-bold ml-2">Realtime</span>
      </a>
    </Link>
  )
}

export default LayoutHeaderLogo
