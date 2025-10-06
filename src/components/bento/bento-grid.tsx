import { ReactNode } from 'react'

import Link from 'next/link'

import type { BentoCardBlock, Media as MediaType } from '@/payload-types'
import { cn } from '@/utilities/ui'

import { Media } from '../Media'
import { Badge } from '../ui/badge'

const BentoGrid = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <div className={cn('grid w-full grid-cols-3 gap-4', className)}>{children}</div>
}

// Type d'une carte individuelle depuis PayloadCMS
type SingleCard = NonNullable<BentoCardBlock['cards']>[number]

// Extension du type PayloadCMS pour BentoCard
interface BentoCardProps extends Omit<SingleCard, 'id' | 'image'> {
  image?: string | number | MediaType | null // Media object, string ou number ID depuis PayloadCMS
  className?: string // Classes CSS Tailwind pour le design
}

const BentoCard = ({ title, className, image, description, link, tag }: BentoCardProps) => {
  // Extraire href et label depuis la structure link PayloadCMS
  const href = link?.url
  const label = link?.label

  return (
    <div className={cn('relative col-span-4 h-full rounded-[40px] p-6', className)}>
      <div className="ml-4 flex w-full max-w-md flex-1 flex-col items-center justify-center gap-6">
        <div className="flex flex-col items-center justify-center py-6">
          {tag && (
            <Badge variant="outline" className="mb-2 ml-auto block text-xs font-medium">
              {tag}
            </Badge>
          )}
          <h3 className="mb-2 max-w-sm text-left text-2xl font-bold text-gray-700 lg:text-2xl">
            {title}
          </h3>
          <p className="font-normal text-balance text-gray-500">{description}</p>
        </div>
        {image && (
          <Media resource={image} alt={title || 'Image'} className="mt-4 max-w-md" loading="lazy" />
        )}
      </div>
      {href && label && (
        <Link href={href} className="hover:text-primary mt-4 font-medium">
          {`${label} →`}
        </Link>
      )}
    </div>
  )
}

export { BentoCard, BentoGrid }
