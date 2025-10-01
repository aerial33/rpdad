import { HeroSearch } from '@/components/HeroSearch'
import { LogoTicker } from '@/components/LogoTicker'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { FadeLeft, FadeUp } from '@/components/motion/animations'
import { Badge } from '@/components/ui/badge'
import { Page } from '@/payload-types'
import { cn } from '@/utilities/ui'

export const HeroPrimary: React.FC<Page['hero']> = ({
  richText,
  links,
  badge,
  images,
  showSearch,
}) => {
  return (
    <section className="-z-10 mt-4">
      <div className="container mx-auto px-4 lg:px-0">
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-8">
          <FadeLeft delay={0.3} className="mt-8">
            <div className="flex flex-col gap-6">
              {badge && (
                <Badge variant="outline" className="text-muted-foreground border-muted-foreground">
                  {badge}
                </Badge>
              )}
              <div className="prose prose-xl richtext-content">
                {richText && (
                  <RichText
                    data={richText}
                    enableGutter={false}
                    className="[&_h1]:text-gray-700 [&_p]:text-xl [&_p]:text-gray-500"
                  />
                )}
              </div>

              {/* <div className="mt-2 flex flex-wrap gap-4">
                {Array.isArray(links) && links.length > 0 && (
                  <ul className="flex gap-4">
                    {links.map(({ link }, i) => {
                      return (
                        <li key={i}>
                          <CMSLink {...link} />
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div> */}
              {showSearch && <HeroSearch />}
              <LogoTicker />
            </div>
          </FadeLeft>
          <FadeUp delay={0.5}>
            <div className="relative grid grid-cols-2 gap-6">
              {images && images.length > 0 ? (
                images.map((item, index) => (
                  <div
                    key={index}
                    className={cn(
                      'flex aspect-square items-center justify-center overflow-hidden rounded-full transition-transform',
                      (index === 0 || index === images.length - 1) && 'scale-75',
                    )}
                  >
                    {item.image ? (
                      <Media
                        resource={item.image}
                        className="h-full w-full object-cover"
                        imgClassName="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-gray-200" />
                    )}
                  </div>
                ))
              ) : (
                // Template par défaut avec 4 placeholders gris
                <>
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={cn(
                        'flex aspect-square items-center justify-center overflow-hidden rounded-full transition-transform',
                        (i === 1 || i === 4) && 'scale-75',
                      )}
                    >
                      <div className="h-full w-full bg-gray-200" />
                    </div>
                  ))}
                </>
              )}
            </div>
          </FadeUp>
        </div>
      </div>
      <div className="bg-flamingo-lighter lg:from-primary lg:to-primary-dark absolute inset-0 top-[-188px] -bottom-4 -z-1 rounded-bl-[300px] shadow-2xl lg:left-[60%] lg:bg-gradient-to-br"></div>
    </section>
  )
}
