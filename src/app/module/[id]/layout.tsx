import courseModules from '@/data/courseModules'

export async function generateStaticParams() {
  return courseModules.map((module) => ({
    id: module.id.toString(),
  }))
}

export default function ModuleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}