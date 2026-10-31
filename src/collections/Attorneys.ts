
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
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'designation',
          type: 'text',
          required: true,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    slugField({
      fieldToUse: 'name',
    }),
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
      type: 'row',
      fields: [
        {
          name: 'email',
          type: 'email',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'sortOrder',
          type: 'number',
          defaultValue: 0,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    
  ],
}
