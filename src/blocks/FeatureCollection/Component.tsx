import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { FadeUp } from '@/components/motion/animations'
import { FeatureGrid, FeatureGridItem } from '@/components/ui/FeatureGrid'
import { FeatureCollectionBlock, Post } from '@/payload-types'

export const FeatureCollectionBlockComponent: React.FC<
  FeatureCollectionBlock & {
    id?: string
  }
> = async (props) => {
  const {
    selectedDocs,
    categories,
    limit: limitFromProps,
    populateBy,
    title,
    subtitle,
    badgeText,
    buttonText,
    buttonLink,
    id,
  } = props

  const limit = limitFromProps || 3

  let posts: Post[] = []
  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    const fetchedPosts = await payload.find({
      collection: 'posts',
      depth: 1,
      limit,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    })

    posts = fetchedPosts.docs
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedPosts = selectedDocs.map((post) => {
        if (typeof post.value === 'object') return post.value
      }) as Post[]

      posts = filteredSelectedPosts
    }
  }

  // Fonction pour transformer les posts en FeatureGridItem
  const transformPostsToFeatureItems = (posts: Post[]): FeatureGridItem[] => {
    return posts.map((post) => ({
      id: post.id,
      image:
        typeof post.heroImage === 'object' && post.heroImage?.url ? post.heroImage.url : undefined,
      titre: post.title,
      date: post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('fr-FR') : undefined,
      description: post.meta?.description || '',
      link: `/posts/${post.slug}`,
    }))
  }

  return (
    // TODO: add a container with a background color and a border radius
    <FadeUp delay={0.5}>
      <div className="my-custom-container mx-auto lg:max-w-7xl" id={`block-${id}`}>
        <FeatureGrid
          title={title || 'Nos dernières actualités'}
          subtitle={subtitle || 'Découvrez les dernières nouvelles et mises à jour'}
          badgeText={badgeText || 'Actualités'}
          buttonText={buttonText || 'Voir tout'}
          buttonLink={buttonLink || '/posts'}
          items={transformPostsToFeatureItems(posts)}
          maxItems={limit}
        />
      </div>
    </FadeUp>
  )
}
