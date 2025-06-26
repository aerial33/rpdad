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
