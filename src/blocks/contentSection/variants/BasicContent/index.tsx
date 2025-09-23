import { RichText } from '@payloadcms/richtext-lexical/react'

import { Media as MediaComponent } from '@/components/Media'
import type { ContentWithImage as ContentWithImageProps } from '@/payload-types'
import { getPopulatedImageData } from '@/utilities/isImagePopulated'

export const ContentWithImage: React.FC<ContentWithImageProps> = (props) => {
  const { content, image, imagePosition } = props

  // Vérifier si l'image est un objet Media complet ou juste un ID
  const imageData = getPopulatedImageData(image)

  // Composant pour afficher l'image
  const ImageComponent = () => {
    if (!imageData?.url) {
      return (
        <div className="flex h-64 w-full items-center justify-center bg-gray-200">
          <span className="text-gray-500">Image non disponible</span>
        </div>
      )
    }

    return (
      <div className="relative overflow-hidden rounded-lg">
        {/* <Image
          src={imageData.url}
          alt={imageData.alt || 'Image'}
          width={imageData.width || 800}
          height={imageData.height || 600}
          className="h-auto w-full object-cover"
          priority // Si c'est une image importante
        /> */}
        <MediaComponent resource={imageData} />
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
    <div className="container flex flex-col gap-8 md:flex-row md:items-center md:justify-center">
      {/* Gestion de la position de l'image */}
      {imagePosition === 'Gauche' ? (
        <>
          <div className="md:w-1/2">
            <ImageComponent />
          </div>
          <div className="md:w-1/2">
            <ContentComponent />
          </div>
        </>
      ) : (
        <>
          <div className="md:w-1/2">
            <ContentComponent />
          </div>
          <div className="md:w-1/2">
            <ImageComponent />
          </div>
        </>
      )}
    </div>
  )
}
