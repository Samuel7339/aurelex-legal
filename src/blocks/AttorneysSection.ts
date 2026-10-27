import type { Block } from 'payload'

export const AttorneysSectionBlock: Block = {
  slug: 'attorneysSection',
  interfaceName: 'AttorneysSectionBlock',
  labels: {
    singular: 'Attorneys Section',
    plural: 'Attorneys Sections',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Meet Our Attorneys',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'displayMode',
      type: 'select',
      label: 'Attorney Display Mode',
      defaultValue: 'selected',
      options: [
        {
          label: 'Selected Attorneys',
          value: 'selected',
        },
        {
          label: 'All Attorneys',
          value: 'all',
        },
      ],
      admin: {
        description:
          'Choose specific attorneys or automatically display all attorneys.',
      },
    },
    {
      name: 'attorneys',
      type: 'relationship',
      relationTo: 'attorneys',
      hasMany: true,
      admin: {
        condition: (_, siblingData) =>
          siblingData?.displayMode !== 'all',
        description: 'Select the attorneys to display in this section.',
      },
    },
    {
      name: 'viewAllLabel',
      type: 'text',
      defaultValue: 'Meet All Attorneys',
    },
    {
      name: 'viewAllUrl',
      type: 'text',
      defaultValue: '/our-attorneys',
    },
  ],
}