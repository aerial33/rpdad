import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { Metadata } from 'next/types'

import { FeatureGrid } from '@/components/ui/FeatureGrid'
import { Search } from '@/search/Component'

import PageClient from './page.client'

type Args = {
  searchParams: Promise<{
    q: string
  }>
}
export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const { q: query } = await searchParamsPromise
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'search',
    depth: 1,
    limit: 12,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      doc: true,
      publishedAt: true,
    },
    sort: '-publishedAt',
    // pagination: false reduces overhead if you don't need totalDocs
    pagination: false,
    ...(query
      ? {
          where: {
            or: [
              {
                title: {
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
        }
      : {}),
  })
  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none text-center">
          <h1 className="mb-8 lg:mb-16">Rechercher sur le site</h1>

          <div className="mx-auto max-w-[50rem]">
            <Search />
          </div>
        </div>
      </div>

      {posts.totalDocs > 0 ? (
        <FeatureGrid
          title={`${posts.totalDocs} résultat${posts.totalDocs > 1 ? 's' : ''}${query ? ` pour "${query}"` : ''}`}
          subtitle="Découvrez les contenus correspondant à votre recherche"
          badgeText="Résultats de recherche"
          buttonText=""
          buttonLink=""
          items={posts.docs.map((doc: any) => ({
            id: doc.id,
            image: doc.meta?.image?.url,
            titre: doc.title || '',
            date: doc.publishedAt
              ? new Date(doc.publishedAt).toLocaleDateString('fr-FR')
              : undefined,
            description: doc.meta?.description || '',
            link: `/${doc.doc.relationTo}/${doc.slug}`,
          }))}
          maxItems={12}
          columns={3}
        />
      ) : (
        <div className="container text-center">Aucun résultat trouvé.</div>
      )}
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Rechercher sur le site du RPDAD`,
  }
}
