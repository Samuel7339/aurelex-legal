
import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',

  label: 'Site Settings',

  admin: {
    group: 'Website Content',
  },

  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'firmName',
          type: 'text',
          required: true,
          defaultValue: 'Aurelex Legal',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'phone',
          type: 'text',
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'address',
      type: 'textarea',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'favicon',
          type: 'upload',
          relationTo: 'media',
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'defaultSEO',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Aurelex | Legal Services',
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue:
            'Trusted legal guidance and strategic legal solutions for what matters most.',
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
