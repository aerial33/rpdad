'use client'

import { ArrowRight, Building2, Calendar, MapPin } from 'lucide-react'

import { useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { FAQSection } from './FAQSection'
// import ReactPlayer from 'react-player'
import MediaDisplayEmploi from './MediaDisplayEmploi'
import { TestimonialSection } from './TestimonialSection'
import type { EmploiShowcaseProps } from './types'

export function EmploiShowcase({ emplois, totalDocs = 0 }: EmploiShowcaseProps) {
  const [isRendered, setIsRendered] = useState(false)
  const [hoveredEmploi, setHoveredEmploi] = useState<number | null>(null)

  useEffect(() => {
    setIsRendered(true)
  }, [])

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'Date non spécifiée'
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  // const renderMainVideo = () => (
  //   <div>
  //     {isRendered ? (
  //       <ReactPlayer
  //         //@ts-ignore
  //         url="https://youtu.be/VgYf32lPqo8?si=PlyNjXZIAKJG18fU"
  //         className="absolute inset-0"
  //         playing={true}
  //         width="100%"
  //         height="100%"
  //         controls
  //         muted
  //       />
  //     ) : null}
  //   </div>
  // )

  return (
    <div className="">
      {/* HEADER */}
      <div className="mx-auto h-120 w-full px-2 pt-12 xl:max-w-screen-2xl">
        <div className="aspect-w-16 aspect-h-13 sm:aspect-h-9 lg:aspect-h-8 xl:aspect-h-5 relative z-0 h-full overflow-hidden rounded-3xl md:rounded-[40px]">
          <Image
            alt="archive"
            fill
            src="https://images.pexels.com/photos/3184352/pexels-photo-3184352.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            className="h-full w-full rounded-3xl object-cover brightness-70 md:rounded-[40px]"
            sizes="(max-width: 1280px) 100vw, 1536px"
          />
          <div className="bg-opacity-30 absolute inset-0 flex flex-col items-center justify-center text-white">
            <Badge className="mb-4 text-white" variant="outline">
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

      {/* Section Offres d'emploi */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4 text-left lg:text-center">
          <div className="mb-16">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              {"Le Réseau Public Départemental d'Aide à Domicile de la Gironde"}
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              {
                "Nous accompagnons près de 5000 personnes âgées et personnes en situation de handicap qui choisissent de vivre à domicile. Grâce à nos agents de la fonction publique, nous aidons et soutenons nos bénéficiaires dans les actes de la vie quotidienne, en favorisant une coopération étroite avec l'ensemble des acteurs intervenant à leurs côtés."
              }
            </p>
          </div>

          {/* LOOP ITEMS */}
          {/* <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-8 lg:mt-10 mb-8 items-stretch">
            {emplois.map((emploi) => (
              <Card11 key={emploi.id} post={emploi} />
            ))}
          </div> */}

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {emplois.map((emploi) => (
              <Card
                key={emploi.id}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border-none bg-white/80 backdrop-blur-sm transition-all duration-300"
                onMouseEnter={() => setHoveredEmploi(emploi.id)}
                onMouseLeave={() => setHoveredEmploi(null)}
              >
                <CardHeader className="flex-shrink-0 p-0 pb-4">
                  <div
                    className={`relative z-10 block aspect-video w-full flex-shrink-0 overflow-hidden rounded-t-3xl`}
                  >
                    <MediaDisplayEmploi
                      emploi={emploi}
                      isHover={hoveredEmploi === emploi.id}
                      className="h-full w-full"
                    />
                  </div>
                  <span className="absolute top-3 left-4 z-10">
                    {emploi.categories &&
                      Array.isArray(emploi.categories) &&
                      emploi.categories.length > 0 && (
                        <Badge
                          variant="default"
                          className="bg-primary-lighter text-primary text-xs"
                        >
                          {typeof emploi.categories[0] === 'object'
                            ? emploi.categories[0].title
                            : emploi.categories[0]}
                        </Badge>
                      )}
                  </span>
                  <CardTitle className="mt-4 line-clamp-2 text-xl">{emploi.title}</CardTitle>
                </CardHeader>

                <CardContent className="flex flex-1 flex-col pt-0">
                  <CardDescription className="mb-4 line-clamp-3 flex-1 text-left">
                    {emploi.meta?.description ||
                      'Découvrez cette opportunité professionnelle au sein de notre réseau.'}
                  </CardDescription>

                  <div className="my-6 flex-shrink-0 space-y-2">
                    {emploi.organization && (
                      <div className="text-muted-foreground flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4" />
                          <span className="truncate">{emploi.organization}</span>
                        </div>
                        {emploi.publishedAt && (
                          <>
                            <span className="text-muted-foreground mx-[6px] font-medium">·</span>
                            <span className="text-muted-foreground flex items-center gap-2 text-sm">
                              <Calendar className="h-4 w-4" />
                              {formatDate(emploi.publishedAt)}
                            </span>
                          </>
                        )}
                      </div>
                    )}
                    {emploi.location && (
                      <div className="text-muted-foreground flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4" />
                        <span className="truncate">{emploi.location}</span>
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
          </div>

          {emplois.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground text-lg">
                Aucune offre d'emploi disponible pour le moment.
              </p>
              <p className="text-muted-foreground mt-2 text-sm">
                Revenez bientôt pour découvrir de nouvelles opportunités !
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Section Mission */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <Building2 className="text-primary h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Notre mission</h3>
              <p className="text-muted-foreground text-sm">
                Nous soutenons nos bénéficiaires au quotidien grâce à nos agents de la fonction
                publique.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <MapPin className="text-primary h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Service centré sur vous</h3>
              <p className="text-muted-foreground text-sm">
                Nous simplifions le parcours de soins en élaborant des solutions individuelles.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <Calendar className="text-primary h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Innovation et qualité</h3>
              <p className="text-muted-foreground text-sm">
                Nos projets innovants modernisent l'organisation et rehaussent la qualité de vie au
                travail.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <ArrowRight className="text-primary h-8 w-8" />
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

      {/* Section Témoignages */}
      <TestimonialSection />

      {/* Section FAQ */}
      <FAQSection />

      {/* Section Call to Action */}
      <section className="from-primary to-secondary bg-gradient-to-r py-20 lg:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-3xl text-white">
            <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              Prêt à rejoindre votre équipe ?
            </h2>
            <p className="mb-8 text-xl opacity-90">
              Découvrez nos offres d'emploi et donnez du sens à votre carrière dans l'aide à
              domicile.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" className="gap-2">
                Voir toutes les offres
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-white/20 bg-white/10 text-white hover:bg-white/20"
              >
                Nous contacter
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
