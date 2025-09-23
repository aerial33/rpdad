import React from 'react'

import { ContentSection } from '@/blocks/contentSection/variants/contentWithCard/contentWithCard'
import type { ContentSectionBlock as ContentSectionBlockType } from '@/payload-types'

export const ContentSectionBlock: React.FC<ContentSectionBlockType> = ({
  images,
  cardInfo,
  badge,
  content,
  button,
}) => {
  return (
    <ContentSection
      images={images}
      cardInfo={cardInfo}
      badge={badge}
      content={content}
      button={button}
    />
  )
}
