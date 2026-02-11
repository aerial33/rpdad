import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const MembresMap: Block = {
  slug: 'membresMap',
  interfaceName: 'MembresMapBlock',
  labels: {
    singular: 'Carte des Membres',
    plural: 'Cartes des Membres',
  },
  fields: [
    {
      name: 'introContent',
      label: 'Contenu d\u2019introduction',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
    },
    {
      name: 'bgColor',
      type: 'radio',
      label: 'Couleur de fond de section',
      defaultValue: 'bg-white',
      options: [
        { label: '\u26aa Blanc', value: 'bg-white' },
        { label: '\u26ab Gris', value: 'bg-neutral-100' },
        { label: '\ud83d\udfe0 Orange', value: 'bg-flamingo-lightest' },
        { label: '\ud83d\udfe3 Violet', value: 'bg-primary-lightest' },
      ],
    },
  ],
}
