'use client'

import { RichText } from '@payloadcms/richtext-lexical/react'
import { motion } from 'framer-motion'

import { useState } from 'react'

import Link from 'next/link'

import BackgroundSection from '@/components/BackgroundSection/BackgroundSection'
import { Arrondissement } from '@/components/geomap/arrondissement'
import { FadeUp } from '@/components/motion/animations'
import { Badge } from '@/components/ui/badge'
import type { MapBlock as MapBlockType } from '@/payload-types'

// Définir une interface pour les propriétés du canton
export interface CantonProperties {
  code: string
  nom: string
  villes?: string[]
  // Ajoutez d'autres propriétés si nécessaire
}

export function MapBlock(props: MapBlockType) {
  const { MapInfo } = props
  const [selectedArea, setSelectedArea] = useState<{
    id: string
    name: string
    villes?: string[]
  } | null>(null)

  const handleAreaClick = (areaId: string, areaName: string, extraData?: CantonProperties) => {
    console.log(extraData)
    if (selectedArea?.id === areaId) {
      setSelectedArea(null)
    } else {
      setSelectedArea({
        id: areaId,
        name: areaName,
        villes: extraData?.villes || [],
      })
    }
  }

  return (
    <section className="relative py-8">
      <BackgroundSection />
      <div className="relative z-10 container mb-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <FadeUp className="p-2 md:p-4">
          <Badge
            variant={'outline'}
            className="border-primary md:text-md text-muted-foreground text-sm"
          >
            {'les services membres'}
          </Badge>
          {MapInfo && (
            <div className="richtext-content my-4 text-gray-500 [&_h2]:text-gray-700 [&_h3]:text-gray-600 [&_p]:text-xl [&_p]:lg:text-gray-600">
              <RichText data={MapInfo} />
            </div>
          )}
          <ul className="mt-2 list-disc pl-5 text-xs text-gray-500 md:mt-4 md:text-base">
            <li>{"Centres Communaux d'Action Sociale (CCAS)"}</li>
            <li>{"Centres Intercommunaux d'Action Sociale (CIAS)"}</li>
          </ul>
          {selectedArea && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-primary-lightest mt-2 rounded-3xl p-2 md:mt-4 md:p-3"
            >
              <p className="text-sm text-gray-600 md:text-base">
                Pour la Ville sélectionnée: <strong>{selectedArea.name}</strong>
              </p>

              <div className="mt-1 md:mt-2">
                <p className="text-xs font-medium text-gray-700 md:text-base">
                  Service disponible :
                </p>
                <div className="mt-1">
                  <Link
                    href={`/services-membres/${selectedArea.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="hover:text-primary-dark text-xs font-medium text-gray-600 underline md:text-base"
                  >
                    CCAS/CIAS de {selectedArea.name}
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </FadeUp>
        <FadeUp delay={0.5} className="-mx-4 p-0 md:mx-0 md:p-4">
          <div className="w-full">
            <Arrondissement
              onMarkerClick={(marker) => {
                setSelectedArea({
                  id: marker.name.toLowerCase().replace(/\s+/g, '-'),
                  name: marker.name,
                  villes: [marker.name],
                })
              }}
              width={800}
              height={800}
              showLabels={false}
            />
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
