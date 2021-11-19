import { IconUserCircle, IconLogout, IconLock } from "./Icon"
import Link from 'next/link'
import { useUser } from '@/contexts/UserContext'


function BaseLink ({ children, href }) {
  return (
    <Link href={href}>
      <a className="flex gap-1 items-center px-4 py-2 text-gray-500 hover:text-indigo-800">
        {children}
      </a>
    </Link>
  )
}

function ButtonLink ({ children, href }) {
  return (
    <Link href={href}>
      <a className="flex gap-1 items-center px-6 py-2 bg-indigo-500 hover:bg-indigo-400 rounded-full text-white">
        {children}
      </a>
    </Link>
  )
}

function Container ({ children }) {
  return (
    <div className="flex flex-col sm:flex-row mt-auto m-4 sm:m-0 gap-4">
      {children}
    </div>
  )
}

const LayoutUserNav = () => {
  const { user } = useUser()

  if (user) {
    return (
      <Container>
        <BaseLink href="/account">
          <IconUserCircle className="w-6 h-6" />
          Your Account
        </BaseLink>

        <BaseLink href="/logout">
          <IconLogout className="w-6 h-6" />
          Logout
        </BaseLink>
      </Container>
    )
  }

  return (
    <Container>
      <BaseLink href="/login">
        <IconLock className="w-6 h-6" />
        Log In
      </BaseLink>

      <ButtonLink href="/register">
        <IconUserCircle className="w-6 h-6" />
        Sign Up
      </ButtonLink>
    </Container>
  )
}

export default LayoutUserNav
