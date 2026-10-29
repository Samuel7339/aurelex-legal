
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

export const AboutFirmBlock: Block = {
  slug: 'aboutFirm',
  interfaceName: 'AboutFirmBlock',
  labels: {
    singular: 'About Our Firm',
    plural: 'About Our Firm Sections',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          label: 'Small Heading',
          defaultValue: 'Who We Are',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'heading',
          type: 'text',
          required: true,
          defaultValue: 'About Our Firm',
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'buttonLabel',
          type: 'text',
          label: 'Button Label',
          admin: {
            width: '50%',
            description: 'Leave empty to hide the button.',
          },
        },
        {
          name: 'buttonDestinationType',
          type: 'select',
          label: 'Button Destination',
          defaultValue: 'custom',
          options: [
            { label: 'Choose an Existing Page', value: 'page' },
            { label: 'Enter a Custom URL', value: 'custom' },
          ],
          admin: {
            width: '50%',
            condition: (_, siblingData) =>
              Boolean(siblingData?.buttonLabel),
          },
        },
      ],
    },
    {
      name: 'selectedButtonPage',
      type: 'select',
      label: 'Select Page',
      options: pageOptions,
      admin: {
        condition: (_, siblingData) =>
          Boolean(siblingData?.buttonLabel) &&
          siblingData?.buttonDestinationType === 'page',
      },
    },
    {
      name: 'buttonUrl',
      type: 'text',
      label: 'Custom Button URL',
      admin: {
        condition: (_, siblingData) =>
          Boolean(siblingData?.buttonLabel) &&
          siblingData?.buttonDestinationType === 'custom',
        description: 'Enter a path or a complete external URL.',
      },
    },
  ],
}
