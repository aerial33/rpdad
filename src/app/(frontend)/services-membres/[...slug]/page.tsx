import MembresContent from '@/components/BlogContent/membres-content'
import { getServiceBySlug } from '@/data/services'

export default async function ServiceMembrePage({ params }: { params: Promise<{ slug: string }> }) {
  // Accéder au premier élément du tableau slug
  // const slugValue = (await params).slug[0] // 'Ar%C3%A8s'
  const { slug } = await params

  // Décoder l'URL
  console.log(slug)
  const decodedSlug = decodeURIComponent(slug) // 'Arès'

  // Récupérer les informations du service à partir du slug décodé
  const service = getServiceBySlug(decodedSlug)
  const serviceName = service?.name || `CCAS/CIAS ${decodedSlug}`

  return (
    <div className="pb-8">
      <MembresContent service={serviceName} />
    </div>
  )
}
