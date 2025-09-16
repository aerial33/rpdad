import type { Field } from 'payload'

export const imageGridFields: Field[] = [
  // Titre pour la galerie (nom différent pour éviter les conflits)
  {
    name: 'galleryTitle',
    label: 'Titre de la galerie',
    type: 'text',
    required: true,
    admin: {
      placeholder: 'ex: Nos réalisations',
    },
  },

  // Galerie d'images (plus de 2 images pour cette variante)
  {
    name: 'images',
    label: 'Images de la galerie',
    type: 'array',
    minRows: 3,
    maxRows: 12,
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
      {
        name: 'caption',
        label: 'Légende (optionnelle)',
        type: 'text',
      },
    ],
  },

  // Configuration d'affichage
  {
    name: 'displayConfig',
    label: 'Configuration d\'affichage',
    type: 'group',
    fields: [
      {
        name: 'columns',
        label: 'Nombre de colonnes',
        type: 'select',
        dbName: 'img_columns',
        options: [
          { label: '2 colonnes', value: '2' },
          { label: '3 colonnes', value: '3' },
          { label: '4 colonnes', value: '4' },
        ],
        defaultValue: '3',
      },
      {
        name: 'spacing',
        label: 'Espacement',
        type: 'select',
        dbName: 'img_spacing',
        options: [
          { label: 'Serré', value: 'tight' },
          { label: 'Normal', value: 'normal' },
          { label: 'Large', value: 'wide' },
        ],
        defaultValue: 'normal',
      },
    ],
  },

  // Classes CSS
  {
    name: 'bgClass',
    label: 'Classes CSS du background',
    type: 'text',
    admin: {
      description: 'Classes CSS personnalisées pour le background de la galerie',
      placeholder: 'ex: py-16 bg-gray-50',
    },
    defaultValue: 'py-16',
  },
]