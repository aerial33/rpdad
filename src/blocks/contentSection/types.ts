import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { ReactNode } from 'react'

export interface CardInfo {
  value: string
  label: string
  className?: string
}

export interface ImageInfo {
  src: string
  alt: string
  className?: string
}

export interface ButtonConfig {
  text?: string
  href?: string
  icon?: string
}

export interface DotPatternConfig {
  enabled?: boolean
  className?: string
  rows?: number
  cols?: number
  dotSize?: 'sm' | 'md' | 'lg'
  dotColor?: string
  gap?: 'sm' | 'md' | 'lg'
  variant?: 'normal' | 'dense' | 'sparse'
}

export interface DotPatternsConfig {
  enablePatterns?: boolean
  top?: DotPatternConfig
  bottom?: DotPatternConfig
}

export interface ContentSectionProps {
  bgClass?: string
  containerClass?: string
  images: ImageInfo[]
  cardInfo: CardInfo
  dotPatternTop?: ReactNode
  dotPatternBottom?: ReactNode
  title: string
  content: DefaultTypedEditorState
  buttonText?: string
  buttonHref?: string
  buttonIcon?: ReactNode
}

export interface IconMap {
  [key: string]: ReactNode
}

// Types pour les variants
export type ContentSectionVariant = 'basicContent' | 'imageGrid'

export interface BaseVariantProps {
  type?: ContentSectionVariant
  bgClass?: string
}

// Types spécifiques pour BasicContent
export interface BasicContentProps extends BaseVariantProps {
  images?: Array<{
    image: any
    alt: string
  }>
  cardInfo?: {
    value: string
    label: string
  }
  title?: string
  content?: any
  button?: {
    text: string
    href: string
    icon?: string
  }
  dotPatterns?: DotPatternsConfig
}

// Types spécifiques pour ImageGrid
export interface ImageGridProps extends BaseVariantProps {
  galleryTitle?: string
  images?: Array<{
    image: any
    alt: string
    caption?: string
  }>
  displayConfig?: {
    columns?: string
    spacing?: string
  }
}