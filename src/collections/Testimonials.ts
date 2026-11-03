
import type { CollectionConfig } from 'payload'

import {
  adminOnly,
  adminOrEditorCreateDraft,
  adminPublishEditorDraftUpdate,
  publishedOrStaff,
} from '../access/accessControl'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',

  admin: {
    useAsTitle: 'clientName',
    defaultColumns: ['clientName', 'updatedAt'],
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
      type: 'row',
      fields: [
        {
          name: 'clientName',
          type: 'text',
          required: true,
          admin: {
            width: '40%',
          },
        },
        {
          name: 'role',
          type: 'text',
          admin: {
            width: '35%',
          },
        },
        {
          name: 'rating',
          type: 'number',
          min: 1,
          max: 5,
          admin: {
            width: '25%',
          },
        },
      ],
    },
    {
      name: 'testimonial',
      type: 'textarea',
      required: true,
    },
  ],
}
