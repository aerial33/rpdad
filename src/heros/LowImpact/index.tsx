import React from 'react'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { Badge } from '@/components/ui/badge'
import type { Page } from '@/payload-types'

const bgStyleClasses: Record<string, string> = {
  primary: 'from-primary-light via-[#cc35a1] to-primary-dark',
  blue: 'from-[#21839c] via-[#21839c] to-blue-darkest',
  flamingo: 'from-flamingo-lightest via-flamingo-light to-flamingo-dark',
  chateau: 'from-chateau-lightest via-chateau-light to-chateau-dark',
  yellow: 'from-flamingo-lighter via-yellow-light to-yellow-dark',
}

export const LowImpactHero: React.FC<Page['hero']> = ({
  badge,
  backgroundStyle,
  media,
  richText,
}) => {
  return (
    <section className="">
      <div className="mx-auto h-120 w-full px-2 pt-12 xl:max-w-screen-2xl">
        <div className="aspect-w-16 aspect-h-13 sm:aspect-h-9 lg:aspect-h-8 xl:aspect-h-5 relative z-0 h-full overflow-hidden rounded-3xl md:rounded-[40px]">
          {/* Image avec Media component ou dégradé par défaut */}
          {media && typeof media === 'object' ? (
            <Media
              resource={media}
              fill
              variant="xlarge"
              imgClassName="h-full w-full rounded-3xl object-cover brightness-70 md:rounded-[40px]"
              priority
            />
          ) : (
            <div
              className={`${bgStyleClasses[backgroundStyle || 'primary']} absolute inset-0 rounded-3xl bg-linear-to-br md:rounded-[40px]`}
            />
          )}

          {/* Overlay avec contenu */}
          <div className="richtext-content absolute inset-0 flex flex-col items-center justify-center text-center">
            {badge && (
              <Badge className="mb-4 border-white text-white" variant="outline">
                {badge}
              </Badge>
            )}
            {richText && (
              <RichText
                data={richText}
                className="max-w-xl [&_h1]:align-middle [&_h1]:text-5xl [&_h1]:text-white [&_h1]:md:text-7xl [&_h2]:text-white [&_h3]:text-white [&_p]:text-white"
                enableGutter={false}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
