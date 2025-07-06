import { notFound, redirect } from 'next/navigation'
import courseModules from '@/data/courseModules'
import ModuleClientContent from './_module_client_content'

interface ModulePageProps {
  params: {
    id: string
  }
}

export default function ModulePage({ params }: ModulePageProps) {
  const moduleId = parseInt(params.id)
  const module = courseModules.find(m => m.id === moduleId)
  
  if (!module) {
    notFound()
  }

  if (module.status === 'locked') {
    redirect('/?error=module-locked')
  }

  return <ModuleClientContent module={module} />
}