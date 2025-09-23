import React from 'react'

import type { ContentSectionBlock as ContentSectionBlockType } from '@/payload-types'

import { BasicContent } from './variants/BasicContent'
import { ContentWithImage } from './variants/ContentWithImage'
import { ImageGrid } from './variants/ImageGrid'
import { ContentSection as ContentWithCard } from './variants/contentWithCard/contentWithCard'

export const TextMediaSectionBlock: React.FC<ContentSectionBlockType> = (props) => {
  const { variant } = props

  const variants: Record<string, React.FC<any>> = {
    basicContent: BasicContent,
    contentWithImage: ContentWithImage,
    contentWithGallery: ImageGrid,
    contentWithCard: ContentWithCard,
  }

  const VariantComponent = variants[variant] || BasicContent
  return <VariantComponent {...props} />
}

export default TextMediaSectionBlock
