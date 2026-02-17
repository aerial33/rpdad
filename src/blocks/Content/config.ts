import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block, Field } from 'payload'

import { link } from '@/fields/link'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    label: 'Taille de la colonne',
    options: [
      {
        label: '33% (Un tiers)',
        value: 'oneThird',
      },
      {
        label: '50% (Une moitié)',
        value: 'half',
      },
      {
        label: '67% (Deux tiers)',
        value: 'twoThirds',
      },
      {
        label: '100% (Largeur complète)',
        value: 'full',
      },
    ],
  },
  {
    name: 'richText',
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
    label: false,
  },
  {
    name: 'enableMedia',
    type: 'checkbox',
    label: 'Média',
  },
  {
    name: 'mediaPosition',
    type: 'select',
    label: 'Position du média',
    defaultValue: 'above',
    options: [
      { label: 'Au-dessus du texte', value: 'above' },
      { label: 'En-dessous du texte', value: 'below' },
    ],
    admin: {
      condition: (_data, siblingData) => Boolean(siblingData?.enableMedia),
    },
  },
  {
    name: 'mediaType',
    type: 'radio',
    defaultValue: 'media',
    options: [
      { label: 'Media (Upload)', value: 'media' },
      { label: 'Video Embed (YouTube/Vimeo)', value: 'video-embed' },
    ],
    admin: {
      layout: 'horizontal',
      condition: (_data, siblingData) => Boolean(siblingData?.enableMedia),
    },
  },
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    label: 'Média à afficher',
    admin: {
      condition: (_data, siblingData) =>
        Boolean(siblingData?.enableMedia) && siblingData?.mediaType === 'media',
    },
  },
  {
    name: 'videoEmbed',
    type: 'upload',
    relationTo: 'video-embeds',
    label: 'Vidéo embed à afficher',
    admin: {
      condition: (_data, siblingData) =>
        Boolean(siblingData?.enableMedia) && siblingData?.mediaType === 'video-embed',
    },
  },
  {
    name: 'enableLink',
    type: 'checkbox',
    label: 'Lien',
  },
  link({
    overrides: {
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.enableLink)
        },
      },
    },
  }),
]

export const Content: Block = {
  slug: 'content',
  labels: {
    singular: 'Contenu',
    plural: 'Contenus',
  },
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'columns',
      label: 'Colonnes',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
    },
  ],
}
