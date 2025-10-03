import { HeroSearch } from '@/components/HeroSearch'
import { CMSLink } from '@/components/Link'
import { LogoTicker } from '@/components/LogoTicker'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { ExpandFromCenter, FadeUp } from '@/components/motion/animations'
import { Badge } from '@/components/ui/badge'
import { Page } from '@/payload-types'
import { cn } from '@/utilities/ui'

export const HeroPrimary: React.FC<Page['hero']> = ({
  richText,
  links,
  badge,
  images,
  actionType,
}) => {
  return (
    <section className="-z-10 mt-4 min-h-screen lg:min-h-0">
      <div className="container mx-auto px-4 xl:px-0">
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-8">
          <FadeUp delay={0.3} className="mt-8">
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
                    className="text-gray-200 [&_h1]:text-gray-100 [&_h1]:lg:text-gray-700 [&_p]:text-xl [&_p]:lg:text-gray-500"
                  />
                )}
              </div>

              {actionType === 'links' && links && (
                <div className="mt-2 flex flex-wrap gap-4">
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
                </div>
              )}
              {actionType === 'search' && <HeroSearch />}
              <LogoTicker className="lg:text-muted-foreground rounded-xl bg-white/20 p-3 text-white backdrop-blur-sm" />
            </div>
          </FadeUp>

          {/* Mobile: afficher seulement la première image avec forme arrondie */}
          <div className="absolute inset-0 -z-1 h-screen overflow-hidden shadow-2xl sm:rounded-bl-[300px] lg:hidden">
            {images?.[0]?.image && (
              <Media
                resource={images[0].image}
                imgClassName="h-full w-full object-cover brightness-60 object-left"
                priority={true}
                quality={90}
                size="100vw"
              />
            )}
          </div>

          {/* Desktop: grille complète */}
          <div className="hidden self-start lg:block">
            <div className="relative grid grid-cols-2 gap-6">
              {images && images.length > 0 ? (
                images.map((item, index) => (
                  <ExpandFromCenter
                    delay={0.45 + index * 0.1}
                    duration={0.5}
                    key={index}
                    className={cn(
                      'flex aspect-square items-center justify-center overflow-hidden rounded-full transition-transform',
                      (index === 0 || index === images.length - 1) && 'scale-75',
                    )}
                  >
                    {item.image ? (
                      <Media
                        resource={item.image}
                        imgClassName="h-full w-full object-cover"
                        loading="lazy"
                        quality={75}
                        size="(max-width: 1024px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="h-full w-full bg-gray-200" />
                    )}
                  </ExpandFromCenter>
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
          </div>
        </div>
      </div>
      <div className="lg:from-primary lg:to-primary-dark absolute inset-0 top-[-188px] -bottom-4 -z-1 rounded-bl-[300px] shadow lg:visible lg:left-[60%] lg:bg-gradient-to-br"></div>
    </section>
  )
}
