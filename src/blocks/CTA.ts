import type { Block } from 'payload'

export const CTABlock: Block = {
  slug: 'cta',
  interfaceName: 'CTABlock',
  labels: {
    singular: 'Call to Action',
    plural: 'Calls to Action',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Schedule Your Consultation and Take the First Step.',
    },
    {
      name: 'primaryButtonLabel',
      type: 'text',
      required: true,
      defaultValue: 'Get started now',
    },
    {
      name: 'primaryButtonUrl',
      type: 'text',
      required: true,
      defaultValue: '/book-appointment',
    },
  ],
}
