'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Building2, Calendar, MapPin } from 'lucide-react'

import { useCallback, useState } from 'react'
import { useSwipeable } from 'react-swipeable'

import Link from 'next/link'

import { Media } from '@/components/Media'
import { NextBtn, PrevBtn } from '@/components/Slider'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { Emplois } from '@/payload-types'
import { displayDate } from '@/utilities/formatDateTime'

export interface EmploiRendererProps {
  items: Emplois[]
  title?: string | null
  subtitle?: string | null
  badgeText?: string | null
  buttonText?: string | null
  buttonLink?: string | null
  itemsPerPage?: number
}

const extractTextFromLexical = (content: any): string => {
  if (!content?.root?.children) return ''

  const extractTextFromNode = (node: any): string => {
    if (node.type === 'text') return node.text || ''
    if (node.children && Array.isArray(node.children)) {
      return node.children.map(extractTextFromNode).join(' ')
    }
    return ''
  }

  return content.root.children.map(extractTextFromNode).join(' ').trim()
}

const getDescription = (emploi: Emplois): string => {
  if (emploi.meta?.description) return emploi.meta.description
  if (emploi.content) {
    const text = extractTextFromLexical(emploi.content)
    return text.slice(0, 150) + (text.length > 150 ? '...' : '')
  }
  return 'Découvrez cette opportunité professionnelle au sein de notre réseau.'
}

export function EmploiRenderer({
  items,
  title,
  subtitle,
  badgeText,
  buttonText,
  buttonLink,
  itemsPerPage = 6,
}: EmploiRendererProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [direction, setDirection] = useState(0)

  const totalPages = itemsPerPage ? Math.ceil(items.length / itemsPerPage) : 1
  const hasPagination = totalPages > 1
  const displayedItems = hasPagination
    ? items.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
    : items

  const goToPage = useCallback(
    (page: number) => {
      if (page < 0 || page >= totalPages || page === currentPage) return
      setDirection(page > currentPage ? 1 : -1)
      setCurrentPage(page)
    },
    [currentPage, totalPages],
  )

  const handlers = useSwipeable({
    onSwipedLeft: () => goToPage(currentPage + 1),
    onSwipedRight: () => goToPage(currentPage - 1),
    trackMouse: true,
  })

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault()
        goToPage(currentPage - 1)
        break
      case 'ArrowRight':
        e.preventDefault()
        goToPage(currentPage + 1)
        break
      case 'Home':
        e.preventDefault()
        goToPage(0)
        break
      case 'End':
        e.preventDefault()
        goToPage(totalPages - 1)
        break
    }
  }

  return (
    <section className="bg-muted/30 py-20">
      <div className="container mx-auto px-4 text-center">
        {(title || subtitle) && (
          <div className="mx-auto mb-16 xl:mb-24">
            {title && (
              <h2 className="mb-4 text-4xl font-bold tracking-tight text-balance lg:text-5xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-muted-foreground mx-auto max-w-2xl text-xl">{subtitle}</p>
            )}
          </div>
        )}

        {items.length > 0 ? (
          <div
            {...handlers}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className="relative focus:outline-none"
            role="region"
            aria-roledescription="carousel"
            aria-label={`Offres d'emploi, page ${currentPage + 1} sur ${totalPages}`}
          >
            {hasPagination && (
              <div className="mb-6 flex items-center justify-center gap-3" role="tablist">
                <PrevBtn
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 0}
                  className="hidden h-8 w-8 md:flex"
                />
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => {
                    const isActive = currentPage === i
                    return (
                      <button
                        key={i}
                        role="tab"
                        aria-selected={isActive}
                        aria-label={`Page ${i + 1}`}
                        onClick={() => goToPage(i)}
                        className={`rounded-full transition-all duration-300 ${
                          isActive
                            ? 'bg-primary h-2.5 w-2.5'
                            : 'bg-muted-foreground/30 hover:bg-muted-foreground/50 h-2 w-2'
                        }`}
                      />
                    )
                  })}
                </div>
                <NextBtn
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages - 1}
                  className="hidden h-8 w-8 md:flex"
                />
              </div>
            )}

            <div className="relative overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                <motion.div
                  key={currentPage}
                  custom={direction}
                  variants={{
                    enter: (dir: number) => ({ x: `${(dir || 1) * 100}%` }),
                    center: { x: 0 },
                    exit: (dir: number) => ({
                      x: `${(dir || 1) * -100}%`,
                      position: 'absolute' as const,
                      top: 0,
                      left: 0,
                      width: '100%',
                    }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
                >
                  {displayedItems.map((emploi) => (
                    <Card
                      key={emploi.id}
                      className="group flex h-full flex-col overflow-hidden rounded-3xl border-none bg-white/80 backdrop-blur-sm transition-all duration-300"
                    >
                      <CardHeader className="shrink-0 p-0 pb-4">
                        <div className="relative z-10 block aspect-video w-full shrink-0 overflow-hidden rounded-t-3xl">
                          {emploi.image && typeof emploi.image === 'object' && (
                            <Media
                              resource={emploi.image}
                              fill
                              imgClassName="object-cover object-[center_30%]"
                            />
                          )}
                        </div>
                        <span className="absolute top-3 left-4 z-10">
                          {emploi.typeContrat && (
                            <Badge
                              variant="default"
                              className="bg-primary-lighter text-primary text-xs"
                            >
                              {emploi.typeContrat.toUpperCase()}
                            </Badge>
                          )}
                        </span>
                        <CardTitle className="mt-4 line-clamp-2 text-center text-xl">
                          {emploi.title}
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="flex flex-1 flex-col pt-0">
                        <CardDescription className="mb-4 line-clamp-3 flex-1 text-left">
                          {getDescription(emploi)}
                        </CardDescription>

                        <div className="my-6 shrink-0 space-y-2">
                          {emploi.organisme?.nom && (
                            <div className="text-muted-foreground flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <Building2 className="h-4 w-4" />
                                <span className="truncate">{emploi.organisme.nom}</span>
                              </div>
                              {emploi.publishedAt && (
                                <>
                                  <span className="text-muted-foreground mx-[6px] font-medium">
                                    ·
                                  </span>
                                  <span className="text-muted-foreground flex items-center gap-2 text-sm">
                                    <Calendar className="h-4 w-4" />
                                    {displayDate(emploi.publishedAt)}
                                  </span>
                                </>
                              )}
                            </div>
                          )}
                          {emploi.organisme?.lieu && (
                            <div className="text-muted-foreground flex items-center gap-2 text-sm">
                              <MapPin className="h-4 w-4" />
                              <span className="truncate">{emploi.organisme.lieu}</span>
                            </div>
                          )}
                        </div>

                        <Button
                          asChild
                          className="mt-auto w-full rounded-2xl transition-all group-hover:shadow-md"
                        >
                          <Link href={`/emplois/${emploi.slug || '#'}`}>
                            Voir l'offre
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-muted-foreground text-lg">
              Aucune offre d'emploi disponible pour le moment.
            </p>
            <p className="text-muted-foreground mt-2 text-sm">
              Revenez bientôt pour découvrir de nouvelles opportunités !
            </p>
          </div>
        )}

        {buttonLink && buttonText && (
          <div className="mt-12">
            <Button asChild variant="outline" className="rounded-2xl">
              <Link href={buttonLink}>
                {buttonText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
