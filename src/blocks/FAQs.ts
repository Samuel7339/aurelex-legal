
import type { Block } from 'payload'

export const FAQsBlock: Block = {
  slug: 'faqs',
  interfaceName: 'FAQsBlock',
  labels: {
    singular: 'FAQ Section',
    plural: 'FAQ Sections',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Frequently Asked Questions',
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue:
        'Clear answers to common questions about our services and what to expect.',
    },
    {
      name: 'faqs',
      type: 'relationship',
      relationTo: 'faqs',
      hasMany: true,
      admin: {
        description: 'Select the FAQs to display in this section.',
      },
    },
  ],
}
