import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import {
  adminOnly,
  adminOrEditorCreateDraft,
  adminPublishEditorDraftUpdate,
  publishedOrStaff,
} from '../access/accessControl'

export const Attorneys: CollectionConfig = {
  slug: 'attorneys',

  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'designation', 'updatedAt'],
    group: 'Website Content',
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
      name: 'name',
      type: 'text',
      required: true,
    },
    slugField({
      fieldToUse: 'name',
    }),
    {
      name: 'designation',
      type: 'text',
      required: true,
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      label: 'Short Description',
      admin: {
        description:
          'A brief introduction displayed on the Our Attorneys page.',
      },
    },
    {
      name: 'bio',
      type: 'richText',
    },
    {
      name: 'featuredOnHome',
      type: 'checkbox',
      label: 'Featured on Homepage',
      defaultValue: false,
    },
    {
      name: 'practiceAreas',
      type: 'relationship',
      relationTo: 'practice-areas',
      hasMany: true,
    },
    {
      name: 'email',
      type: 'email',
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
        description: 'Optional SEO title for this attorney profile.',
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
