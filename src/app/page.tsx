import Layout from '@/components/Layout'
import WelcomeSection from '@/components/WelcomeSection'
import ModulesSection from '@/components/ModulesSection'

export default function Home() {
  return (
    <Layout>
      <WelcomeSection />
      <ModulesSection />
    </Layout>
  )
}