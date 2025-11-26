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
    singular: 'Section Texte & Média',
    plural: 'Sections Texte & Média',
  },
  fields: [
    // Sélection du variant
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'basicContent',
      label: 'Type de contenu',
      options: [
        {
          label: 'Contenu de base',
          value: 'basicContent',
        },
        {
          label: 'Contenu avec image',
          value: 'contentWithImage',
        },
        {
          label: 'Contenu avec galerie',
          value: 'contentWithGallery',
        },
        {
          label: 'Contenu avec carte info',
          value: 'contentWithCard',
        },
      ],
      required: true,
      admin: {
        description: 'Choisir le type de présentation du contenu',
      },
    },

    // Image/Vidéo unique pour contentWithImage
    {
      name: 'singleImage',
      label: 'Média',
      type: 'group',
      admin: {
        condition: (_, { variant } = {}) => variant === 'contentWithImage',
      },
      fields: [
        {
          name: 'mediaType',
          type: 'radio',
          admin: {
            layout: 'horizontal',
            description: 'Choisir entre un média uploadé ou une vidéo embed',
          },
          defaultValue: 'media',
          options: [
            { label: 'Media (Upload)', value: 'media' },
            { label: 'Video Embed (YouTube/Vimeo)', value: 'video-embed' },
          ],
        },
        {
          name: 'image',
          label: 'Média à afficher',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            condition: (_, siblingData) => siblingData?.mediaType === 'media',
          },
        },
        {
          name: 'videoEmbed',
          type: 'upload',
          relationTo: 'video-embeds',
          required: true,
          label: 'Vidéo embed à afficher',
          admin: {
            condition: (_, siblingData) => siblingData?.mediaType === 'video-embed',
          },
        },
        {
          name: 'alt',
          label: 'Texte alternatif',
          type: 'text',
          required: true,
          admin: {
            condition: (_, siblingData) => siblingData?.mediaType === 'media',
          },
        },
      ],
    },

    // Médias multiples pour contentWithGallery et contentWithCard
    {
      name: 'multipleImages',
      label: 'Médias',
      type: 'array',
      admin: {
        condition: (_, { variant } = {}) =>
          ['contentWithGallery', 'contentWithCard'].includes(variant),
      },
      minRows: 2,
      maxRows: 3,
      labels: {
        singular: 'Média',
        plural: 'Médias',
      },
      fields: [
        {
          name: 'mediaType',
          type: 'radio',
          admin: {
            layout: 'horizontal',
            description: 'Choisir entre un média uploadé ou une vidéo embed',
          },
          defaultValue: 'media',
          options: [
            { label: 'Media (Upload)', value: 'media' },
            { label: 'Video Embed (YouTube/Vimeo)', value: 'video-embed' },
          ],
        },
        {
          name: 'image',
          label: 'Média à afficher',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            condition: (_, siblingData) => siblingData?.mediaType === 'media',
          },
        },
        {
          name: 'videoEmbed',
          type: 'upload',
          relationTo: 'video-embeds',
          required: true,
          label: 'Vidéo embed à afficher',
          admin: {
            condition: (_, siblingData) => siblingData?.mediaType === 'video-embed',
          },
        },
        {
          name: 'alt',
          label: 'Texte alternatif',
          type: 'text',
          required: true,
          admin: {
            condition: (_, siblingData) => siblingData?.mediaType === 'media',
          },
        },
      ],
    },

    // Informations de la carte (conditionnelles)
    {
      name: 'cardInfo',
      label: 'Informations de la carte',
      type: 'richText',
      admin: {
        condition: (_, { variant } = {}) => variant === 'contentWithCard',
      },
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

    // Fonctionnalités avec icônes
    {
      name: 'features',
      label: 'Fonctionnalités avec icônes',
      type: 'array',
      admin: {
        condition: (_, { variant } = {}) =>
          ['contentWithImage', 'contentWithGallery'].includes(variant),
        description: 'Ajouter des fonctionnalités avec icônes sous le contenu principal',
      },
      minRows: 0,
      maxRows: 6,
      labels: {
        singular: 'Fonctionnalité',
        plural: 'Fonctionnalités',
      },
      fields: [
        {
          name: 'icon',
          label: 'Icône',
          type: 'group',
          fields: [
            {
              name: 'image',
              label: "Image de l'icône",
              type: 'upload',
              relationTo: 'media',
              filterOptions: {
                mimeType: { contains: 'image' },
              },
              required: false,
              admin: {
                description: 'Uploader une icône (SVG recommandé pour la qualité)',
              },
            },
            {
              name: 'alt',
              label: 'Texte alternatif',
              type: 'text',
              required: false,
              admin: {
                description: 'Description accessible de l\'icône (ex: "Icône créativité")',
                placeholder: 'ex: Icône créativité',
              },
            },
          ],
        },
        {
          name: 'title',
          label: 'Titre',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'ex: Creativity',
          },
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          required: true,
          admin: {
            placeholder: 'ex: Curabitur blandit lacus porttitor ridiculus mus.',
            rows: 3,
          },
        },
      ],
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
          required: false,
          admin: {
            placeholder: 'ex: Retrouvez notre réseau',
          },
        },
        {
          name: 'href',
          label: 'Lien',
          type: 'text',
          required: false,
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
    {
      type: 'radio',
      name: 'imagePosition',
      label: 'Position de l\'image',
      options: ['Droite', 'Gauche'],
      defaultValue: 'Droite',
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

export default ContentSectionBlock
