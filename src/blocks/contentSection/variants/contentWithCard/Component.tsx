import React from 'react'

import { ContentSection } from '@/blocks/contentSection/variants/contentWithCard/contentWithCard'
import type { ContentSectionBlock as ContentSectionBlockType } from '@/payload-types'

export const ContentSectionBlock: React.FC<ContentSectionBlockType> = ({
  multipleImages,
  cardInfo,
  badge,
  content,
  button,
  bgColor,
}) => {
  return (
    <ContentSection
      images={multipleImages}
      cardInfo={cardInfo}
      badge={badge}
      content={content}
      button={button}
      bgColor={bgColor}
    />
  )
}
