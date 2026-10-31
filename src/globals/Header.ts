
import type { GlobalConfig } from 'payload'
import { routeOptions } from '../generated/routeOptions'

export const Header: GlobalConfig = {
  slug: 'header',

  label: 'Website Header',

  admin: {
    group: 'Website Content',
  },

  fields: [
    {
      name: 'navigation',
      type: 'array',
      label: 'Navigation Links',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              admin: {
                width: '50%',
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
                width: '50%',
              },
            },
          ],
        },
        {
          name: 'selectedPage',
          type: 'select',
          label: 'Select Page',
          options: [...routeOptions],
          admin: {
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
            condition: (_, siblingData) =>
              siblingData?.destinationType === 'custom',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'ctaLabel',
          type: 'text',
          label: 'Button Label',
          defaultValue: 'Schedule a Consultation',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'ctaDestinationType',
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
      name: 'ctaSelectedPage',
      type: 'select',
      label: 'Select Page',
      options: [...routeOptions],
      admin: {
        condition: (_, siblingData) =>
          siblingData?.ctaDestinationType === 'page',
      },
    },
    {
      name: 'ctaUrl',
      type: 'text',
      label: 'Custom Button URL',
      required: true,
      defaultValue: '/contact',
      admin: {
        condition: (_, siblingData) =>
          siblingData?.ctaDestinationType === 'custom',
      },
    },
  ],
}
