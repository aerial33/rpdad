import { RichText } from '@payloadcms/richtext-lexical/react'

import { Media as MediaComponent } from '@/components/Media'
// import type { ContentWithImage as ContentWithImageProps } from '@/payload-types'
import { FadeUp } from '@/components/motion/animations'
import { ContentSectionBlock } from '@/payload-types'
import { getPopulatedImageData } from '@/utilities/isImagePopulated'

export const ContentWithImage: React.FC<ContentSectionBlock> = (props) => {
  const { content, singleImage, imagePosition } = props

  // Récupérer l'image unique
  const firstImage = singleImage?.image

  // Vérifier si l'image est un objet Media complet ou juste un ID
  const imageData = getPopulatedImageData(firstImage)

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
      <div className="relative overflow-hidden rounded-[40px] shadow-lg">
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
    <div className="richtext-content [&_p]:lg:text-muted-foreground flex min-w-[250px] flex-col gap-4 text-gray-500 [&_h2]:text-gray-700 [&_h3]:text-gray-600 [&_p]:text-xl">
      {content && <RichText className="m-0" data={content} />}
    </div>
  )

  return (
    <FadeUp
      delay={0.5}
      className={`container flex flex-col gap-8 py-20 md:items-center md:justify-center ${imagePosition === 'Gauche' ? 'md:flex-row-reverse' : 'md:flex-row'}`}
    >
      <div className="md:w-1/2">
        <ContentComponent />
      </div>
      <div className="md:w-1/2">
        <ImageComponent />
      </div>
    </FadeUp>
  )
}
