'use client'

import Image from 'next/image'

import { EmploiRenderer } from '@/blocks/FeatureCollection/EmploiRenderer'
import { Badge } from '@/components/ui/badge'

import type { EmploiShowcaseProps } from './types'

export function EmploiShowcase({
  totalDocs = 0,
  items = [],
  emploiTitle,
  emploiSubtitle,
}: EmploiShowcaseProps) {
  return (
    <div className="">
      {/* HEADER */}
      <div className="mx-auto h-120 w-full px-2 pt-12 xl:max-w-screen-2xl">
        <div className="aspect-w-16 aspect-h-13 sm:aspect-h-9 lg:aspect-h-8 xl:aspect-h-5 relative z-0 h-full overflow-hidden rounded-3xl md:rounded-[40px]">
          <Image
            alt="archive"
            fill
            src="/img/rpdad-emploi.webp"
            className="h-full w-full rounded-3xl object-cover object-[center_30%] brightness-60 md:rounded-[40px]"
            sizes="(max-width: 1280px) 100vw, 1536px"
          />
          <div className="bg-opacity-30 absolute inset-0 flex flex-col items-center justify-center text-white">
            <Badge className="mb-4 border-white text-white" variant="outline">
              {totalDocs} offres disponibles
            </Badge>
            <h1 className="inline-block align-middle text-5xl font-semibold md:text-7xl">
              Aide à Domicile
            </h1>
            <p className="mt-4 text-xl font-semibold text-neutral-50">
              Un métier qui change des vies. La vôtre aussi.
            </p>
            <span className="mt-4 block max-w-lg text-center text-neutral-50">
              Rejoignez une équipe engagée et donnez du sens à votre carrière dans l'aide à
              domicile.
            </span>
          </div>
        </div>
      </div>
      {/* ====================== END HEADER ====================== */}

      {items.length > 0 && (
        <EmploiRenderer
          items={items}
          title={emploiTitle}
          subtitle={emploiSubtitle}
          itemsPerPage={12}
        />
      )}
    </div>
  )
}
