'use client'

import { useEffect, useState } from 'react'

import BackgroundSection from '@/components/BackgroundSection/BackgroundSection'
import { MembreMapLayout } from '@/components/ShowCaseMembers/MembreMapLayout'
import type { MembreShowcase } from '@/components/ShowCaseMembers/types'
import type { MembresMapBlock as MembresMapBlockType } from '@/payload-types'

export function MembresMapBlock(props: MembresMapBlockType) {
  const { introContent, bgColor } = props
  const [membres, setMembres] = useState<MembreShowcase[]>([])

  useEffect(() => {
    const fetchMembres = async () => {
      try {
        const response = await fetch('/api/membres?limit=100&where[coordinates.lat][exists]=true')
        const data = await response.json()
        if (data.docs) {
          const sorted = [...data.docs].sort((a: MembreShowcase, b: MembreShowcase) =>
            (a.name ?? '').localeCompare(b.name ?? '', 'fr'),
          )
          setMembres(sorted)
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des membres:', error)
      }
    }

    fetchMembres()
  }, [])

  return (
    <section className="relative py-8">
      <BackgroundSection className={bgColor || 'bg-white'} />
      <MembreMapLayout membres={membres} introContent={introContent ?? undefined} />
    </section>
  )
}
