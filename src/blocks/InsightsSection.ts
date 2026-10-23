
import type { Block } from 'payload'

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
      name: 'viewAllLabel',
      type: 'text',
      defaultValue: 'View All Insights',
    },
    {
      name: 'viewAllUrl',
      type: 'text',
      defaultValue: '/articles',
    },
  ],
}
