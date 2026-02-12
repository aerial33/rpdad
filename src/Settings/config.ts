import type { GlobalConfig } from 'payload'

import { revalidateSettings } from './hooks/revalidateSettings'

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Réglages',
  admin: {
    group: 'Configuration',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'emploiHeroColor',
      type: 'select',
      label: '🎨 Couleur du hero Emplois',
      defaultValue: 'primary',
      admin: {
        description: 'Couleur de fond par défaut pour le hero des offres d\'emploi',
      },
      options: [
        { label: '🟣 Violet', value: 'primary' },
        { label: '🟠 Orange', value: 'flamingo' },
        { label: '🟢 Vert', value: 'chateau' },
        { label: '🟡 Jaune', value: 'yellow' },
        { label: '🔵 Bleu', value: 'blue' },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateSettings],
  },
}
