
import type { CollectionConfig } from 'payload'
import { PageHero } from '@/blocks/PageHero'
import { CTABlock } from '@/blocks/CTA'
import { PracticeAreasGridBlock } from '@/blocks/PracticeAreasGrid'
import { slugField } from 'payload'

import { HomeHero } from '@/blocks/HomeHero'
import { TestimonialsBlock } from '@/blocks/Testimonials'
import { FAQsBlock } from '@/blocks/FAQs'
import { AttorneysSectionBlock } from '@/blocks/AttorneysSection'
import { WhyChooseUsBlock } from '@/blocks/WhyChooseUs'
import { GuidingPrinciplesBlock } from '@/blocks/GuidingPrinciples'
import { AboutFirmBlock } from '@/blocks/AboutFirm'
import { InsightsSectionBlock } from '@/blocks/InsightsSection'
import { PracticeAreasDirectoryBlock } from '@/blocks/PracticeAreasDirectory'
import { ConsultantBookingBlock } from '@/blocks/ConsultantBooking'



import {
  adminOnly,
  adminOrEditorCreateDraft,
  adminPublishEditorDraftUpdate,
  publishedOrStaff,
} from '../access/accessControl'

export const Pages: CollectionConfig = {
  slug: 'pages',

  admin: {
  useAsTitle: 'title',
  defaultColumns: ['title', 'slug', 'pageType', 'updatedAt'],
  group: 'Website Content',

preview: (doc) => {
  const pagePaths: Record<string, string> = {
    home: '/',
    about: '/about',
    'practice-areas': '/practice-areas',
    attorneys: '/our-attorneys',
    insights: '/articles',
    contact: '/contact',
  }

  const path = pagePaths[String(doc?.pageType)]

  if (!path) return null

  const params = new URLSearchParams({
    collection: 'pages',
    slug: String(doc?.slug || ''),
    path,
  })

  return `/preview?${params.toString()}`
},
},

  access: {
    read: publishedOrStaff,
    create: adminOrEditorCreateDraft,
    update: adminPublishEditorDraftUpdate,
    delete: adminOnly,
  },

  // hooks: {
  //   afterChange: [revalidatePages],
  // },

  versions: {
    drafts: true,
  },

  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'pageType',
          type: 'select',
          required: true,
          options: [
            { label: 'Home', value: 'home' },
            { label: 'About', value: 'about' },
            { label: 'Practice Areas', value: 'practice-areas' },
            { label: 'Attorneys', value: 'attorneys' },
            { label: 'Insights', value: 'insights' },
            { label: 'Contact', value: 'contact' },
            { label: 'Cases', value: 'cases' },
            { label: 'Locations', value: 'locations' },
          ],
          admin: {
            width: '50%',
          },
        },
      ],
    },
    slugField({
      fieldToUse: 'title',
    }),
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'General description of this page.',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      label: 'Page Sections',
      blocks: [
        PageHero,
        CTABlock,
        PracticeAreasGridBlock,
        HomeHero,
        TestimonialsBlock,
        FAQsBlock,
        // AboutSectionBlock,
        AttorneysSectionBlock,
        WhyChooseUsBlock,
        GuidingPrinciplesBlock,
        AboutFirmBlock,
        InsightsSectionBlock,
        PracticeAreasDirectoryBlock,
        ConsultantBookingBlock,
      ],
      admin: {
        description: 'Configure reusable sections for this page.',
      },
    },
  
  ],
}
