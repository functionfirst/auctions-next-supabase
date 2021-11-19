import LayoutUserNav from './LayoutUserNav'
import LayoutHeaderLogo from './LayoutHeaderLogo'
import LayoutHeader from './LayoutHeader'
import LayoutMenuIcon from './LayoutMenuIcon'

const Layout = ({ children }) => {
  return (
    <>
      <LayoutHeader>
        <LayoutHeaderLogo />
      </LayoutHeader>

      <main className="mx-auto max-w-lg p-8">
        {children}
      </main>
    </>
  )
}

export default Layout
