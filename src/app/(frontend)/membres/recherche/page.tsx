import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { Metadata } from 'next/types'

import { HeroSearchMembers } from '@/components/HeroSearchMembers'
import CardMembers from '@/components/ShowCaseMembers/CardMembers'

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
      informations: true,
    },
    // pagination: false reduces overhead if you don't need totalDocs
    pagination: false,
    ...(query
      ? {
          where: {
            and: [
              {
                _status: {
                  equals: 'published',
                },
              },
              {
                or: [
                  {
                    name: {
                      like: query,
                    },
                  },
                  {
                    adresse: {
                      like: query,
                    },
                  },
                  {
                    'coordinates.zone': {
                      like: query,
                    },
                  },
                  {
                    'meta.description': {
                      like: query,
                    },
                  },
                  {
                    'meta.title': {
                      like: query,
                    },
                  },
                  {
                    slug: {
                      like: query,
                    },
                  },
                ],
              },
            ],
          },
        }
      : {
          where: {
            _status: {
              equals: 'published',
            },
          },
        }),
    sort: 'name',
  })

  return (
    <div className="animation-appear pt-24 pb-24">
      <MembresSearchPageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none text-center">
          <h1 className="mb-8 lg:mb-16">Rechercher un membre</h1>

          <div className="mx-auto max-w-[40rem] text-center">
            <HeroSearchMembers />
          </div>
        </div>
      </div>

      {membres.totalDocs > 0 ? (
        <div className="container">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {membres.docs.map((membre) => (
              <CardMembers key={membre.id} membre={membre} />
            ))}
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
      "Trouvez un membre du Réseau Public Départemental d'Aide à Domicile proche de chez vous",
  }
}
