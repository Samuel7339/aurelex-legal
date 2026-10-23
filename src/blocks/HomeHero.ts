
import type { Block } from 'payload'

export const HomeHero: Block = {
  slug: 'homeHero',
  interfaceName: 'HomeHeroBlock',
  labels: {
    singular: 'Home Hero',
    plural: 'Home Heroes',
  },
  fields: [
    {
      name: 'slides',
      type: 'array',
      label: 'Hero Slides',
      minRows: 1,
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'heading', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        { name: 'primaryButtonLabel', type: 'text' },
        { name: 'primaryButtonUrl', type: 'text' },
        { name: 'secondaryButtonLabel', type: 'text' },
        { name: 'secondaryButtonUrl', type: 'text' },
      ],
    },
  ],
}
