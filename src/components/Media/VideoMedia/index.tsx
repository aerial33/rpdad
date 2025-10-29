'use client'

import React, { Fragment, useRef, useState } from 'react'

import Image from 'next/image'

import { getMediaUrl } from '@/utilities/getMediaUrl'
import { cn } from '@/utilities/ui'

import type { Props as MediaProps } from '../types'
import { PlayButton } from './PlayButton'

export const VideoMedia: React.FC<MediaProps> = (props) => {
  const { onClick, resource, videoClassName } = props
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  if (!resource || typeof resource !== 'object') return null

  const { filename, mimeType, videoPoster } = resource

  // CAS 1: UPLOADED VIDEO WITH POSTER
  if (videoPoster && typeof videoPoster === 'object') {
    return (
      <div className={cn('group relative aspect-video', videoClassName)}>
        {!isPlaying ? (
          <Fragment>
            <div className="absolute inset-0 z-20" onClick={() => setIsPlaying(true)}>
              <PlayButton />
            </div>
            <Image
              src={getMediaUrl(`/api/media/file/${videoPoster.filename}`)}
              alt="Thumbnail vidéo"
              fill
              className="m-0 object-cover"
            />
          </Fragment>
        ) : (
          <video ref={videoRef} controls autoPlay className="w-full">
            <source src={getMediaUrl(`/api/media/file/${filename}`)} type={mimeType || undefined} />
          </video>
        )}
      </div>
    )
  }

  // CAS 2: UPLOADED VIDEO WITHOUT POSTER (fallback actuel préservé)
  return (
    <video
      ref={videoRef}
      autoPlay={false}
      controls={true}
      muted={false}
      onClick={onClick}
      playsInline
      className={cn(videoClassName)}
    >
      <source src={getMediaUrl(`/api/media/file/${filename}`)} />
    </video>
  )
}
