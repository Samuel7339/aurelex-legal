import type { Block } from 'payload'

export const PageHero: Block = {
  slug: 'pageHero',
  interfaceName: 'PageHeroBlock',
  labels: {
    singular: 'Page Hero',
    plural: 'Page Heroes',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
  ],
}
