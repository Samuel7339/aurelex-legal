
import type { GlobalConfig } from 'payload'
import { routeOptions } from '../generated/routeOptions'

const destinationFields = [
  {
    type: 'row' as const,
    fields: [
      {
        name: 'viewAllLabel',
        type: 'text' as const,
        label: 'View All Label',
        admin: {
          width: '30%',
          condition: (_: unknown, siblingData: { showViewAll?: boolean }) =>
            siblingData?.showViewAll === true,
        },
      },
      {
        name: 'viewAllDestinationType',
        type: 'select' as const,
        label: 'View All Destination',
        defaultValue: 'page',
        options: [
          { label: 'Choose an Existing Page', value: 'page' },
          { label: 'Enter a Custom URL', value: 'custom' },
        ],
        admin: {
          width: '30%',
          condition: (_: unknown, siblingData: { showViewAll?: boolean }) =>
            siblingData?.showViewAll === true,
        },
      },
      {
        name: 'viewAllSelectedPage',
        type: 'select' as const,
        label: 'Select Page',
        options: [...routeOptions],
        admin: {
          width: '40%',
          condition: (
            _: unknown,
            siblingData: {
              showViewAll?: boolean
              viewAllDestinationType?: string
            },
          ) =>
            siblingData?.showViewAll === true &&
            siblingData?.viewAllDestinationType === 'page',
        },
      },
      {
        name: 'viewAllCustomUrl',
        type: 'text' as const,
        label: 'Custom URL',
        admin: {
          width: '40%',
          condition: (
            _: unknown,
            siblingData: {
              showViewAll?: boolean
              viewAllDestinationType?: string
            },
          ) =>
            siblingData?.showViewAll === true &&
            siblingData?.viewAllDestinationType === 'custom',
        },
      },
    ],
  },
]

export const Footer: GlobalConfig = {
  slug: 'footer',

  label: 'Footer',

  admin: {
    group: 'Website Content',
  },

  fields: [
    {
      name: 'description',
      type: 'textarea',
      label: 'Footer Description',
    },

    {
      name: 'quickLinks',
      type: 'array',
      label: 'Quick Links',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              admin: {
                width: '30%',
              },
            },
            {
              name: 'destinationType',
              type: 'select',
              label: 'Link Destination',
              defaultValue: 'custom',
              options: [
                { label: 'Choose an Existing Page', value: 'page' },
                { label: 'Enter a Custom URL', value: 'custom' },
              ],
              admin: {
                width: '30%',
              },
            },
            {
              name: 'selectedPage',
              type: 'select',
              label: 'Select Page',
              options: [...routeOptions],
              admin: {
                width: '40%',
                condition: (_, siblingData) =>
                  siblingData?.destinationType === 'page',
              },
            },
            {
              name: 'url',
              type: 'text',
              label: 'Custom URL',
              required: true,
              admin: {
                width: '40%',
                condition: (_, siblingData) =>
                  siblingData?.destinationType === 'custom',
              },
            },
          ],
        },
      ],
    },

    {
      name: 'collectionLinks',
      type: 'array',
      label: 'Collection Links',
      admin: {
        description:
          'Choose a content collection and select multiple entries to display in the footer.',
      },
      fields: [
        {
          name: 'contentType',
          type: 'select',
          label: 'Content Type',
          required: true,
          options: [
            { label: 'Practice Areas', value: 'practice-areas' },
            { label: 'Attorneys', value: 'attorneys' },
            { label: 'Insights', value: 'posts' },
          ],
        },
        {
          name: 'practiceAreas',
          type: 'relationship',
          relationTo: 'practice-areas',
          hasMany: true,
          label: 'Select Practice Areas',
          admin: {
            condition: (_, siblingData) =>
              siblingData?.contentType === 'practice-areas',
          },
        },
        {
          name: 'attorneys',
          type: 'relationship',
          relationTo: 'attorneys',
          hasMany: true,
          label: 'Select Attorneys',
          admin: {
            condition: (_, siblingData) =>
              siblingData?.contentType === 'attorneys',
          },
        },
        {
          name: 'posts',
          type: 'relationship',
          relationTo: 'posts',
          hasMany: true,
          label: 'Select Insights',
          admin: {
            condition: (_, siblingData) =>
              siblingData?.contentType === 'posts',
          },
        },
        {
          name: 'showViewAll',
          type: 'checkbox',
          label: 'Show View All Link',
          defaultValue: false,
        },
        ...destinationFields,
      ],
    },
  ],
}
