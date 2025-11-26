import { RichText } from '@payloadcms/richtext-lexical/react'

// import type { ContentWithImage as ContentWithImageProps } from '@/payload-types'
import BackgroundSection from '@/components/BackgroundSection/BackgroundSection'
import { DotPattern } from '@/components/DotPattern'
import { Media as MediaComponent } from '@/components/Media'
import { FadeUp } from '@/components/motion/animations'
import { ContentSectionBlock } from '@/payload-types'
import { getSelectedMedia } from '@/utilities/getSelectedMedia'
import { getPopulatedMediaData } from '@/utilities/isImagePopulated'

export const ContentWithImage: React.FC<ContentSectionBlock> = (props) => {
  const { content, singleImage, imagePosition, bgColor } = props

  // Récupérer le média sélectionné (image ou vidéo embed)
  const selectedMedia = getSelectedMedia(singleImage || {})

  // Vérifier si le média est un objet complet ou juste un ID
  const mediaData = getPopulatedMediaData(selectedMedia)

  // Composant pour afficher le média (image ou vidéo)
  const MediaDisplayComponent = () => {
    // Vérifier si le média est valide (Media avec url OU VideoEmbed avec source)
    const isValidMedia =
      mediaData &&
      (('url' in mediaData && mediaData.url) || ('source' in mediaData && mediaData.source))

    if (!isValidMedia) {
      return (
        <div className="flex h-64 w-full items-center justify-center bg-gray-200">
          <span className="text-gray-500">Média non disponible</span>
        </div>
      )
    }

    return (
      <div className="relative overflow-visible rounded-3xl shadow-lg">
        <MediaComponent
          resource={mediaData}
          className="aspect-video h-auto w-full rounded-3xl"
          videoClassName="aspect-video h-auto w-full rounded-3xl"
        />
        <DotPattern dotColor="bg-blue-base" className="-right-5 -bottom-20 -z-10 hidden lg:flex" />
      </div>
    )
  }

  // Composant pour le contenu texte
  const ContentComponent = () => (
    <div className="richtext-content [&_p]:lg:text-muted-foreground flex min-w-[250px] flex-col gap-4 text-gray-500 [&_h2]:mb-4 [&_h2]:text-gray-700 [&_h3]:text-gray-600 [&_p]:text-xl">
      {content && <RichText className="m-0" data={content} />}
    </div>
  )

  return (
    <section className="relative">
      <BackgroundSection className={bgColor || 'bg-white'} />
      <FadeUp
        delay={0.5}
        className={`container flex flex-col gap-8 py-8 md:items-center md:justify-center xl:pb-16 ${imagePosition === 'Gauche' ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
      >
        <div className="lg:w-1/2">
          <ContentComponent />
        </div>
        <div className="lg:w-1/2">
          <MediaDisplayComponent />
        </div>
      </FadeUp>
    </section>
  )
}
