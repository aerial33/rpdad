import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const ContentWithImage: Block = {
  slug: 'contentWithImage',
  interfaceName: 'ContentWithImage',
  imageURL: '/img/blocks/image-with-content-preview.jpeg',
  imageAltText: 'Contenu avec image',
  labels: {
    singular: 'Contenu avec image',
    plural: 'Contenus avec image',
  },
  fields: [
    {
      name: 'content',
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
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      type: 'radio',
      name: 'imagePosition',
      options: ['Droite', 'Gauche'],
      defaultValue: 'Droite',
    },
  ],
}
