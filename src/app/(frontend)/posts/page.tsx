import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { Metadata } from 'next'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import { FadeLeft } from '@/components/motion/animations'
import { Badge } from '@/components/ui/badge'
import { getCachedSidebarProps } from '@/utilities/getSidebar'

import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
  })
  // Fetch sidebar data (featured posts + categories with count)
  const sidebarProps = await getCachedSidebarProps('posts')()
  return (
    <div className="mt-4 pb-24 md:mt-0">
      <PageClient />
      <header className="from-flamingo-lighter to-flamingo-lightest relative z-10 bg-gradient-to-tr pt-16 shadow-xs md:py-20">
        <div className="relative z-10 container mx-auto">
          <div className="max-w-screen-md text-left">
            <FadeLeft delay={0.1} duration={0.3}>
              <div className="mb-8 flex flex-wrap items-center gap-3">
                <Badge>
                  {' '}
                  <PageRange
                    collection="posts"
                    currentPage={posts.page}
                    limit={12}
                    totalDocs={posts.totalDocs}
                  />
                </Badge>
              </div>
              <h1 className="mb-10 text-3xl leading-tight font-bold text-balance md:text-4xl">
                {"L'Actualité du réseau en gironde"}
              </h1>
            </FadeLeft>
          </div>
        </div>
      </header>

      {/* <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={12}
          totalDocs={posts.totalDocs}
        />
      </div> */}

      <CollectionArchive posts={posts.docs} sidebarProps={sidebarProps} />

      <div className="container">
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Rpdad Réseau départemental de la gironde - Actualités`,
  }
}
