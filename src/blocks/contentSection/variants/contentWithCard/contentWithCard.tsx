// src/components/sections/ContentSection.tsx
import React from 'react'

import Link from 'next/link'

import BackgroundSection from '@/components/BackgroundSection/BackgroundSection'
import { DotPattern } from '@/components/DotPattern'
import { Media as MediaComponent } from '@/components/Media'
import RichText from '@/components/RichText'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { ContentSectionBlock as ContentSectionBlockType } from '@/payload-types'
import { getSelectedMedia } from '@/utilities/getSelectedMedia'
import { getPopulatedMediaData } from '@/utilities/isImagePopulated'

import { getIconComponent } from '../../utils'

const MediaDisplay: React.FC<{ mediaItem?: any }> = ({ mediaItem }) => {
  if (!mediaItem) return null

  // Récupérer le média sélectionné (image ou vidéo embed)
  const selectedMedia = getSelectedMedia(mediaItem)
  const mediaData = getPopulatedMediaData(selectedMedia)

  if (!mediaData && !selectedMedia) return null

  return <MediaComponent resource={mediaData || selectedMedia} imgClassName="rounded-xl" />
}

const InfoCard: React.FC<{ cardInfo: any }> = ({ cardInfo }) => (
  <div className="card from-chateau-lighter to-chateau-lightest rounded-xl bg-linear-to-bl text-center">
    <div className="card-body counter-wrapper richtext-content px-8! py-12!">
      <RichText data={cardInfo} enableGutter={false} enableProse={false} className="m-0" />
    </div>
  </div>
)

interface ContentSectionProps {
  images?: ContentSectionBlockType['multipleImages']
  cardInfo: ContentSectionBlockType['cardInfo']
  badge?: ContentSectionBlockType['badge']
  content: ContentSectionBlockType['content']
  button: ContentSectionBlockType['button']
  bgColor?: ContentSectionBlockType['bgColor']
}

export function ContentSection({
  images,
  cardInfo,
  badge,
  content,
  button,
  bgColor,
}: ContentSectionProps) {
  const firstMediaItem = images?.[0]
  const secondMediaItem = images?.[1]

  return (
    <section className="relative py-10">
      <BackgroundSection className={bgColor || 'bg-white'} />
      <div className="container mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-20 lg:pt-28 lg:pb-20 xl:pt-28 xl:pb-20 2xl:px-0">
        <div className="mx-[-15px] mt-[-50px]! flex flex-wrap items-center lg:mx-[-20px] xl:mx-[-35px]">
          {/* Colonne images + card */}
          <div className="relative mt-[50px] w-full max-w-full flex-[0_0_auto] px-[15px] lg:w-7/12 lg:px-[20px] xl:w-7/12 xl:px-[35px]">
            {/* DotPattern décoratif en haut */}
            <DotPattern dotColor="bg-flamingo" className="-top-10 left-0" />
            <div className="mx-[-15px] mt-[-25px] flex flex-wrap md:mx-[-12.5px] lg:mx-[-12.5px] xl:mx-[-12.5px]">
              <div className="mt-[25px] w-full max-w-full flex-[0_0_auto] px-[12.5px] md:w-6/12 lg:w-6/12 xl:w-6/12">
                <figure className="relative rounded-xl md:mt-10 lg:mt-10 xl:mt-10">
                  <MediaDisplay mediaItem={firstMediaItem} />
                </figure>
              </div>
              <div className="mt-[25px] w-full max-w-full flex-[0_0_auto] px-[12.5px] md:w-6/12 lg:w-6/12 xl:w-6/12">
                <div className="mx-[-15px] mt-[-25px] flex flex-wrap md:mx-[-12.5px] lg:mx-[-12.5px] xl:mx-[-12.5px]">
                  <div className="mt-[25px] w-full max-w-full flex-[0_0_auto] px-[12.5px] md:order-2 lg:order-2 xl:order-2">
                    <figure className="rounded-xl">
                      <MediaDisplay mediaItem={secondMediaItem} />
                    </figure>
                  </div>
                  <div className="mt-[25px] w-full max-w-full flex-[0_0_auto] px-[12.5px] md:w-10/12 lg:w-10/12 xl:w-10/12">
                    <InfoCard cardInfo={cardInfo} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Colonne texte */}
          <div className="relative mt-[50px] w-full max-w-full flex-[0_0_auto] px-[15px] lg:w-5/12 lg:px-[20px] xl:w-5/12 xl:px-[35px]">
            {badge && (
              <Badge
                className="border-flamingo-light text-muted-foreground mb-4"
                variant={'outline'}
              >
                {badge}
              </Badge>
            )}
            <div className="richtext-content">
              <RichText
                data={content}
                enableGutter={false}
                enableProse={false}
                className="[&>*:first-child]:feature-paragraph [&>*:not(:first-child)]:text-muted-foreground [&>*:last-child]:mb-8"
              />
            </div>
            {button?.text && button?.href && (
              <Button className="group mt-8">
                <Link href={button.href}>{button.text}</Link>
                {button.icon && button.icon !== 'none' && (
                  <span className="ml-2 text-lg transition-transform group-hover:translate-x-1">
                    {getIconComponent(button.icon)}
                  </span>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
