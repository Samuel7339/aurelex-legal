import type { Block } from 'payload'

const pageOptions = [
  { label: 'Home', value: '/' },
  { label: 'About', value: '/about' },
  { label: 'Practice Areas', value: '/practice-areas' },
  { label: 'Our Attorneys', value: '/our-attorneys' },
  { label: 'Insights', value: '/articles' },
  { label: 'Contact', value: '/contact' },
  { label: 'Book a Consultation', value: '/book-consultant' },
]

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
        { label: 'Selected Attorneys', value: 'selected' },
        { label: 'All Attorneys', value: 'all' },
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
      type: 'row',
      fields: [
        {
          name: 'viewAllLabel',
          type: 'text',
          defaultValue: 'Meet All Attorneys',
          label: 'Button Label',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'viewAllDestinationType',
          type: 'select',
          label: 'Button Destination',
          defaultValue: 'custom',
          options: [
            { label: 'Choose an Existing Page', value: 'page' },
            { label: 'Enter a Custom URL', value: 'custom' },
          ],
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'selectedViewAllPage',
      type: 'select',
      label: 'Select Page',
      options: pageOptions,
      admin: {
        condition: (_, siblingData) =>
          siblingData?.viewAllDestinationType === 'page',
      },
    },
    {
      name: 'viewAllUrl',
      type: 'text',
      label: 'Custom Button URL',
      defaultValue: '/our-attorneys',
      admin: {
        condition: (_, siblingData) =>
          siblingData?.viewAllDestinationType === 'custom',
      },
    },
  ],
}