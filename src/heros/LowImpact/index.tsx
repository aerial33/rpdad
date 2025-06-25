import React from 'react'

import type { Page } from '@/payload-types'

import { DotPattern } from '@/components/DotPattern'
import RichText from '@/components/RichText'
import { Badge } from '@/components/ui/badge'

type LowImpactHeroType =
  | {
      children?: React.ReactNode
      richText?: never
    }
  | (Omit<Page['hero'], 'richText'> & {
      children?: never
      richText?: Page['hero']['richText']
    })

export const LowImpactHero: React.FC<LowImpactHeroType> = ({ children, richText }) => {
  return (
    <section className="from-flamingo-lighter to-flamingo-lightest relative rounded-b-4xl bg-gradient-to-t py-8 shadow md:py-16">
      <div className="mx-auto flex max-w-7xl items-center justify-center">
        <div className="hidden grid-cols-2 grid-rows-2 gap-4 px-4 lg:grid">
          <DotPattern
            className="col-span-1 row-start-1"
            dotColor="bg-primary"
            dotSize="md"
            gap="sm"
            rows={8}
            cols={8}
          />
          <DotPattern
            className="col-span-1 col-start-2 row-start-2"
            dotColor="bg-flamingo"
            dotSize="lg"
            gap="sm"
            rows={4}
            cols={8}
          />
        </div>
        <div className="mx-auto flex max-w-4xl  flex-col items-start px-4 py-6 sm:py-8 lg:items-center lg:px-0">
          <Badge variant="outline" className="border-flamingo mb-4 uppercase">
            <span className="font-bold">Le RPDAD</span>
          </Badge>
          {children ||
            (richText && <RichText data={richText} className="max-w-xl" enableGutter={false} />)}
          {/* <h1 className="text-foreground mb-4 max-w-4xl text-4xl font-bold text-balance lg:text-center lg:text-5xl lg:leading-tight">
          {dynamicTitle}
        </h1>
        <p className="feature-paragraph text-balance lg:text-center">
          {description}
        </p> */}
          {/* <div className="!mt-8 flex items-center gap-2">
        <Button>Contactez-nous</Button>
      </div> */}
        </div>
        <div className="hidden grid-cols-2 grid-rows-2 gap-4 px-4 md:grid">
          <DotPattern
            className="col-span-1 col-start-1 row-start-2"
            dotColor="bg-flamingo"
            gap="sm"
            dotSize="lg"
            rows={4}
            cols={8}
          />
          <DotPattern
            className="col-span-1 col-start-2 row-start-1"
            dotColor="bg-primary"
            gap="sm"
            dotSize="md"
            rows={8}
            cols={8}
          />
        </div>
      </div>
    </section>
    // <div className="container mt-16">
    //   <div className="max-w-[48rem]">
    //     {children || (richText && <RichText data={richText} enableGutter={false} />)}
    //   </div>
    // </div>
  )
}
