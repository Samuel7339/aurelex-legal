import type { CollectionConfig } from 'payload'

import { adminOnly, staffOnly } from '../access/accessControl'

export const Media: CollectionConfig = {
  slug: 'media',

  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['alt', 'updatedAt'],
    group: 'Website Content',
  },

  access: {
    read: () => true,
    create: staffOnly,
    update: staffOnly,
    delete: adminOnly,
  },

  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],

  upload: true,
}
