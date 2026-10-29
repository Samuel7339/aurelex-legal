
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

const buttonDestinationFields = (
  prefix: 'primary' | 'secondary',
  label: string,
) => [
  {
    name: `${prefix}ButtonDestinationType`,
    type: 'select' as const,
    label: `${label} Button Destination`,
    defaultValue: 'custom',
    admin: {
      width: '50%',
      condition: (_: unknown, siblingData: Record<string, unknown>) =>
        Boolean(siblingData?.[`${prefix}ButtonLabel`]),
    },
    options: [
      { label: 'Choose an Existing Page', value: 'page' },
      { label: 'Enter a Custom URL', value: 'custom' },
    ],
  },
  {
    name: `${prefix}ButtonSelectedPage`,
    type: 'select' as const,
    label: 'Select Page',
    options: pageOptions,
    admin: {
      condition: (_: unknown, siblingData: Record<string, unknown>) =>
        Boolean(siblingData?.[`${prefix}ButtonLabel`]) &&
        siblingData?.[`${prefix}ButtonDestinationType`] === 'page',
    },
  },
  {
    name: `${prefix}ButtonUrl`,
    type: 'text' as const,
    label: 'Custom URL',
    admin: {
      condition: (_: unknown, siblingData: Record<string, unknown>) =>
        Boolean(siblingData?.[`${prefix}ButtonLabel`]) &&
        siblingData?.[`${prefix}ButtonDestinationType`] === 'custom',
      description:
        'Enter a path such as /contact or a complete URL such as https://example.com.',
    },
  },
]

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
        {
          name: 'eyebrow',
          type: 'text',
          admin: { width: '50%' },
        },
        {
          name: 'heading',
          type: 'text',
          required: true,
          admin: { width: '50%' },
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          type: 'row',
          fields: [
            {
              name: 'primaryButtonLabel',
              type: 'text',
              admin: { width: '50%' },
            },
            ...buttonDestinationFields('primary', 'Primary'),
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'secondaryButtonLabel',
              type: 'text',
              admin: { width: '50%' },
            },
            ...buttonDestinationFields('secondary', 'Secondary'),
          ],
        },
      ],
    },
  ],
}
