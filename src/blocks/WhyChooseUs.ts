
import type { Block } from 'payload'

export const WhyChooseUsBlock: Block = {
  slug: 'whyChooseUs',
  interfaceName: 'WhyChooseUsBlock',
  labels: {
    singular: 'Why Choose Us Section',
    plural: 'Why Choose Us Sections',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          label: 'Small Heading',
          defaultValue: 'Why Choose Us',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'heading',
          type: 'text',
          required: true,
          defaultValue: 'Your Success Is Our Legal Commitment',
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'First Paragraph',
    },
    {
      name: 'secondaryDescription',
      type: 'textarea',
      label: 'Second Paragraph',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'buttonLabel',
          type: 'text',
          label: 'Button Label',
          defaultValue: 'Learn More About Us',
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
      defaultValue: '/about',
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
      name: 'buttonUrl',
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
    {
      name: 'highlightText',
      type: 'textarea',
      label: 'Highlighted Message',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'statOneValue',
          type: 'text',
          label: 'First Statistic Value',
          defaultValue: '1,901+',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'statOneLabel',
          type: 'text',
          label: 'First Statistic Label',
          defaultValue: 'Cases Successfully Resolved',
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'statTwoValue',
          type: 'text',
          label: 'Second Statistic Value',
          defaultValue: '25+',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'statTwoLabel',
          type: 'text',
          label: 'Second Statistic Label',
          defaultValue: 'Years of Combined Experience',
          admin: {
            width: '50%',
          },
        },
      ],
    },
  ],
}
