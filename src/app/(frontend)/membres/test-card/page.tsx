import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { Metadata } from 'next/types'

import CardMembers from '@/components/ShowCaseMembers/CardMembers'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function TestCardPage() {
  const payload = await getPayload({ config: configPromise })

  const membres = await payload.find({
    collection: 'membres',
    depth: 1,
    limit: 5,
    overrideAccess: false,
    select: {
      name: true,
      slug: true,
      logo: true,
      adresse: true,
      informations: true,
      publishedAt: true,
    },
    where: {
      _status: {
        equals: 'published',
      },
    },
    sort: '-publishedAt',
  })

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Test CardMembers - Vue Horizontale</h1>
        <p className="text-muted-foreground">
          Affichage des {membres.totalDocs} premiers membres en format horizontal
        </p>
      </div>

      <div className="space-y-4">
        {membres.docs.map((membre) => (
          <CardMembers key={membre.id} membre={membre} />
        ))}
      </div>

      {membres.docs.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground text-lg">Aucun membre disponible pour le test.</p>
        </div>
      )}
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Test CardMembers - RPDAD',
    description: 'Page de test pour le composant CardMembers horizontal',
    robots: 'noindex, nofollow',
  }
}
