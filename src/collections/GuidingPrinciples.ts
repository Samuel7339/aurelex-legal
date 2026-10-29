
import type { CollectionConfig } from 'payload'

import {
  adminOnly,
  adminOrEditorCreateDraft,
  adminPublishEditorDraftUpdate,
  publishedOrStaff,
} from '../access/accessControl'

export const GuidingPrinciples: CollectionConfig = {
  slug: 'guiding-principles',

  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'sortOrder', 'updatedAt'],
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
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Controls the display order. Lower numbers appear first.',
      },
    },
  ],
}
