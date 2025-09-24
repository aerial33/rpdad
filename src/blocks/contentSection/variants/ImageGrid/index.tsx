import { RichText } from '@payloadcms/richtext-lexical/react'

import { Media as MediaComponent } from '@/components/Media'
// import type { ContentWithImage as ContentWithImageProps } from '@/payload-types'
import { ContentSectionBlock } from '@/payload-types'
import { getPopulatedImageData } from '@/utilities/isImagePopulated'

export const ImageGrid: React.FC<ContentSectionBlock> = (props) => {
  const { content, multipleImages, imagePosition } = props

  // Composant pour afficher la grille d'images
  const ImageGridComponent = () => {
    if (!multipleImages || multipleImages.length === 0) {
      return (
        <div className="flex h-64 w-full items-center justify-center rounded-xl bg-gray-200">
          <span className="text-gray-500">Aucune image disponible</span>
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {multipleImages.map((imageItem, index) => {
          const imageData = getPopulatedImageData(imageItem.image)

          if (!imageData?.url) {
            return (
              <div
                key={index}
                className={`flex w-full items-center justify-center rounded-lg bg-gray-200 ${
                  index === 0 ? 'h-64 md:col-span-2' : 'h-48'
                }`}
              >
                <span className="text-gray-500">Image non disponible</span>
              </div>
            )
          }

          return (
            <div
              key={index}
              className={`relative overflow-hidden rounded-xl ${
                index === 0 ? 'aspect-video md:col-span-2 md:mx-5' : 'w-full'
              }`}
            >
              <MediaComponent className="h-auto w-full rounded-xl" resource={imageData} />
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
    <div
      className={`container flex flex-col gap-8 py-20 md:justify-center ${imagePosition === 'Gauche' ? 'md:flex-row-reverse' : 'md:flex-row'}`}
    >
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
