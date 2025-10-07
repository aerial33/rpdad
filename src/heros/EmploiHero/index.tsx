import React from 'react'
import { formatDateTime } from 'src/utilities/formatDateTime'

import type { Emplois } from '@/payload-types'

import { Media } from '@/components/Media'
import { FadeUp } from '@/components/motion/animations'
import { Badge } from '@/components/ui/badge'

export const EmploiHero: React.FC<{
  emploi: Emplois
}> = ({ emploi }) => {
  const {
    categories,
    featuredImage,
    location,
    organization,
    publishedAt,
    salary,
    title,
    workTime,
    status,
    startDate,
    endDate,
  } = emploi

  const getWorkTimeLabel = (workTime: string) => {
    const workTimeMap = {
      'full-time': 'Temps plein',
      'part-time': 'Temps partiel',
      flexible: 'Horaires flexibles',
    }
    return workTimeMap[workTime as keyof typeof workTimeMap] || workTime
  }
  // console.log('categories from EmploiHero', categories)

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: 'Active', color: 'bg-green-500' },
      filled: { label: 'Pourvue', color: 'bg-gray-500' },
      expired: { label: 'Expirée', color: 'bg-red-500' },
    }
    const config = statusConfig[status as keyof typeof statusConfig] || {
      label: status,
      color: 'bg-gray-500',
    }
    return (
      <Badge variant="outline" className={`${config.color} text-white border-transparent`}>
        {config.label}
      </Badge>
    )
  }

  return (
    <>
      <header className="relative pt-16 z-10 md:py-20 lg:py-28  bg-gradient-to-r from-primary to-primary-dark">
        <div className="container mx-auto relative z-10">
          <div className="max-w-screen-md">
            {/* Badges de statut */}
            <FadeUp delay={0.3} duration={0.6}>
              <div className="flex flex-wrap items-center gap-3 mb-8">
                {categories && categories.length > 0 && (
                  <>
                    {categories.map((category, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className=" text-white font-medium backdrop-blur-sm"
                      >
                        {typeof category === 'object' ? category.title : category}
                      </Badge>
                    ))}
                  </>
                )}
                {workTime && (
                  <Badge variant="outline" className=" text-white font-medium  backdrop-blur-sm">
                    {getWorkTimeLabel(workTime)}
                  </Badge>
                )}
              </div>
            </FadeUp>
            <h1 className=" text-3xl md:text-4xl font-bold text-white mb-10 text-balance leading-tight">
              {title}
            </h1>
            <div className="w-full border-b border-neutral-200 max-w-xl"></div>
            {publishedAt && (
              <div className="flex items-center gap-4 mt-8 ">
                <p className="text-sm text-white/80 font-medium">Publié le</p>
                <time className="text-white font-semibold" dateTime={publishedAt}>
                  {formatDateTime(publishedAt)}
                </time>
              </div>
            )}
          </div>
        </div>
        {/* FEATURED IMAGE */}
        <div className="mt-8 md:mt-0 md:absolute md:top-0 md:end-0 md:bottom-0 md:w-1/2 lg:w-2/5">
          <FadeUp delay={0.2} duration={0.8}>
            {featuredImage && typeof featuredImage !== 'string' && (
              <Media
                fill
                videoClassName="md:rounded-l-3xl object-cover  h-full w-full"
                imgClassName="md:rounded-l-3xl object-cover h-full w-full md:brightness-100 brightness-60"
                priority
                className="object-cover object-center"
                resource={featuredImage}
              />
            )}
          </FadeUp>
        </div>
      </header>
    </>
  )
}
