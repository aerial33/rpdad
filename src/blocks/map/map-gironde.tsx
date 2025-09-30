'use client'

import { useState } from 'react'

import { Arrondissement } from '@/components/geomap/arrondissement'

// Définir une interface pour les propriétés du canton
export interface CantonProperties {
  code: string
  nom: string
  villes?: string[]
  // Ajoutez d'autres propriétés si nécessaire
}

export function MapBlock() {
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
    <section className="py-8">
      <div className="center-element mb-8 grid grid-cols-1">
        {/* <FadeUp className="p-2 md:p-4">
          <Badge
            variant={'outline'}
            className=" border-primary text-sm md:text-md text-muted-foreground"
          >
            {'les services membres'}
          </Badge>
          <h2 className="my-2 md:my-4 text-lg md:text-3xl text-balance text-gray-800">
            {
              "Les CCAS et CIAS de vos communes ou intercommunalité vous proposent un service d'aide et d'accompagnement à domicile de qualité : "
            }
          </h2>
          <p className="text-balance feature-paragraph font-semibold text-sm md:text-base">
            {
              "Le Réseau Public Départemental d'Aide à Domicile de la Gironde compte à ce jour 33 services membres. Il s'agit exclusivement de services publics de proximité :"
            }
          </p>
          <ul className="mt-2 md:mt-4 list-disc pl-5 text-gray-500 text-xs md:text-base">
            <li>{"Centres Communaux d'Action Sociale (CCAS)"}</li>
            <li>{"Centres Intercommunaux d'Action Sociale (CIAS)"}</li>
          </ul>
          {selectedArea && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-flamingo-lightest mt-2 md:mt-4 rounded-md p-2 md:p-3"
            >
              <p className="text-primary-dark text-sm md:text-base">
                Ville sélectionnée: <strong>{selectedArea.name}</strong>
              </p>

              <div className="mt-1 md:mt-2">
                <p className="text-primary-dark font-medium text-xs md:text-base">
                  Service disponible :
                </p>
                <div className="mt-1">
                  <Link
                    href={`/services-membres/${selectedArea.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-flamingo hover:text-flamingo-dark font-medium underline text-xs md:text-base"
                  >
                    CCAS/CIAS de {selectedArea.name}
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </FadeUp> */}
        <div className="-mx-4 p-0 md:mx-0 md:p-4">
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
        </div>
      </div>
    </section>
  )
}
