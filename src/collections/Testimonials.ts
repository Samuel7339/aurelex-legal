import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

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
      name: 'clientName',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
    },
    {
      name: 'testimonial',
      type: 'textarea',
      required: true,
    },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
    },
  ],
}
