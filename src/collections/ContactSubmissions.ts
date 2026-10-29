
import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { adminOnly } from '../access/accessControl'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',

  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'createdAt'],
    group: 'Client Requests',
  },

  access: {
    read: adminOnly,
    create: () => true,
    update: adminOnly,
    delete: adminOnly,
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
          name: 'email',
          type: 'email',
          required: true,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'phone',
          type: 'text',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'subject',
          type: 'text',
          required: true,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      admin: {
        width: '100%',
      },
    },
  ],
}
