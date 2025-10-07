import type { Block } from 'payload'

export const FeatureCollection: Block = {
  slug: 'featureCollection',
  interfaceName: 'FeatureCollectionBlock',
  imageURL: '/img/blocks/feature-collection.jpeg',
  imageAltText: 'Feature Collection',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Titre',
      defaultValue: 'Nos dernières actualités',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Sous-titre',
      defaultValue: 'Découvrez les dernières nouvelles et mises à jour',
    },
    {
      name: 'badgeText',
      type: 'text',
      label: 'Texte du badge',
      defaultValue: 'Actualités',
    },
    {
      name: 'buttonText',
      type: 'text',
      label: 'Texte du bouton',
      defaultValue: 'Voir tout',
    },
    {
      name: 'buttonLink',
      type: 'text',
      label: 'Lien du bouton',
      defaultValue: '/posts',
    },

    {
      name: 'populateBy',
      type: 'select',
      defaultValue: 'collection',
      label: 'Selection par',
      options: [
        {
          label: 'Collection',
          value: 'collection',
        },
        {
          label: 'Selection individuelle',
          value: 'selection',
        },
      ],
    },
    {
      name: 'relationTo',
      type: 'select',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
      defaultValue: 'posts',
      label: 'Collections à afficher',
      options: [
        {
          label: 'Posts',
          value: 'posts',
        },
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
      hasMany: true,
      label: 'Categories à afficher',
      relationTo: 'categories',
    },
    {
      name: 'limit',
      type: 'number',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
        step: 1,
      },
      defaultValue: 10,
      label: 'Limite',
    },
    {
      name: 'selectedDocs',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'selection',
      },
      hasMany: true,
      label: 'Selection',
      relationTo: ['posts'],
    },
  ],
  labels: {
    plural: 'Feature Collections',
    singular: 'Feature Collection',
  },
}
