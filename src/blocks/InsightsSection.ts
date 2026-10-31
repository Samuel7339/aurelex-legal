
import type { Block } from 'payload'
import { routeOptions } from '../generated/routeOptions'

export const InsightsSectionBlock: Block = {
  slug: 'insightsSection',
  interfaceName: 'InsightsSectionBlock',
  labels: {
    singular: 'Insights Section',
    plural: 'Insights Sections',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Latest Insights',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'displayMode',
      type: 'select',
      label: 'Post Display Mode',
      defaultValue: 'selected',
      options: [
        {
          label: 'Selected Posts',
          value: 'selected',
        },
        {
          label: 'All Posts',
          value: 'all',
        },
      ],
      admin: {
        description:
          'Choose specific posts or automatically display all published posts.',
      },
    },
    {
      name: 'posts',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true,
      maxDepth: 2,
      admin: {
        condition: (_, siblingData) =>
          siblingData?.displayMode === 'selected',
        description: 'Select the posts to display in this section.',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'viewAllLabel',
          type: 'text',
          label: 'Button Label',
          defaultValue: 'View All Insights',
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
      defaultValue: '/articles',
      options: [...routeOptions],
      admin: {
        condition: (_, siblingData) =>
          siblingData?.destinationType === 'page',
      },
    },
    {
      name: 'viewAllUrl',
      type: 'text',
      label: 'Custom URL',
      required: false,
      defaultValue: '/articles',
      admin: {
        condition: (_, siblingData) =>
          siblingData?.destinationType === 'custom',
        description:
          'Enter a path such as /articles or an external URL such as https://example.com.',
      },
    },
  ],
}
