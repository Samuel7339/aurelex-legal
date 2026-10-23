
import type { Block } from 'payload'

export const GuidingPrinciplesBlock: Block = {
  slug: 'guidingPrinciples',
  interfaceName: 'GuidingPrinciplesBlock',
  labels: {
    singular: 'Guiding Principles Section',
    plural: 'Guiding Principles Sections',
  },
  fields: [

    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'What Guides Us',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'principles',
      type: 'relationship',
      relationTo: 'guiding-principles',
      hasMany: true,
      admin: {
        description: 'Select the principles to display in this section.',
      },
    },
  ],
}
