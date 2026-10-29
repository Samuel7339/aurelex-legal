import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import {
  adminOnly,
  adminOrEditorCreateDraft,
  adminPublishEditorDraftUpdate,
  publishedOrStaff,
} from '../access/accessControl'

export const PracticeAreas: CollectionConfig = {
  slug: 'practice-areas',

  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    group: 'People & Legal Services',
  },

  access: {
    read: publishedOrStaff,
    create: adminOrEditorCreateDraft,
    update: adminPublishEditorDraftUpdate,
    delete: adminOnly,
  },

  versions: {
    drafts: true,
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField({
      fieldToUse: 'title',
    }),
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'services',
      type: 'array',
      label: 'Services',
      fields: [
        {
          name: 'service',
          type: 'text',
          required: true,
        },
      ],
    },
    
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
    },

    {
      name: 'seo',
      type: 'group',
      label: 'SEO Settings',
      fields: [
        {
          name: 'title',
          type: 'text',
          admin: {
            description: 'Optional SEO title for search engines.',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            description: 'Optional SEO description for search engines.',
          },
        },
        {
          name: 'socialImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Optional image for social media sharing.',
          },
        },
      ],
    },

  ],
}
