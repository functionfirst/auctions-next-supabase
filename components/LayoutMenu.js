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
    <nav className="justify-start flex flex-col sm:flex-row sm:gap-4 sm:text-sm font-medium m-4 sm:m-0">
      {
        navLinks.map(link => (
          <Link
            key={link.to}
            href={link.to}
          >
            <a className="text-gray-500 hover:text-indigo-800 px-3 py-3 sm:py-2" {...link.attributes}>
              {link.name}
            </a>
          </Link>
        ))
      }
    </nav>
  )
}

export default LayoutNavigation
