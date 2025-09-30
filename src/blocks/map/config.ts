import { Block } from 'payload'

export const map: Block = {
  slug: 'map',
  interfaceName: 'MapBlock',
  imageURL: '/img/blocks/map-interactive.jpeg',
  imageAltText: 'Map',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'description',
      type: 'text',
    },
  ],
}
