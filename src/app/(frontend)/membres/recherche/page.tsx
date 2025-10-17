import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { Metadata } from 'next/types'

import { Search } from '@/search/Component'

import MembresSearchPageClient from './page.client'

type Args = {
  searchParams: Promise<{
    q: string
  }>
}

export default async function MembresSearchPage({ searchParams: searchParamsPromise }: Args) {
  const { q: query } = await searchParamsPromise
  const payload = await getPayload({ config: configPromise })

  const membres = await payload.find({
    collection: 'membres',
    depth: 1,
    limit: 50,
    select: {
      name: true,
      slug: true,
      adresse: true,
      coordinates: true,
      meta: true,
      logo: true,
    },
    where: {
      and: [
        {
          _status: {
            equals: 'published',
          },
        },
        ...(query
          ? [
              {
                or: [
                  {
                    name: {
                      contains: query,
                    },
                  },
                  {
                    adresse: {
                      contains: query,
                    },
                  },
                  {
                    'coordinates.zone': {
                      contains: query,
                    },
                  },
                  {
                    'meta.description': {
                      contains: query,
                    },
                  },
                  {
                    'meta.title': {
                      contains: query,
                    },
                  },
                  {
                    slug: {
                      contains: query,
                    },
                  },
                ],
              },
            ]
          : []),
      ],
    },
    sort: 'name',
  })

  return (
    <div className="pt-24 pb-24">
      <MembresSearchPageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none text-center">
          <h1 className="mb-8 lg:mb-16">Rechercher un membre</h1>

          <div className="mx-auto max-w-[50rem]">
            <Search />
          </div>
        </div>
      </div>

      {membres.totalDocs > 0 ? (
        <div className="container">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {membres.docs.map((membre) => {
              const metaDescription = membre.meta?.description
              const displayDescription = metaDescription || membre.adresse

              return (
                <a
                  key={membre.id}
                  href={`/membres/${membre.slug}`}
                  className="bg-card hover:border-primary group rounded-lg border p-6 shadow-sm transition-all hover:shadow-md"
                >
                  <h3 className="group-hover:text-primary mb-2 text-xl font-semibold transition-colors">
                    {membre.name}
                  </h3>
                  {displayDescription && (
                    <p className="text-muted-foreground line-clamp-3 text-sm">
                      {displayDescription}
                    </p>
                  )}
                  {membre.adresse && (
                    <p className="text-muted-foreground mt-4 text-xs">
                      <span className="font-medium">Adresse :</span> {membre.adresse}
                    </p>
                  )}
                  {membre.coordinates?.zone && (
                    <p className="text-muted-foreground text-xs">
                      <span className="font-medium">Zone :</span> {membre.coordinates.zone}
                    </p>
                  )}
                </a>
              )
            })}
          </div>
        </div>
      ) : (
        <div className="container text-center">
          {query ? 'Aucun membre trouvé pour cette recherche.' : 'Aucun membre disponible.'}
        </div>
      )}
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Rechercher un membre du RPDAD`,
    description:
      'Trouvez un membre du Réseau Public Départemental d\'Aide à Domicile proche de chez vous',
  }
}
