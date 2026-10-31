
import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import {
  adminOnly,
  adminOrEditorCreateDraft,
  adminPublishEditorDraftUpdate,
  publishedOrStaff,
} from '../access/accessControl'

export const Posts: CollectionConfig = {
  slug: 'posts',

  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'author', 'publishedAt'],
    group: 'Articles & Client Resources',
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
      name: 'excerpt',
      type: 'textarea',
      required: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'category',
          type: 'select',
          required: true,
          options: [
            { label: 'Legal Updates', value: 'legal-updates' },
            { label: 'Family Law', value: 'family-law' },
            { label: 'Corporate Law', value: 'corporate-law' },
            { label: 'Criminal Law', value: 'criminal-law' },
            { label: 'Property Law', value: 'property-law' },
            {
              label: 'General Legal Advice',
              value: 'general-legal-advice',
            },
          ],
          admin: {
            width: '50%',
          },
        },
        {
          name: 'author',
          type: 'relationship',
          relationTo: 'attorneys',
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    
  ],
}
