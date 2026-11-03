
import type { CollectionConfig } from 'payload'

import {
  adminOnly,
  adminOrEditorCreateDraft,
  adminPublishEditorDraftUpdate,
  publishedOrStaff,
} from '../access/accessControl'

export const FAQs: CollectionConfig = {
  slug: 'faqs',

  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'category', 'updatedAt'],
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
          name: 'question',
          type: 'text',
          required: true,
          admin: {
            width: '65%',
          },
        },
        {
          name: 'category',
          type: 'select',
          required: true,
          options: [
            {
              label: 'General Questions',
              value: 'general',
            },
            {
              label: 'Case & Process',
              value: 'case-process',
            },
          ],
          admin: {
            width: '35%',
          },
        },
      ],
    },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
    },
  ],
}
