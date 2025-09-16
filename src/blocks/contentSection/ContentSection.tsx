// src/components/sections/ContentSection.tsx
import React from 'react'

import Link from 'next/link'

import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'

import type { ContentSectionProps } from './types'
import { DEFAULT_BG_CLASSES, DEFAULT_CONTAINER_CLASSES, getImageByIndex } from './utils'

const ImageDisplay: React.FC<{ image?: { src: string; alt: string } }> = ({ image }) => {
  if (!image) return null

  return <img className="rounded-xl" src={image.src} srcSet={image.src} alt={image.alt} />
}

const InfoCard: React.FC<{ cardInfo: { value: string; label: string } }> = ({ cardInfo }) => (
  <div className="card from-chateau-lighter to-chateau-lightest rounded-xl bg-gradient-to-bl !text-center">
    <div className="card-body counter-wrapper !px-[2rem] !py-12">
      <h3 className="!mb-2 !text-[calc(1.325rem_+_0.9vw)] !leading-none font-semibold !tracking-[normal] !whitespace-nowrap xl:!text-[2rem]">
        {cardInfo.value}
      </h3>
      <p className="!mb-0 text-sm font-medium">{cardInfo.label}</p>
    </div>
  </div>
)

export function ContentSection({
  bgClass = DEFAULT_BG_CLASSES,
  containerClass = DEFAULT_CONTAINER_CLASSES,
  images,
  cardInfo,
  dotPatternTop,
  dotPatternBottom,
  title,
  content,
  buttonText,
  buttonHref,
  buttonIcon,
}: ContentSectionProps) {
  const firstImage = getImageByIndex(images, 0)
  const secondImage = getImageByIndex(images, 1)

  return (
    <section className={bgClass}>
      <div className={containerClass}>
        <div className="mx-[-15px] !mt-[-50px] flex flex-wrap items-center lg:mx-[-20px] xl:mx-[-35px]">
          {/* Colonne images + card */}
          <div className="!relative !mt-[50px] w-full max-w-full flex-[0_0_auto] !px-[15px] lg:w-7/12 lg:!px-[20px] xl:w-7/12 xl:!px-[35px]">
            {/* DotPattern décoratif en haut */}
            {dotPatternTop}
            <div className="mx-[-15px] !mt-[-25px] flex flex-wrap md:mx-[-12.5px] lg:mx-[-12.5px] xl:mx-[-12.5px]">
              <div className="!mt-[25px] w-full max-w-full flex-[0_0_auto] px-[12.5px] md:w-6/12 lg:w-6/12 xl:w-6/12">
                <figure className="!relative rounded-xl md:!mt-10 lg:!mt-10 xl:!mt-10">
                  <ImageDisplay image={firstImage} />
                </figure>
              </div>
              <div className="!mt-[25px] w-full max-w-full flex-[0_0_auto] px-[12.5px] md:w-6/12 lg:w-6/12 xl:w-6/12">
                <div className="mx-[-15px] !mt-[-25px] flex flex-wrap md:mx-[-12.5px] lg:mx-[-12.5px] xl:mx-[-12.5px]">
                  <div className="!mt-[25px] w-full max-w-full flex-[0_0_auto] px-[12.5px] md:!order-2 lg:!order-2 xl:!order-2">
                    <figure className="rounded-xl">
                      <ImageDisplay image={secondImage} />
                    </figure>
                  </div>
                  <div className="!mt-[25px] w-full max-w-full flex-[0_0_auto] px-[12.5px] md:w-10/12 lg:w-10/12 xl:w-10/12">
                    <InfoCard cardInfo={cardInfo} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Colonne texte */}
          <div className="relative !mt-[50px] w-full max-w-full flex-[0_0_auto] !px-[15px] lg:w-5/12 lg:!px-[20px] xl:w-5/12 xl:!px-[35px]">
            <h2 className="!mb-3 !leading-[1.3] font-bold">{title}</h2>
            <div className="richtext-content">
              <RichText
                data={content}
                enableGutter={false}
                enableProse={false}
                className="[&>*:first-child]:feature-paragraph [&>*:not(:first-child)]:text-muted-foreground [&>*:last-child]:mb-8"
              />
            </div>
            {buttonText && buttonHref && (
              <Button className="group !mt-8">
                <Link href={buttonHref}>{buttonText}</Link>
                {buttonIcon && (
                  <span className="ml-2 text-lg transition-transform group-hover:translate-x-1">
                    {buttonIcon}
                  </span>
                )}
              </Button>
            )}
            {/* DotPattern décoratif en bas */}
            {dotPatternBottom}
          </div>
        </div>
      </div>
    </section>
  )
}