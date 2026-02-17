import { formatDateTime } from 'src/utilities/formatDateTime'

import React from 'react'

import { Media } from '@/components/Media'
import { Badge } from '@/components/ui/badge'
import type { Post } from '@/payload-types'
import { formatAuthors } from '@/utilities/formatAuthors'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  // Construire le texte des catégories
  const categoriesText = categories
    ?.map((category) => {
      if (typeof category === 'object' && category !== null) {
        return category.title || 'Untitled category'
      }
      return null
    })
    .filter(Boolean)
    .join(', ')

  return (
    <div className="mx-auto h-120 w-full px-2 pt-12 xl:max-w-screen-2xl">
      <div className="aspect-w-16 aspect-h-13 sm:aspect-h-9 lg:aspect-h-8 xl:aspect-h-5 relative z-0 h-full overflow-hidden rounded-3xl md:rounded-[40px]">
        {/* Image avec Media component ou dégradé par défaut */}
        {heroImage && typeof heroImage === 'object' ? (
          <Media
            resource={heroImage}
            fill
            imgClassName="h-full w-full rounded-3xl object-cover brightness-70 md:rounded-[40px]"
            priority
          />
        ) : (
          <div className="from-primary/80 to-primary absolute inset-0 rounded-3xl bg-linear-to-br md:rounded-[40px]" />
        )}
        <div className="bg-opacity-30 absolute inset-0 flex flex-col items-center justify-center text-white">
          {categoriesText && (
            <Badge className="mb-4 text-white" variant="outline">
              {categoriesText}
            </Badge>
          )}
          <h1 className="inline-block align-middle text-5xl font-semibold md:text-7xl">{title}</h1>
          {hasAuthors && (
            <p className="mt-4 text-xl font-semibold text-neutral-50">
              {formatAuthors(populatedAuthors)}
            </p>
          )}
          {publishedAt && (
            <span className="mt-4 block max-w-lg text-center text-neutral-50">
              <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
