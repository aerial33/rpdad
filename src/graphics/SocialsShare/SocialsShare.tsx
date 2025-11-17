'use client'

import { toast } from 'sonner'

import { FC } from 'react'

export interface SocialsShareProps {
  className?: string
  itemClass?: string
  url: string
  title: string
  description?: string
}

export interface SocialType {
  id: string
  name: string
  icon: string
  getUrl: (url: string, title: string, description?: string) => string
}

const socials: SocialType[] = [
  {
    id: 'Facebook',
    name: 'Facebook',
    icon: `<svg class="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_17_61)">
  <path d="M48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 35.9789 8.77641 45.908 20.25 47.7084V30.9375H14.1562V24H20.25V18.7125C20.25 12.6975 23.8331 9.375 29.3152 9.375C31.9402 9.375 34.6875 9.84375 34.6875 9.84375V15.75H31.6613C28.68 15.75 27.75 17.6002 27.75 19.5V24H34.4062L33.3422 30.9375H27.75V47.7084C39.2236 45.908 48 35.9789 48 24Z" fill="currentColor"/>
  </g>
  </svg>
  `,
    getUrl: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    id: 'Twitter',
    name: 'Twitter',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 48 48">
<path d="M 6.9199219 6 L 21.136719 26.726562 L 6.2285156 44 L 9.40625 44 L 22.544922 28.777344 L 32.986328 44 L 43 44 L 28.123047 22.3125 L 42.203125 6 L 39.027344 6 L 26.716797 20.261719 L 16.933594 6 L 6.9199219 6 z"></path>
</svg>
  `,
    getUrl: (url, title) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    id: 'Linkedin',
    name: 'Linkedin',
    icon: `<svg class="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_17_68)">
  <path d="M44.4469 0H3.54375C1.58437 0 0 1.54688 0 3.45938V44.5312C0 46.4437 1.58437 48 3.54375 48H44.4469C46.4062 48 48 46.4438 48 44.5406V3.45938C48 1.54688 46.4062 0 44.4469 0ZM14.2406 40.9031H7.11563V17.9906H14.2406V40.9031ZM10.6781 14.8688C8.39062 14.8688 6.54375 13.0219 6.54375 10.7437C6.54375 8.46562 8.39062 6.61875 10.6781 6.61875C12.9563 6.61875 14.8031 8.46562 14.8031 10.7437C14.8031 13.0125 12.9563 14.8688 10.6781 14.8688ZM40.9031 40.9031H33.7875V29.7656C33.7875 27.1125 33.7406 23.6906 30.0844 23.6906C26.3812 23.6906 25.8187 26.5875 25.8187 29.5781V40.9031H18.7125V17.9906H25.5375V21.1219H25.6312C26.5781 19.3219 28.9031 17.4188 32.3625 17.4188C39.5719 17.4188 40.9031 22.1625 40.9031 28.3313V40.9031Z" fill="currentColor"/>
  </g>
  </svg>
  `,
    getUrl: (url) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    id: 'CopyLink',
    name: 'Copy Link',
    icon: `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 13C10.4295 13.5741 10.9774 14.0492 11.6066 14.3929C12.2357 14.7367 12.9315 14.9411 13.6467 14.9923C14.3618 15.0435 15.0796 14.9403 15.7513 14.6897C16.4231 14.4392 17.0331 14.047 17.54 13.54L20.54 10.54C21.4508 9.59703 21.9548 8.33695 21.9434 7.03404C21.932 5.73113 21.4061 4.47968 20.4791 3.55265C19.5521 2.62561 18.3006 2.09977 16.9977 2.08839C15.6948 2.077 14.4347 2.58099 13.4918 3.49177L11.6618 5.31177" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M14 11C13.5705 10.4259 13.0226 9.95083 12.3934 9.60707C11.7642 9.26331 11.0685 9.05889 10.3533 9.00768C9.63819 8.95646 8.92037 9.05967 8.24861 9.31023C7.57685 9.56079 6.96684 9.95303 6.45996 10.46L3.45996 13.46C2.54917 14.403 2.04519 15.663 2.05657 16.9659C2.06795 18.2689 2.59379 19.5203 3.52082 20.4473C4.44786 21.3744 5.69931 21.9002 7.00222 21.9116C8.30513 21.9229 9.56521 21.419 10.5082 20.5082L12.3282 18.6882" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `,
    getUrl: (url) => url,
  },
]

export const SOCIALS_DATA = socials

const SocialsShare: FC<SocialsShareProps> = ({
  className = 'grid gap-[6px]',
  itemClass = 'w-7 h-7 text-base hover:bg-neutral-100',
  url,
  title,
  description,
}) => {
  const handleShare = async (e: React.MouseEvent<HTMLAnchorElement>, social: SocialType) => {
    e.preventDefault()
    const shareUrl = social.getUrl(url, title, description)

    // Copy Link copie dans presse-papiers
    if (social.id === 'CopyLink') {
      try {
        await navigator.clipboard.writeText(url)
        toast.success('Lien copié !', {
          description: 'Le lien a été copié dans le presse-papiers',
          className: 'border-green-500',
        })
      } catch (err) {
        console.error('Erreur lors de la copie:', err)
        toast.error('Erreur', {
          description: 'Impossible de copier le lien',
        })
      }
    } else {
      // Autres réseaux sociaux ouvrent popup
      const width = 550
      const height = 450
      const left = (window.screen.width - width) / 2
      const top = (window.screen.height - height) / 2
      window.open(
        shareUrl,
        'share',
        `width=${width},height=${height},left=${left},top=${top},toolbar=0,menubar=0,location=0`,
      )
    }
  }

  const renderItem = (item: SocialType, index: number) => {
    const titleText = item.id === 'CopyLink' ? 'Copier le lien' : `Partager sur ${item.name}`
    return (
      <a
        key={index}
        href={item.getUrl(url, title, description)}
        onClick={(e) => handleShare(e, item)}
        className={`flex items-center justify-center rounded-full leading-none text-neutral-600 ${itemClass}`}
        title={titleText}
      >
        <div dangerouslySetInnerHTML={{ __html: item.icon }}></div>
      </a>
    )
  }

  return (
    <div className={`nc-SocialsShare ${className}`} data-nc-id="SocialsShare">
      {socials.map(renderItem)}
    </div>
  )
}

export default SocialsShare
