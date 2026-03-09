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
    {
      name: 'bgColor',
      type: 'select',
      label: '🎨 Couleur de fond',
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
  graphQL: {
    singularName: 'FormBlock',
  },
  labels: {
    singular: 'Formulaire contact',
    plural: 'Formulaires',
  },
}
