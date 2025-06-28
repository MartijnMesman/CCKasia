import Layout from '@/components/Layout'

export default function Home() {
  return (
    <Layout>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome</h1>
        <p className="text-gray-300 text-lg">
          A minimal Next.js app with dark theme
        </p>
      </div>
    </Layout>
  )
}