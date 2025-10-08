import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'

import { Banner } from '@/blocks/Banner/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { slugField } from '@/fields/slug'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { revalidateDelete, revalidateMembre } from './hooks/revalidateMembre'

export const Membres: CollectionConfig = {
  slug: 'membres',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },

  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'adresse', 'publishedAt'],
    group: 'Publications',
    hideAPIURL: false,
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'membres',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'membres',
        req,
      }),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nom du membre',
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Informations générales',
          fields: [
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              label: 'Logo',
            },
            {
              name: 'adresse',
              type: 'textarea',
              label: 'Adresse',
            },
            {
              name: 'informations',
              type: 'group',
              label: 'Informations de contact',
              fields: [
                {
                  name: 'contact',
                  type: 'group',
                  label: 'Contact',
                  fields: [
                    {
                      name: 'tel',
                      type: 'text',
                      label: 'Téléphone',
                    },
                    {
                      name: 'mail',
                      type: 'email',
                      label: 'Email',
                    },
                  ],
                },
                {
                  name: 'horaires',
                  type: 'textarea',
                  label: "Horaires d'ouverture",
                  admin: {
                    placeholder:
                      'Lundi, mardi et mercredi : de 9h00 � 13h00 et de 14h00 � 17h00\nVendredi : de 9h00 � 13h00 et de 14h00 � 16h00',
                  },
                },
                {
                  name: 'astreinte',
                  type: 'text',
                  label: 'Astreinte',
                },
                {
                  name: 'website',
                  type: 'text',
                  label: 'Site web',
                  admin: {
                    placeholder: 'https://example.com',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Contenu',
          fields: [
            {
              name: 'content',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
                    BlocksFeature({ blocks: [Banner, MediaBlock] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                  ]
                },
              }),
              label: 'Contenu de la page',
              admin: {
                description: 'Contenu principal qui sera affich� dans le body de la page',
              },
            },
          ],
        },
        {
          label: 'SEO',
          name: 'meta',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaDescriptionField({}),
            MetaImageField({
              relationTo: 'media',
            }),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Date de publication',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidateMembre],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
