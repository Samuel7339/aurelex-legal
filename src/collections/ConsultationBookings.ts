import type { CollectionConfig } from 'payload'
import { adminOnly } from '@/access/accessControl'
export const ConsultationBookings: CollectionConfig = {
  slug: 'consultation-bookings',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'email', 'preferredDate', 'status'],
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => true,
    update: adminOnly,
    delete: adminOnly,
  },
  fields: [
    {
      name: 'fullName',
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
      required: true,
    },
    {
      name: 'practiceArea',
      type: 'relationship',
      relationTo: 'practice-areas',
    },
    {
      name: 'preferredDate',
      type: 'date',
    },
    {
      name: 'message',
      type: 'textarea',
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
    },
  ],
}
