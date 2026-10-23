import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',

  label: 'Footer',

  fields: [
    {
      name: 'description',
      type: 'textarea',
      label: 'Footer Description',
    },
    {
      name: 'quickLinks',
      type: 'array',
      label: 'Quick Links',
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
      name: 'practiceAreaLinks',
      type: 'array',
      label: 'Practice Area Links',
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
  ],
}
