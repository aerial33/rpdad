'use client'

import { useState } from 'react'

import CardMembers from './CardMembers'
import { ShowCaseMembersMap } from './MapShowCase'
import type { MembreShowcase } from './types'

export interface MembreMapViewProps {
  membres: MembreShowcase[]
  totalDocs: number
}

export interface Marker {
  name: string
  coordinates: [number, number]
}

export function MembreMapView({ membres, totalDocs }: MembreMapViewProps) {
  const [selectedMarkerName, setSelectedMarkerName] = useState<string | null>(null)

  const handleMarkerClick = (marker: Marker) => {
    console.log('Marker cliqué:', marker)
    setSelectedMarkerName(marker.name)
    // TODO Phase 2: Scroll vers la card correspondante + highlight
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-16">
        <h2 className="mb-2 text-3xl font-bold tracking-tight text-gray-700 md:text-4xl lg:text-5xl">
          Le Réseau Public Départemental d'Aide à Domicile de la Gironde
        </h2>
        <p className="text-muted-foreground max-w-2xl text-xl">
          Un réseau de {totalDocs} structures associatives engagées dans l'accompagnement et le
          soutien des personnes à domicile partout en Gironde.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 pt-8 md:gap-8 lg:grid-cols-2">
        {/* Carte interactive */}
        <div className="w-full">
          <ShowCaseMembersMap
            onMarkerClick={handleMarkerClick}
            width={800}
            height={800}
            showLabels={false}
          />
        </div>

        {/* Liste des cards membres - Scrollable */}
        <div className="h-[800px] overflow-x-hidden overflow-y-auto">
          <div className="grid gap-6 pr-2 md:gap-8">
            {membres.map((membre) => (
              <CardMembers key={membre.id} membre={membre} />
            ))}
          </div>
        </div>
      </div>

      {membres.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground text-lg">Aucun membre disponible pour le test.</p>
        </div>
      )}
    </div>
  )
}
