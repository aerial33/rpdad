import type { Block } from 'payload'

export const Testimonials: Block = {
  slug: 'testimonials',
  labels: {
    singular: 'Témoignage',
    plural: 'Témoignages',
  },
  interfaceName: 'TestimonialsBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Titre',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Sous-titre',
    },
    {
      name: 'testimonials',
      type: 'array',
      label: 'Témoignages',
      minRows: 1,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          label: 'Citation',
          required: true,
        },
        {
          name: 'author',
          type: 'text',
          label: 'Auteur',
          required: true,
        },
        {
          name: 'role',
          type: 'text',
          label: 'Fonction',
        },
        {
          name: 'age',
          type: 'number',
          label: 'Âge',
        },
        {
          name: 'avatar',
          type: 'upload',
          label: 'Photo',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'bgColor',
      type: 'radio',
      label: 'Couleur de fond de section',
      defaultValue: 'bg-white',
      options: [
        { label: '⚪ Blanc', value: 'bg-white' },
        { label: '⚫ Gris', value: 'bg-neutral-100' },
        { label: '🟠 Orange', value: 'bg-flamingo-lightest' },
        { label: '🔵 Bleu', value: 'bg-blue-lightest' },
        { label: '🟢 Vert', value: 'bg-chateau-lightest' },
        { label: '🟣 Violet', value: 'bg-primary-lightest' },
      ],
    },
  ],
}
