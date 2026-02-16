'use client'

import { Building2, Handshake, Sparkles, UsersRound } from 'lucide-react'

import Image from 'next/image'

import { EmploiRenderer } from '@/blocks/FeatureCollection/EmploiRenderer'
import { Badge } from '@/components/ui/badge'

import { FAQSection } from './FAQSection'
import { TestimonialSection } from './TestimonialSection'
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
        <EmploiRenderer items={items} title={emploiTitle} subtitle={emploiSubtitle} />
      )}

      {/* Section Mission */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="bg-flamingo/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <Building2 className="text-flamingo h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Notre mission</h3>
              <p className="text-muted-foreground text-sm">
                Nous soutenons nos bénéficiaires au quotidien grâce à nos agents de la fonction
                publique.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-chateau/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <UsersRound className="text-chateau h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Service centré sur vous</h3>
              <p className="text-muted-foreground text-sm">
                Nous simplifions le parcours de soins en élaborant des solutions individuelles.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <Sparkles className="text-primary h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Innovation et qualité</h3>
              <p className="text-muted-foreground text-sm">
                Nos projets innovants modernisent l'organisation et rehaussent la qualité de vie au
                travail.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-300/10">
                <Handshake className="h-8 w-8 text-yellow-300" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Partenariats locaux</h3>
              <p className="text-muted-foreground text-sm">
                En collaboration avec le CD33 et divers organismes pour un accompagnement de
                proximité.
              </p>
            </div>
          </div>
        </div>
      </section>

      <TestimonialSection />
      <FAQSection />
    </div>
  )
}
