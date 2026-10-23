import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { adminOnly } from '../access/accessControl'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',

  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'createdAt'],
    group: 'Website Content',
  },

  access: {
    // Only Admin can view private enquiries.
    read: adminOnly,

    // Website visitors can submit enquiries.
    create: () => true,

    // Only Admin can modify or delete submissions.
    update: adminOnly,
    delete: adminOnly,
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'subject',
      type: 'text',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
  ],
}
