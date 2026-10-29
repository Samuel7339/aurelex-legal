
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
      type: 'row',
      fields: [
        {
          name: 'primaryButtonLabel',
          type: 'text',
          required: true,
          defaultValue: 'Get started now',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'destinationType',
          type: 'select',
          label: 'Button Destination',
          defaultValue: 'custom',
          options: [
            {
              label: 'Choose an Existing Page',
              value: 'page',
            },
            {
              label: 'Enter a Custom URL',
              value: 'custom',
            },
          ],
          admin: {
            width: '50%',
            description: 'Choose a website page or enter your own URL.',
          },
        },
      ],
    },
    {
      name: 'selectedPage',
      type: 'select',
      label: 'Select Page',
      options: [
        { label: 'Home', value: '/' },
        { label: 'About', value: '/about' },
        { label: 'Practice Areas', value: '/practice-areas' },
        { label: 'Our Attorneys', value: '/our-attorneys' },
        { label: 'Insights', value: '/articles' },
        { label: 'Contact', value: '/contact' },
        { label: 'Book a Consultation', value: '/book-consultant' },
      ],
      admin: {
        condition: (_, siblingData) =>
          siblingData?.destinationType === 'page',
      },
    },
    {
      name: 'primaryButtonUrl',
      type: 'text',
      label: 'Custom URL',
      required: false,
      admin: {
        condition: (_, siblingData) =>
          siblingData?.destinationType === 'custom',
        description:
          'Enter a path such as /contact or an external URL such as https://example.com.',
      },
    },
  ],
}
