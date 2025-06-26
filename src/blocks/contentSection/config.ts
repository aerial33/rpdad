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

    // Configuration des motifs de points (Dot Patterns)
    {
      name: 'dotPatterns',
      label: 'Motifs de points',
      type: 'group',
      fields: [
        // Contrôle global pour activer/désactiver les motifs
        {
          name: 'enablePatterns',
          label: 'Activer les motifs de points',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Cochez pour configurer les motifs de points décoratifs',
          },
        },

        // Motif du haut
        {
          name: 'top',
          label: 'Motif du haut',
          type: 'group',
          admin: {
            condition: (data, siblingData) => siblingData?.enablePatterns,
            style: {
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              padding: '16px',
              marginTop: '12px',
            },
          },
          fields: [
            {
              name: 'enabled',
              label: 'Activer le motif du haut',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'className',
              label: 'Classes CSS',
              type: 'text',
              admin: {
                condition: (data, siblingData) => siblingData?.enabled,
                placeholder: 'ex: absolute -top-10 left-5 hidden lg:flex',
              },
            },
            {
              name: 'rows',
              label: 'Nombre de lignes',
              type: 'number',
              defaultValue: 11,
              admin: {
                condition: (data, siblingData) => siblingData?.enabled,
              },
            },
            {
              name: 'cols',
              label: 'Nombre de colonnes',
              type: 'number',
              defaultValue: 11,
              admin: {
                condition: (data, siblingData) => siblingData?.enabled,
              },
            },
            {
              name: 'dotSize',
              label: 'Taille des points',
              type: 'select',
              options: [
                { label: 'Petit', value: 'sm' },
                { label: 'Moyen', value: 'md' },
                { label: 'Grand', value: 'lg' },
              ],
              defaultValue: 'md',
              admin: {
                condition: (data, siblingData) => siblingData?.enabled,
              },
            },
            {
              name: 'dotColor',
              label: 'Couleur des points',
              type: 'select',
              options: [
                { label: 'Flamingo', value: 'bg-flamingo' },
                { label: 'Primary Dark', value: 'bg-primary-dark' },
                { label: 'Primary', value: 'bg-primary' },
                { label: 'Secondary', value: 'bg-secondary' },
              ],
              defaultValue: 'bg-flamingo',
              admin: {
                condition: (data, siblingData) => siblingData?.enabled,
              },
            },
            {
              name: 'gap',
              label: 'Espacement',
              type: 'select',
              options: [
                { label: 'Petit', value: 'sm' },
                { label: 'Moyen', value: 'md' },
                { label: 'Grand', value: 'lg' },
              ],
              defaultValue: 'md',
              admin: {
                condition: (data, siblingData) => siblingData?.enabled,
              },
            },
          ],
        },

        // Motif du bas
        {
          name: 'bottom',
          label: 'Motif du bas',
          type: 'group',
          admin: {
            condition: (data, siblingData) => siblingData?.enablePatterns,
            style: {
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              padding: '16px',
              marginTop: '12px',
            },
          },
          fields: [
            {
              name: 'enabled',
              label: 'Activer le motif du bas',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'className',
              label: 'Classes CSS',
              type: 'text',
              admin: {
                condition: (data, siblingData) => siblingData?.enabled,
                placeholder: 'ex: absolute -bottom-30 left-70 hidden lg:flex',
              },
            },
            {
              name: 'variant',
              label: 'Variante',
              type: 'select',
              dbName: 'bot_variant',
              options: [
                { label: 'Normal', value: 'normal' },
                { label: 'Dense', value: 'dense' },
                { label: 'Sparse', value: 'sparse' },
              ],
              defaultValue: 'normal',
              admin: {
                condition: (data, siblingData) => siblingData?.enabled,
              },
            },
            {
              name: 'rows',
              label: 'Nombre de lignes',
              type: 'number',
              defaultValue: 9,
              admin: {
                condition: (data, siblingData) => siblingData?.enabled,
              },
            },
            {
              name: 'cols',
              label: 'Nombre de colonnes',
              type: 'number',
              defaultValue: 9,
              admin: {
                condition: (data, siblingData) => siblingData?.enabled,
              },
            },
            {
              name: 'dotSize',
              label: 'Taille des points',
              type: 'select',
              dbName: 'bot_dot_size',
              options: [
                { label: 'Petit', value: 'sm' },
                { label: 'Moyen', value: 'md' },
                { label: 'Grand', value: 'lg' },
              ],
              defaultValue: 'sm',
              admin: {
                condition: (data, siblingData) => siblingData?.enabled,
              },
            },
            {
              name: 'dotColor',
              label: 'Couleur des points',
              type: 'select',
              dbName: 'bot_dot_color',
              options: [
                { label: 'Flamingo', value: 'bg-flamingo' },
                { label: 'Primary Dark', value: 'bg-primary-dark' },
                { label: 'Primary', value: 'bg-primary' },
                { label: 'Secondary', value: 'bg-secondary' },
              ],
              defaultValue: 'bg-primary-dark',
              admin: {
                condition: (data, siblingData) => siblingData?.enabled,
              },
            },
          ],
        },
      ],
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
  ],
}

export default ContentSectionBlock
