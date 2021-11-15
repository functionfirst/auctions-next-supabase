import { IconUserCircle, IconLogout, IconLock } from "./Icon"
import Link from 'next/link'
import { useUser } from '@/contexts/UserContext' 

const LayoutUserNav = () => {
  const { user } = useUser()

  return (
    <div className="justify-end md:flex-1 lg:w-0 hidden sm:flex flex-auto items-center">
      <div className="gap-2 ml-3 relative flex items-center tracking-wider font-semibold text-sm">
        { !user ? <Link href="/login">
          <a className="flex gap-1 items-center px-4 py-2 text-gray-500 hover:text-indigo-800">
            <IconLock className="w-6 h-6" />
            Log In
          </a>
        </Link> : null }

        { !user ? <Link href="/register">
          <a className="flex gap-1 items-center px-6 py-2 bg-indigo-500 hover:bg-indigo-400 rounded-full text-white">
            <IconUserCircle className="w-6 h-6" />
            Sign Up
          </a>
        </Link> : null }

        { user ? <Link href="/account">
          <a className="flex items-center px-4 py-2 text-gray-500 hover:text-indigo-800">
            <IconUserCircle className="w-6 h-6" />
            Your Account
          </a>
        </Link> : null }

        { user ? <Link href="/logout">
          <a className="flex items-center px-4 py-2 text-gray-500 hover:text-indigo-800">
            <IconLogout className="w-6 h-6" />
            Logout
          </a>
        </Link> : null }
      </div>
    </div>
  )
}

export default LayoutUserNav
