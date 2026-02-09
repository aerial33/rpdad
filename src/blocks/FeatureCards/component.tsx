import BackgroundSection from '@/components/BackgroundSection/BackgroundSection'
import { FeatureCard } from '@/components/FeaturedCard'
import { FadeUp } from '@/components/motion/animations'
import type { FeatureCardsBlock as FeatureCardsBlockType } from '@/payload-types'

type CardColor = 'chateau' | 'primary' | 'yellow' | 'blue' | 'flamingo'

const colorMap: Record<CardColor, { numberBg: string; border: string }> = {
  chateau: {
    numberBg: 'bg-chateau-lighter text-chateau-dark',
    border: 'border-chateau',
  },
  primary: {
    numberBg: 'bg-primary-lighter text-primary',
    border: 'border-primary',
  },
  yellow: {
    numberBg: 'bg-yellow-lighter text-yellow-base',
    border: 'border-yellow-base',
  },
  blue: {
    numberBg: 'bg-blue-lighter text-blue-dark',
    border: 'border-blue-base',
  },
  flamingo: {
    numberBg: 'bg-flamingo-lighter text-flamingo',
    border: 'border-flamingo',
  },
}

export const FeatureCardsBlock = ({ title, subtitle, bgColor, cards }: FeatureCardsBlockType) => {
  if (!cards || cards.length === 0) return null

  const mid = Math.ceil(cards.length / 2)
  const leftCards = cards.slice(0, mid)
  const rightCards = cards.slice(mid)

  return (
    <section className="relative container mx-auto px-4 py-16 xl:px-0">
      <BackgroundSection className={bgColor || 'bg-white'} />
      <FadeUp delay={0.3} className="mb-16 xl:mb-24">
        {title && (
          <h2 className="mb-4 text-center text-4xl font-bold tracking-tight text-balance">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="text-muted-foreground text-center text-xl text-balance">{subtitle}</p>
        )}
      </FadeUp>
      <FadeUp
        delay={0.4}
        className="mx-[-15px] !mt-[-50px] flex flex-wrap items-center lg:mx-[-20px] xl:mx-[-35px]"
      >
        <div className="!mt-[50px] w-full max-w-full flex-[0_0_auto] !px-[15px] lg:!order-2 lg:w-6/12 lg:!px-[20px] xl:!order-2 xl:w-6/12 xl:!px-[35px]">
          {leftCards.map((card, index) => {
            const colors = colorMap[card.color]
            const number = String(index + 1).padStart(2, '0')
            return (
              <FeatureCard
                key={card.id ?? index}
                number={number}
                title={card.title}
                description={card.description}
                numberBgClass={colors.numberBg}
                className={`${colors.border} max-w-[580px] ${index > 0 ? 'mt-6' : ''} ${index % 2 === 1 ? 'lg:ml-16 xl:ml-16' : 'lg:mr-6 xl:mr-6'}`}
              />
            )
          })}
        </div>

        <div className="!mt-[50px] w-full max-w-full flex-[0_0_auto] !px-[15px] lg:!order-2 lg:w-6/12 lg:!px-[20px] xl:!order-2 xl:w-6/12 xl:!px-[35px]">
          {rightCards.map((card, index) => {
            const colors = colorMap[card.color]
            const number = String(mid + index + 1).padStart(2, '0')
            return (
              <FeatureCard
                key={card.id ?? index}
                number={number}
                title={card.title}
                description={card.description}
                numberBgClass={colors.numberBg}
                className={`${colors.border} max-w-[580px] ${index > 0 ? 'mt-6' : ''} ${index % 2 === 1 ? 'lg:ml-16 xl:ml-16' : 'lg:mr-6 xl:mr-6'}`}
              />
            )
          })}
        </div>
      </FadeUp>
    </section>
  )
}
