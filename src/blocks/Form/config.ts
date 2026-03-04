import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  LinkFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

export const FormBlock: Block = {
  slug: 'formBlock',
  interfaceName: 'FormBlock',
  imageURL: '/img/blocks/contact-form.png',

  fields: [
    {
      name: 'form',
      label: 'Formulaire',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
    {
      name: 'enableIntro',
      type: 'checkbox',
      label: "Activer le contenu d'introduction",
    },
    {
      name: 'introContent',
      type: 'richText',
      admin: {
        condition: (_, { enableIntro }) => Boolean(enableIntro),
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Intro Content',
    },
    {
      name: 'gdprContent',
      type: 'richText',
      label: 'Texte protection des données (RGPD)',
      admin: {
        description: 'Affiché en bas du formulaire dans un collapse "Protection de vos données".',
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          LinkFeature({}),
        ],
      }),
    },
  ],
  graphQL: {
    singularName: 'FormBlock',
  },
  labels: {
    singular: 'Formulaire contact',
    plural: 'Formulaires',
  },
}
