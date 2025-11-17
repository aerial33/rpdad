import type { BannerBlock as BannerBlockProps } from 'src/payload-types'

import React from 'react'

import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

type Props = {
  className?: string
} & BannerBlockProps

export const BannerBlock: React.FC<Props> = ({ className, content, style }) => {
  return (
    <div className={cn('mx-auto my-8 w-full', className)}>
      <div
        className={cn('flex items-center rounded-xl border-l-6 px-6 py-3', {
          'bg-card/30': style === 'info',
          'border-error bg-error/10': style === 'error',
          'border-success bg-success/10': style === 'success',
          'border-warning bg-warning/10': style === 'warning',
        })}
      >
        <RichText data={content} enableGutter={false} enableProse={false} />
      </div>
    </div>
  )
}
