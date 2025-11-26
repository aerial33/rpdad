import type { Metadata } from 'next'

import type { Config, Media, Page, Post } from '../payload-types'
import { getServerSideURL } from './getURL'
import { mergeOpenGraph } from './mergeOpenGraph'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
}): Promise<Metadata> => {
  const { doc } = args

  const ogImage = getImageURL(doc?.meta?.image)

  const title = doc?.meta?.title
    ? doc?.meta?.title + ' | Rpdad Réseau départemental de la gironde'
    : 'Rpdad Réseau départemental de la gironde'

  // Construct full URL for OpenGraph
  const serverUrl = getServerSideURL()
  let fullUrl = serverUrl
  if (doc?.slug) {
    const slugPath = Array.isArray(doc.slug) ? doc.slug.join('/') : doc.slug
    // Check if it's a Post (has publishedAt or content) or a Page
    const isPost = 'publishedAt' in (doc as Post) || 'content' in (doc as Post)
    fullUrl = `${serverUrl}/${isPost ? 'posts/' : ''}${slugPath}`
  }

  return {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: fullUrl,
    }),
    title,
  }
}
