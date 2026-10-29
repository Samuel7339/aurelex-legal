
import type { CollectionConfig } from 'payload'
import { adminOnly } from '@/access/accessControl'

export const ConsultationBookings: CollectionConfig = {
  slug: 'consultation-bookings',

  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'email', 'preferredDate', 'status'],
    group: 'Client Requests',
  },

  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => true,
    update: adminOnly,
    delete: adminOnly,
  },

  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'fullName',
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
          required: true,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'practiceArea',
          type: 'relationship',
          relationTo: 'practice-areas',
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
          name: 'preferredDate',
          type: 'date',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'status',
          type: 'select',
          defaultValue: 'pending',
          options: [
            { label: 'Pending', value: 'pending' },
            { label: 'Contacted', value: 'contacted' },
            { label: 'Confirmed', value: 'confirmed' },
            { label: 'Cancelled', value: 'cancelled' },
          ],
          access: {
            update: ({ req }) => Boolean(req.user),
          },
          admin: {
            width: '50%',
          },
        },
      ],
    },

    {
      name: 'message',
      type: 'textarea',
      admin: {
        width: '100%',
      },
    },
  ],
}
