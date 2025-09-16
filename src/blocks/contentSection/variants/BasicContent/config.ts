import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Field } from 'payload'

export const basicContentFields: Field[] = [
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
    type: 'group',
    fields: [
      {
        name: 'value',
        label: 'Valeur',
        type: 'text',
        required: true,
        admin: {
          placeholder: 'ex: + de 5 000',
        },
      },
      {
        name: 'label',
        label: 'Libellé',
        type: 'text',
        required: true,
        admin: {
          placeholder: 'ex: Personnes accompagnées',
        },
      },
    ],
  },

  // Titre principal
  {
    name: 'title',
    label: 'Titre',
    type: 'text',
    required: true,
    admin: {
      placeholder: 'ex: Nos Services Membres',
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
          HeadingFeature({ enabledHeadingSizes: ['h3', 'h4'] }),
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
        dbName: 'btn_icon',
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

  // Configuration simplifiée des motifs de points
  {
    name: 'enableDotPatterns',
    label: 'Activer les motifs de points décoratifs',
    type: 'checkbox',
    defaultValue: false,
  },

  // Classe CSS pour le background
  {
    name: 'bgClass',
    label: 'Classes CSS du background',
    type: 'text',
    admin: {
      description: 'Classes CSS personnalisées pour le background de la section',
      placeholder: 'ex: py-16 bg-gray-50',
    },
    defaultValue: 'py-16',
  },
]