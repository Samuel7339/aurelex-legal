
import type { Block } from 'payload'

export const AboutFirmBlock: Block = {
  slug: 'aboutFirm',
  interfaceName: 'AboutFirmBlock',
  labels: {
    singular: 'About Our Firm',
    plural: 'About Our Firm Sections',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Small Heading',
      defaultValue: 'Who We Are',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'About Our Firm',
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
  name: 'buttonLabel',
  type: 'text',
  label: 'Button Label',
  admin: {
    description: 'Leave empty to hide the button.',
  },
},
{
  name: 'buttonUrl',
  type: 'text',
  label: 'Button URL',
  admin: {
    description: 'Example: /about or /book-consultant',
  },
},
  ],
}
