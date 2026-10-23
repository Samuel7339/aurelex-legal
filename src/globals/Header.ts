import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',

  label: 'Website Header',

  fields: [
    {
      name: 'navigation',
      type: 'array',
      label: 'Navigation Links',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'ctaLabel',
      type: 'text',
      label: 'Button Label',
      defaultValue: 'Schedule a Consultation',
    },
    {
      name: 'ctaUrl',
      type: 'text',
      label: 'Button URL',
      defaultValue: '/contact',
    },
  ],
}
