import { notFound, redirect } from 'next/navigation'
import courseModules from '@/data/courseModules'
import ModuleClientContent from './_module_client_content'

interface ModulePageProps {
  params: {
    id: string
  }
}

export default async function ModulePage({ params }: ModulePageProps) {
  const resolvedParams = await params
  const moduleId = parseInt(resolvedParams.id)
  const module = courseModules.find(m => m.id === moduleId)

  if (!module) {
    notFound()
  }

  if (module.status === 'locked') {
    redirect('/?error=module-locked')
  }

  return (
    <>
      <ModuleClientContent module={module} />
    </>
  )
}