import Link from 'next/link'
import { useUser } from '@/contexts/UserContext' 

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
    authRequired: true
  }
]

const LayoutNavigation = () => {
  const { user } = useUser()
  const isAuthorisedOrPublic = link => !link.authRequired || link.authRequired && user
  const navLinks = links.filter(isAuthorisedOrPublic)

  return (
    <nav className="hidden justify-start lg:flex space-x-4 text-sm font-medium">
      {
        navLinks.map(link => (
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
