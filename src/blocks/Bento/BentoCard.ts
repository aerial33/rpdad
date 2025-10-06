// blocks/BentoCard.ts
import type { Block } from 'payload'

import { link } from '@/fields/link'

import { DEFAULT_BENTO_CARDS } from './constants'

export const BentoCard: Block = {
  slug: 'bentoCard',
  interfaceName: 'BentoCardBlock',
  imageURL: '/img/blocks/bento-preview.jpeg',
  imageAltText: 'Bento Cartes',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Titre de la section',
    },
    {
      name: 'sousTitre',
      type: 'text',
      label: 'Sous-titre de la section',
    },
    {
      name: 'bgColor',
      type: 'radio',
      label: 'Couleur de fond de section',
      defaultValue: 'bg-white',
      options: [
        { label: '⚪ Blanc', value: 'bg-white' },
        { label: '⚫ Gris', value: 'bg-neutral-100' },
        { label: '🍑 Peche', value: 'bg-flamingo-lightest' },
        { label: '🟢 Vert', value: 'bg-chateau-lightest' },
      ],
    },
    {
      name: 'cards',
      type: 'array',
      label: 'Cartes Bento',
      // minRows: 4,
      maxRows: 4,
      defaultValue: DEFAULT_BENTO_CARDS,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Titre de la carte',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Description',
        },
        {
          name: 'tag',
          type: 'text',
          label: 'Tag (optionnel)',
        },
        link({
          appearances: ['default', 'outline'],
        }),
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: '📷 Image (optionnel)',
        },
      ],
    },
  ],
}
