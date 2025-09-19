import React from 'react'

import { ContentSection } from '@/blocks/contentSection/ContentSection'
import { DotPattern } from '@/components/DotPattern'
import type { ContentSectionBlock as ContentSectionBlockType } from '@/payload-types'

import { DEFAULT_BG_CLASSES, getIconComponent, transformImages } from './utils'

const createDotPattern = (config: any, isTop: boolean) => {
  if (!config?.enabled) return null

  const baseProps = {
    className: config.className || '',
    rows: config.rows || (isTop ? 11 : 9),
    cols: config.cols || (isTop ? 11 : 9),
    dotSize: config.dotSize || (isTop ? 'md' : 'sm'),
    dotColor: config.dotColor || (isTop ? 'bg-flamingo' : 'bg-primary-dark'),
    gap: config.gap || 'md',
  }

  return isTop ? (
    <DotPattern {...baseProps} />
  ) : (
    <DotPattern {...baseProps} variant={config.variant as any} />
  )
}

export const ContentSectionBlock: React.FC<ContentSectionBlockType> = ({
  images,
  cardInfo,
  title,
  content,
  button,
  dotPatterns,
  bgClass,
}) => {
  const transformedImages = transformImages(images || [])
  const dotPatternTop = createDotPattern(dotPatterns?.top, true)
  const dotPatternBottom = createDotPattern(dotPatterns?.bottom, false)

  return (
    <ContentSection
      images={transformedImages}
      cardInfo={cardInfo}
      dotPatternTop={dotPatternTop}
      dotPatternBottom={dotPatternBottom}
      title={title}
      content={content}
      buttonText={button?.text}
      buttonHref={button?.href}
      buttonIcon={button?.icon ? getIconComponent(button.icon) : undefined}
      bgClass={bgClass || DEFAULT_BG_CLASSES}
    />
  )
}
