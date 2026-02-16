import configPromise from '@payload-config'
import { getPayload } from 'payload'

import BackgroundSection from '@/components/BackgroundSection/BackgroundSection'
import { FadeUp } from '@/components/motion/animations'
import { FeatureGrid, FeatureGridItem } from '@/components/ui/FeatureGrid'
import { Badge } from '@/components/ui/badge'
import { Emplois, FeatureCollectionBlock, Post } from '@/payload-types'

import { EmploiRenderer } from './EmploiRenderer'
import { FeaturedPost } from './FeaturedPost'
import { PostCardCompact } from './PostCardCompact'

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
    relationTo,
    variant = 'grid',
    bgColor = 'bg-white',
    id,
  } = props

  const limit = variant === 'featured' ? 6 : limitFromProps || 3

  // --- Fetch emplois ---
  if (relationTo === 'emplois' || variant === 'emploi-grid') {
    let emplois: Emplois[] = []
    const payload = await getPayload({ config: configPromise })

    if (populateBy === 'collection') {
      const fetched = await payload.find({
        collection: 'emplois',
        depth: 1,
        limit: 0,
        where: {
          _status: { equals: 'published' },
        },
        sort: '-publishedAt',
      })
      emplois = fetched.docs
    } else if (selectedDocs?.length) {
      emplois = selectedDocs
        .map((doc) => (typeof doc.value === 'object' ? doc.value : undefined))
        .filter((doc): doc is Emplois => !!doc && doc._status === 'published')
    }

    return (
      <FadeUp delay={0.5} className="relative">
        <BackgroundSection className={bgColor || 'bg-primary-lightest'} />
        <div className="my-custom-container mx-auto lg:max-w-7xl" id={`block-${id}`}>
          <EmploiRenderer
            items={emplois}
            itemsPerPage={limit}
            title={title}
            subtitle={subtitle}
            badgeText={badgeText}
            buttonText={buttonText}
            buttonLink={buttonLink}
          />
        </div>
      </FadeUp>
    )
  }

  // --- Fetch posts ---
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
      where: {
        _status: {
          equals: 'published',
        },
        ...(flattenedCategories && flattenedCategories.length > 0
          ? {
              categories: {
                in: flattenedCategories,
              },
            }
          : {}),
      },
    })

    posts = fetchedPosts.docs
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedPosts = selectedDocs
        .map((post) => {
          if (typeof post.value === 'object') return post.value
        })
        .filter((post): post is Post => !!post && post._status === 'published')

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

  // Rendu pour la variante "featured"
  if (variant === 'featured') {
    const [featuredPost, ...compactPosts] = posts
    const displayedCompactPosts = compactPosts.slice(0, 5)

    return (
      <FadeUp delay={0.5} className="relative">
        <BackgroundSection className={bgColor || 'bg-primary-lightest'} />
        <div className="my-custom-container mx-auto lg:max-w-7xl" id={`block-${id}`}>
          <div className="space-y-8 px-6 py-16 xl:px-0">
            {/* En-tête */}
            <div className="flex flex-col items-start gap-4">
              <div>
                <Badge variant={'outline'} className="text-md mb-4 border-gray-700">
                  {badgeText || 'Actualités'}
                </Badge>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold lg:text-4xl">
                  {title || 'Nos dernières actualités'}
                </h2>
                <p className="max-w-xl text-left text-lg text-gray-600 lg:max-w-lg">
                  {subtitle || 'Découvrez les dernières nouvelles et mises à jour'}
                </p>
              </div>
              {buttonLink && (
                <a
                  href={buttonLink}
                  className="bg-primary hover:bg-primary/90 mt-4 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white transition-all"
                >
                  {buttonText || 'Voir tout'}
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              )}
            </div>

            {/* Layout 2 colonnes */}
            {featuredPost && (
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
                {/* Article principal à gauche */}
                <div className="h-full">
                  <FeaturedPost post={featuredPost} />
                </div>

                {/* Liste des 5 articles compacts à droite */}
                <div className="flex h-full flex-col gap-4">
                  {displayedCompactPosts.map((post) => (
                    <div key={post.id} className="flex-1">
                      <PostCardCompact post={post} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </FadeUp>
    )
  }

  // Rendu par défaut pour la variante "grid"
  return (
    <FadeUp delay={0.5} className="relative">
      <BackgroundSection className={bgColor || 'bg-primary-lightest'} />
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
