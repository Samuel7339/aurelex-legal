
import type { Block } from 'payload'

export const AboutSectionBlock: Block = {
  slug: 'aboutSection',
  interfaceName: 'AboutSectionBlock',
  labels: {
    singular: 'About Section',
    plural: 'About Sections',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Small Heading',
      required: true,
      defaultValue: 'About Us',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Dedicated Advocates. Proven Track Record.',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'First Paragraph',
      required: true,
      defaultValue:
        'We are a full-service law firm built on integrity, experience, and results. Our attorneys are dedicated to understanding your unique situation and delivering personalized legal strategies.',
    },
    {
      name: 'secondaryDescription',
      type: 'textarea',
      label: 'Second Paragraph',
      required: true,
      defaultValue:
        'From individuals and families to businesses and organizations, we are committed to being your trusted legal partner every step of the way.',
    },
    {
      name: 'buttonLabel',
      type: 'text',
      required: true,
      defaultValue: 'Learn More About Us',
    },
    {
      name: 'buttonUrl',
      type: 'text',
      required: true,
      defaultValue: '/about',
    },
  ],
}
