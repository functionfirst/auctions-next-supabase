import { useRouter } from 'next/router'
import Link from 'next/link'
import PropTypes from 'prop-types'

ActiveLink.propTypes = {
  href: PropTypes.string.isRequired,
  exact: PropTypes.bool
};

ActiveLink.defaultProps = {
  exact: false
}

function ActiveLink({ href, exact, children, ...props }) {
  const { pathname } = useRouter()
  const isActive = exact ? pathname === href : pathname.startsWith(href)

  if (isActive) {
    props.className += props.activeClassName
  }

  return (
    <Link href={href}>
      <a {...props}>
        {children}
      </a>
    </Link>
  );
}

export default ActiveLink
