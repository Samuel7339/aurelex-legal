import type { CollectionConfig } from 'payload'
import { adminOnly, adminFieldOnly } from '../access/accessControl'

export const Users: CollectionConfig = {
  slug: 'users',

  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'role'],
  },

  auth: true,

  access: {
    create: adminOnly,
    update: adminOnly,
    delete: adminOnly,

    // Logged-in users can read their own account.
    // Admin can read all staff accounts.
    read: ({ req }) => {
      if (!req.user) {
        return false
      }

      if (req.user.role === 'admin') {
        return true
      }

      return {
        id: {
          equals: req.user.id,
        },
      }
    },
  },

  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      saveToJWT: true,
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Editor',
          value: 'editor',
        },
      ],

      // Only Admin can assign or change a role.
      access: {
        update: adminFieldOnly,
      },
    },
  ],
}
