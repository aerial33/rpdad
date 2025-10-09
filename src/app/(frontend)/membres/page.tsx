import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { Metadata } from 'next/types'

import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import { Badge } from '@/components/ui/badge'

import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const membres = await payload.find({
    collection: 'membres',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      name: true,
      slug: true,
      logo: true,
      adresse: true,
    },
    where: {
      _status: {
        equals: 'published',
      },
    },
    sort: '-publishedAt',
  })
  console.log(membres)
  return (
    <div className="flex-1">
      <PageClient />

      {/* TODO: Create MembreShowcase component similar to EmploiShowcase */}
      <div className="container mx-auto px-4 py-12">
        <Badge className="border-muted-foreground mb-8" variant="outline">
          <Breadcrumbs breadcrumbs={[{ name: 'Accueil', link: '/' }, { name: 'Membres' }]} />
        </Badge>
        <h1 className="mb-8 text-4xl font-bold">Nos Membres</h1>
        <p className="text-muted-foreground mb-8">
          Découvrez les {membres.totalDocs} membres du réseau RPDAD en Gironde
        </p>
        {/* Temporary list - replace with MembreShowcase component */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {membres.docs.map((membre) => (
            <a
              key={membre.id}
              href={`/membres/${membre.slug}`}
              className="rounded-lg border p-6 transition-shadow hover:shadow-md"
            >
              <h3 className="font-semibold">{membre.name}</h3>
              {membre.adresse && (
                <p className="text-muted-foreground mt-2 text-sm">{membre.adresse}</p>
              )}
            </a>
          ))}
        </div>
      </div>

      {/* Pagination Section */}
      {membres.totalPages && membres.totalPages > 1 && membres.page && (
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center gap-8">
            <PageRange
              collection="membres"
              currentPage={membres.page}
              limit={12}
              totalDocs={membres.totalDocs}
            />
            <Pagination page={membres.page} totalPages={membres.totalPages} collection="membres" />
          </div>
        </div>
      )}
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Nos Membres - RPDAD Gironde',
    description:
      "Découvrez les membres du réseau RPDAD en Gironde. Structure associative engagée dans l'aide à domicile et les services à la personne.",
  }
}
