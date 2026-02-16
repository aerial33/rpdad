'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Building2, Calendar, MapPin } from 'lucide-react'

import { useState } from 'react'

import Link from 'next/link'

import { Media } from '@/components/Media'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
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
  itemsPerPage,
}: EmploiRendererProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [direction, setDirection] = useState(0) // -1 = prev (droite), 1 = next (gauche)

  const goToPage = (page: number) => {
    setDirection(page > currentPage ? 1 : -1)
    setCurrentPage(page)
  }

  const hasPagination = itemsPerPage && items.length > itemsPerPage
  const totalPages = hasPagination ? Math.ceil(items.length / itemsPerPage) : 1
  const displayedItems = hasPagination
    ? items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : items

  const hasNextPage = currentPage < totalPages
  const hasPrevPage = currentPage > 1
  const hasExtraPrevPages = currentPage - 1 > 1
  const hasExtraNextPages = currentPage + 1 < totalPages

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

        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: direction * 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 300, damping: 30 }}
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
                      <Badge variant="default" className="bg-primary-lighter text-primary text-xs">
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
                            <span className="text-muted-foreground mx-[6px] font-medium">·</span>
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

        {items.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground text-lg">
              Aucune offre d'emploi disponible pour le moment.
            </p>
            <p className="text-muted-foreground mt-2 text-sm">
              Revenez bientôt pour découvrir de nouvelles opportunités !
            </p>
          </div>
        )}

        {hasPagination && totalPages > 1 && (
          <div className="mt-12">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    disabled={!hasPrevPage}
                    onClick={() => goToPage(Math.max(1, currentPage - 1))}
                  />
                </PaginationItem>

                {hasExtraPrevPages && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                {hasPrevPage && (
                  <PaginationItem>
                    <PaginationLink onClick={() => goToPage(currentPage - 1)}>
                      {currentPage - 1}
                    </PaginationLink>
                  </PaginationItem>
                )}

                <PaginationItem>
                  <PaginationLink isActive>{currentPage}</PaginationLink>
                </PaginationItem>

                {hasNextPage && (
                  <PaginationItem>
                    <PaginationLink onClick={() => goToPage(currentPage + 1)}>
                      {currentPage + 1}
                    </PaginationLink>
                  </PaginationItem>
                )}

                {hasExtraNextPages && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                <PaginationItem>
                  <PaginationNext
                    disabled={!hasNextPage}
                    onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
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
