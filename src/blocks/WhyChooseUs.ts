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
    name: 'eyebrow',
    type: 'text',
    label: 'Small Heading',
    defaultValue: 'Why Choose Us',
  },
  {
    name: 'heading',
    type: 'text',
    required: true,
    defaultValue: 'Your Success Is Our Legal Commitment',
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
    name: 'buttonLabel',
    type: 'text',
    defaultValue: 'Learn More About Us',
  },
  {
    name: 'buttonUrl',
    type: 'text',
    defaultValue: '/about',
  },
  {
    name: 'highlightText',
    type: 'textarea',
    label: 'Highlighted Message',
  },
  {
    name: 'statOneValue',
    type: 'text',
    label: 'First Statistic Value',
    defaultValue: '1,901+',
  },
  {
    name: 'statOneLabel',
    type: 'text',
    label: 'First Statistic Label',
    defaultValue: 'Cases Successfully Resolved',
  },
  {
    name: 'statTwoValue',
    type: 'text',
    label: 'Second Statistic Value',
    defaultValue: '25+',
  },
  {
    name: 'statTwoLabel',
    type: 'text',
    label: 'Second Statistic Label',
    defaultValue: 'Years of Combined Experience',
  },
],
}