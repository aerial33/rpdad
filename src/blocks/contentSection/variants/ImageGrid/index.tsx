import { RichText } from '@payloadcms/richtext-lexical/react'

import { Media as MediaComponent } from '@/components/Media'
// import type { ContentWithImage as ContentWithImageProps } from '@/payload-types'
import { ContentSectionBlock } from '@/payload-types'
import { getPopulatedImageData } from '@/utilities/isImagePopulated'

export const ImageGrid: React.FC<ContentSectionBlock> = (props) => {
  const { content, multipleImages } = props

  // Composant pour afficher la grille d'images
  const ImageGridComponent = () => {
    if (!multipleImages || multipleImages.length === 0) {
      return (
        <div className="flex h-64 w-full items-center justify-center bg-gray-200 rounded-lg">
          <span className="text-gray-500">Aucune image disponible</span>
        </div>
      )
    }

    // Déterminer la classe de grille selon le nombre d'images
    const getGridClass = (count: number) => {
      if (count === 1) return 'grid-cols-1'
      if (count === 2) return 'grid-cols-1 md:grid-cols-2'
      return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
    }

    return (
      <div className={`grid gap-4 ${getGridClass(multipleImages.length)}`}>
        {multipleImages.map((imageItem, index) => {
          const imageData = getPopulatedImageData(imageItem.image)

          if (!imageData?.url) {
            return (
              <div key={index} className="flex h-48 w-full items-center justify-center bg-gray-200 rounded-lg">
                <span className="text-gray-500">Image non disponible</span>
              </div>
            )
          }

          return (
            <div key={index} className="relative overflow-hidden rounded-lg aspect-video">
              <MediaComponent resource={imageData} />
            </div>
          )
        })}
      </div>
    )
  }

  // Composant pour le contenu texte
  const ContentComponent = () => (
    <div className="richtext-content flex min-w-[250px] flex-col gap-4">
      {content && <RichText className="m-0" data={content} />}
    </div>
  )

  return (
    <div className="container flex flex-col gap-8">
      {/* Contenu texte en premier */}
      <div className="w-full">
        <ContentComponent />
      </div>

      {/* Grille d'images en dessous */}
      <div className="w-full">
        <ImageGridComponent />
      </div>
    </div>
  )
}
