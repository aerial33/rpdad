import {
  Award,
  BookOpen,
  Building2,
  Globe,
  Handshake,
  Heart,
  Lightbulb,
  MapPin,
  MessageCircle,
  Phone,
  Shield,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  UsersRound,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import BackgroundSection from '@/components/BackgroundSection/BackgroundSection'
import { FadeUp } from '@/components/motion/animations'
import type { IconCardsBlock as IconCardsBlockType } from '@/payload-types'

const iconMap: Record<string, LucideIcon> = {
  UsersRound,
  Building2,
  MapPin,
  Handshake,
  Heart,
  Shield,
  Star,
  Target,
  Award,
  BookOpen,
  Globe,
  Lightbulb,
  MessageCircle,
  Phone,
  Sparkles,
  TrendingUp,
}

const defaultColor = { bg: 'bg-primary/10', text: 'text-primary' }

const colorMap: Record<string, { bg: string; text: string }> = {
  primary: { bg: 'bg-primary/10', text: 'text-primary' },
  flamingo: { bg: 'bg-flamingo/10', text: 'text-flamingo' },
  chateau: { bg: 'bg-chateau/10', text: 'text-chateau' },
  yellow: { bg: 'bg-yellow-300/10', text: 'text-yellow-300' },
  blue: { bg: 'bg-blue-500/10', text: 'text-blue-500' },
}

export const IconCardsBlock = ({ title, subtitle, bgColor, items }: IconCardsBlockType) => {
  if (!items || items.length === 0) return null

  return (
    <section className="relative py-20 lg:py-32">
      <BackgroundSection className={bgColor || 'bg-white'} />
      <div className="container mx-auto px-4">
        {(title || subtitle) && (
          <FadeUp delay={0.2} className="mb-12 text-center">
            {title && <h2 className="mb-4 text-4xl font-bold tracking-tight">{title}</h2>}
            {subtitle && <p className="text-muted-foreground text-xl text-balance">{subtitle}</p>}
          </FadeUp>
        )}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => {
            const Icon = iconMap[item.icon] ?? UsersRound
            const colors = colorMap[item.iconColor ?? 'primary'] ?? defaultColor

            return (
              <FadeUp key={item.id ?? index} delay={0.2 + index * 0.1}>
                <div className="text-center">
                  <div
                    className={`${colors.bg} mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full`}
                  >
                    <Icon className={`${colors.text} h-8 w-8`} />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              </FadeUp>
            )
          })}
        </div>
      </div>
    </section>
  )
}
