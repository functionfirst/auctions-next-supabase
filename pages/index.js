import Layout from '../components/Layout'
import ContentHero from '../components/ContentHero'
import CheckPasswordRecovery from '../components/CheckPasswordRecovery'

function Home() {
  return (
    <Layout>
      <ContentHero />
      <CheckPasswordRecovery />
    </Layout>
  )
}

export default Home
