import {
  ClockIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  MapPinIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline'

import type { Membre } from '@/payload-types'

import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs'
import { CMSLink } from '../Link'
import { Media } from '../Media'
import RichText from '../RichText'
import type { SocialProfileType } from '../SocialsList/SocialsList'
import SocialsList, { SOCIAL_PROFILES_DATA } from '../SocialsList/SocialsList'
import { Badge } from '../ui/badge'

export const MembresContent = (membre: Membre) => {
  const socials = SOCIAL_PROFILES_DATA.filter((social) => {
    const key = social.id.toLowerCase() as 'facebook' | 'twitter' | 'linkedin' | 'instagram'
    return membre.socials?.[key]
  }).map((social) => {
    const key = social.id.toLowerCase() as 'facebook' | 'twitter' | 'linkedin' | 'instagram'
    const href = membre.socials![key]!
    return {
      ...social,
      href: href.startsWith('http') ? href : `https://${href}`,
    } satisfies SocialProfileType
  })

  return (
    <>
      <div className="w-full">
        <div className="from-primary-light to-primary-dark via-primary relative h-52 w-full bg-linear-to-br"></div>
        <div className="container -mt-20 lg:-mt-16">
          <div className="relative mb-16 flex flex-col rounded-3xl bg-white p-5 shadow-xl md:flex-row md:rounded-[40px] lg:mb-8 lg:p-8">
            <div className="mr-4 shrink-0 self-center sm:mt-0 md:self-start lg:w-40">
              <div className="wil-avatar relative z-0 inline-flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white text-xl font-semibold uppercase shadow-2xl ring-4 ring-white lg:h-36 lg:w-36 lg:text-2xl">
                {membre.logo && typeof membre.logo === 'object' ? (
                  <Media
                    resource={membre.logo}
                    alt={`Logo ${membre.name}`}
                    fill
                    imgClassName="object-contain p-2"
                    variant="thumbnail"
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center bg-zinc-100 text-zinc-500">
                    {membre.name
                      .split(' ')
                      .slice(0, 2)
                      .map((w) => w[0])
                      .join('')
                      .toUpperCase()}
                  </span>
                )}
              </div>
            </div>

            {/*  */}
            <div className="grow items-center pt-5 md:pt-1 lg:ml-6 xl:ml-12">
              <div className="flex h-full w-full flex-col">
                <h2 className="mb-8 w-full grow items-center text-center text-2xl font-medium text-gray-600 sm:text-4xl md:text-left">
                  {'Service Autonomie à Domicile: '}{' '}
                  <span className="font-bold">{membre.name}</span>
                </h2>
                <div className="flex items-center justify-between">
                  {membre.informations?.website && (
                    <CMSLink
                      type="custom"
                      url={
                        membre.informations.website.startsWith('http')
                          ? membre.informations.website
                          : `https://${membre.informations.website}`
                      }
                      newTab
                      className="flex cursor-pointer items-center space-x-2.5 truncate border-red-500 text-xs font-medium text-neutral-500 rtl:space-x-reverse"
                    >
                      <GlobeAltIcon className="h-4 w-4 shrink-0" />
                      <span className="truncate text-neutral-700">
                        {membre.informations.website}
                      </span>
                    </CMSLink>
                  )}
                  {socials.length > 0 && (
                    <SocialsList itemClass="block w-7 h-7" socials={socials} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section>
        <div className="container mx-auto flex flex-col items-center pt-4 pb-8 md:pt-8 md:pb-10 lg:flex-row lg:justify-between lg:pb-16 xl:px-0">
          {membre.content && (
            <div className="md:border-foret px-4 md:px-0">
              <Badge className="border-muted-foreground mb-8" variant="outline">
                <Breadcrumbs
                  breadcrumbs={[
                    { name: 'Accueil', link: '/' },
                    { name: 'Membres', link: '/membres' },
                    { name: membre.name },
                  ]}
                />
              </Badge>
              <RichText
                className="prose prose-sm md:prose-lg richtext-content md:border-chateau-light mx-auto max-w-4xl md:border-l-3 md:pl-4 lg:pl-8"
                data={membre.content}
                enableGutter={false}
              />
            </div>
          )}
          <aside className="top-20 mb-8 w-full self-start pt-8 lg:sticky lg:ml-8 lg:max-w-[24rem] lg:shrink-0 2xl:w-full">
            <div className="flex flex-col rounded-3xl bg-zinc-100 py-8 shadow-lg md:rounded-[40px]">
              {/* Logo and Name */}
              <div className="mb-6 flex flex-col items-center px-6">
                {membre.logo && typeof membre.logo === 'object' ? (
                  <div className="relative mb-4 h-20 w-20 overflow-hidden rounded-2xl bg-white shadow-xl ring-2 ring-white">
                    <Media
                      resource={membre.logo}
                      alt={`Logo ${membre.name}`}
                      fill
                      imgClassName="object-contain p-2"
                      variant="thumbnail"
                    />
                  </div>
                ) : (
                  <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-zinc-200 text-xl font-semibold text-zinc-500 uppercase shadow-xl">
                    {membre.name
                      .split(' ')
                      .slice(0, 2)
                      .map((w) => w[0])
                      .join('')
                      .toUpperCase()}
                  </div>
                )}
                <h3 className="theme-dark:text-zinc-100 text-center text-xl leading-tight font-bold">
                  {membre.name}
                </h3>
              </div>

              {/* Divider */}
              {membre.informations?.astreinte && (
                <div className="theme-dark:border-zinc-700 mb-6 border-t border-zinc-300" />
              )}
              {membre.adresse && (
                <div className="mb-6 px-6">
                  <div className="mb-2 flex items-center gap-2">
                    <MapPinIcon className="theme-dark:text-zinc-400 h-5 w-5 text-zinc-500" />
                    <div className="theme-dark:text-zinc-200 text-sm font-semibold text-zinc-800">
                      Adresse
                    </div>
                  </div>
                  <div className="theme-dark:text-zinc-400 ml-7 text-sm leading-relaxed text-zinc-600">
                    {membre.adresse}
                  </div>
                </div>
              )}

              {(membre.informations?.contact?.tel || membre.informations?.contact?.mail) && (
                <div className="mb-6 px-6">
                  <div className="mb-3 flex items-center gap-2">
                    <PhoneIcon className="theme-dark:text-zinc-400 h-5 w-5 text-zinc-500" />
                    <div className="theme-dark:text-zinc-200 text-sm font-semibold text-zinc-800">
                      Contact
                    </div>
                  </div>
                  <div className="theme-dark:text-zinc-400 ml-7 space-y-2 text-sm text-zinc-600">
                    {membre.informations.contact.tel && (
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Tél:</span>
                        <a
                          href={`tel:${membre.informations.contact.tel}`}
                          className="theme-dark:hover:text-zinc-200 hover:text-zinc-900"
                        >
                          {membre.informations.contact.tel}
                        </a>
                      </div>
                    )}
                    {membre.informations.contact.mail && (
                      <div className="flex items-center gap-2">
                        <EnvelopeIcon className="h-4 w-4 shrink-0" />
                        <a
                          href={`mailto:${membre.informations.contact.mail}`}
                          className="theme-dark:hover:text-zinc-200 truncate hover:text-zinc-900"
                        >
                          {membre.informations.contact.mail}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Divider */}
              {membre.informations?.astreinte && (
                <div className="theme-dark:border-zinc-700 mb-6 border-t border-zinc-300" />
              )}

              {membre.informations?.horaires && (
                <div className="mb-6 px-6">
                  <div className="mb-2 flex items-center gap-2">
                    <ClockIcon className="theme-dark:text-zinc-400 h-5 w-5 text-zinc-500" />
                    <div className="theme-dark:text-zinc-200 text-sm font-semibold text-zinc-800">
                      Horaire d&apos;accueil
                    </div>
                  </div>
                  <div className="theme-dark:text-zinc-400 ml-7 text-sm leading-relaxed text-zinc-600">
                    {membre.informations.horaires}
                  </div>
                </div>
              )}
              {membre.informations?.astreinte && (
                <div className="mb-6 px-6">
                  <div className="theme-dark:text-zinc-400 rounded-lg bg-white/50 p-3 text-sm leading-relaxed text-zinc-700">
                    {membre.informations.astreinte}
                  </div>
                </div>
              )}

              {membre.informations?.website && (
                <div className="px-6">
                  <div className="mb-2 flex items-center gap-2">
                    <GlobeAltIcon className="theme-dark:text-zinc-400 h-5 w-5 text-zinc-500" />
                    <div className="theme-dark:text-zinc-200 text-sm font-semibold text-zinc-800">
                      Site Internet
                    </div>
                  </div>
                  <div className="theme-dark:text-zinc-400 ml-7 text-sm text-zinc-600">
                    <CMSLink
                      type="custom"
                      url={
                        membre.informations.website.startsWith('http')
                          ? membre.informations.website
                          : `https://${membre.informations.website}`
                      }
                      newTab
                      className="theme-dark:hover:text-zinc-200 break-all underline hover:text-zinc-900"
                    >
                      {membre.informations.website}
                    </CMSLink>
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}

export default MembresContent
