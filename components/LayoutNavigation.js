import { useEffect } from 'react'
import { supabase } from '../lib/initSupabase'
import Link from 'next/link'

const checkUserLinks = (loggedIn) => {
  if (loggedIn) { return }
  const authRequiredLinks = document.querySelectorAll('[data-auth-required]')
  authRequiredLinks.forEach(link => link.classList.add('hidden'))
}

const links = [
  {
    to: "/discover",
    name: "Discover"
  },
  {
    to: "/upcoming",
    name: "Upcoming"
  },
  {
    to: "/favourites",
    name: "Favourites"
  },
  {
    to: "/my-auctions",
    name: "My Auctions",
    attributes: {
      "data-auth-required": true
    }
  }
]

const LayoutNavigation = () => {
  const loggedIn = supabase.auth.user()

  useEffect(() => {
    checkUserLinks(loggedIn)
  }, [])

  return (
    <nav className="hidden justify-start lg:flex space-x-4 text-sm font-medium">
      {
        links.map(link => (
          <Link
            key={link.to}
            href={link.to}
          >
            <a className="text-gray-500 hover:text-indigo-800 px-3 py-2" {...link.attributes}>
              {link.name}
            </a>
          </Link>
        ))
      }
    </nav>
  )
}

export default LayoutNavigation
