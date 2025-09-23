import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

export const ContentSectionBlock: Block = {
  slug: 'contentSection',
  interfaceName: 'ContentSectionBlock',
  imageURL: '/img/blocks/content-section-preview.jpeg',
  imageAltText: 'Aperçu du block Section de Contenu',
  labels: {
    singular: 'Section de Contenu',
    plural: 'Sections de Contenu',
  },
  fields: [
    // Images principales
    {
      name: 'images',
      label: 'Images',
      type: 'array',
      minRows: 1,
      maxRows: 2,
      labels: {
        singular: 'Image',
        plural: 'Images',
      },
      fields: [
        {
          name: 'image',
          label: 'Image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'alt',
          label: 'Texte alternatif',
          type: 'text',
          required: true,
        },
      ],
    },

    // Informations de la carte
    {
      name: 'cardInfo',
      label: 'Informations de la carte',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
    },

    // Titre principal
    {
      name: 'badge',
      label: 'Badge',
      type: 'text',
      admin: {
        placeholder: 'ex: Nos Services Membres',
        description: 'Badge principal de la section',
      },
    },

    // Contenu principal en RichText
    {
      name: 'content',
      label: 'Contenu',
      type: 'richText',
      required: true,
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
      admin: {
        description: 'Contenu principal de la section avec formatage riche',
      },
    },
    // Configuration du bouton
    {
      name: 'button',
      label: 'Bouton',
      type: 'group',
      fields: [
        {
          name: 'text',
          label: 'Texte du bouton',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'ex: Retrouvez notre réseau',
          },
        },
        {
          name: 'href',
          label: 'Lien',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'ex: /services-membres',
          },
        },
        {
          name: 'icon',
          label: 'Icône',
          type: 'select',
          options: [
            {
              label: 'Flèche droite',
              value: 'arrow-right',
            },
            {
              label: 'Flèche gauche',
              value: 'arrow-left',
            },
            {
              label: 'Lien externe',
              value: 'external-link',
            },
            {
              label: 'Télécharger',
              value: 'download',
            },
            {
              label: 'Aucune',
              value: 'none',
            },
          ],
          defaultValue: 'arrow-right',
        },
      ],
    },
  ],
}

export default ContentSectionBlock
