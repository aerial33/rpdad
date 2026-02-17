import React from 'react'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import type {
  ContentBlock as ContentBlockProps,
  Media as MediaType,
  VideoEmbed,
} from '@/payload-types'
import { getSelectedMedia } from '@/utilities/getSelectedMedia'
import { getPopulatedMediaData } from '@/utilities/isImagePopulated'

import { CMSLink } from '../../components/Link'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  // Classes responsives pour chaque taille
  const getResponsiveClasses = (size: string) => {
    const sizeMap = {
      full: 'col-span-4 md:col-span-4 lg:col-span-12',
      half: 'col-span-4 md:col-span-2 lg:col-span-6',
      oneThird: 'col-span-4 md:col-span-2 lg:col-span-4',
      twoThirds: 'col-span-4 md:col-span-3 lg:col-span-8',
    }
    return sizeMap[size as keyof typeof sizeMap] || 'col-span-4'
  }

  return (
    <div className="container mx-auto my-16 px-4 lg:max-w-7xl">
      <div className="grid grid-cols-4 gap-x-16 gap-y-8 lg:grid-cols-12">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, enableMedia, mediaPosition, link, richText, size } = col

            let mediaElement: React.ReactNode = null
            if (enableMedia) {
              const selectedMedia = getSelectedMedia(col)
              const mediaData = getPopulatedMediaData(selectedMedia)
              if (mediaData) {
                mediaElement = (
                  <Media
                    resource={mediaData as MediaType | VideoEmbed}
                    imgClassName="w-full rounded-lg"
                  />
                )
              }
            }

            return (
              <div className={`${getResponsiveClasses(size!)} richtext-content`} key={index}>
                {enableMedia && mediaPosition !== 'below' && mediaElement}

                {richText && (
                  <RichText
                    data={richText}
                    enableGutter={false}
                    className="[&>*:first-child]:feature-paragraph [&>*:not(:first-child)]:text-muted-foreground [&>*:last-child]:mb-8"
                  />
                )}

                {enableMedia && mediaPosition === 'below' && mediaElement}

                {enableLink && <CMSLink {...link} />}
              </div>
            )
          })}
      </div>
    </div>
  )
}
