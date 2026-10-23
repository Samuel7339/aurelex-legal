import type { Block } from 'payload'

export const PracticeAreasGridBlock: Block = {
  slug: 'practiceAreasGrid',
  interfaceName: 'PracticeAreasGridBlock',
  labels: {
    singular: 'Practice Areas Grid',
    plural: 'Practice Areas Grids',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Areas of Practice',
    },
    {
      name: 'practiceAreas',
      type: 'relationship',
      relationTo: 'practice-areas',
      hasMany: true,
      required: true,
      admin: {
        description: 'Select the practice areas to display in this section.',
      },
    },
  ],
}
