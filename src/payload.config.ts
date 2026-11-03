
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig, type Plugin } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { PracticeAreas } from './collections/PracticeAreas'
import { Attorneys } from './collections/Attorneys'
import { Testimonials } from './collections/Testimonials'
import { FAQs } from './collections/FAQs'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { ConsultationBookings } from './collections/ConsultationBookings'
import { GuidingPrinciples } from './collections/GuidingPrinciples'

import { Header } from './globals/Header'
import { Footer } from './globals/Footer'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const payloadSecret = process.env.PAYLOAD_SECRET
const databaseURL = process.env.DATABASE_URL

if (!payloadSecret) {
  throw new Error('PAYLOAD_SECRET is missing from environment variables.')
}

if (!databaseURL) {
  throw new Error('DATABASE_URL is missing from environment variables.')
}

export default buildConfig({
  admin: {
    user: Users.slug,

    importMap: {
      baseDir: path.resolve(dirname),
    },

    meta: {
      icons: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          url: '/aurelex-icon.svg',
        },
      ],
    },

    components: {
      graphics: {
        Logo: '/components/admin/AurelexLogo',
        Icon: '/components/admin/AurelexIcon',
      },

      views: {
        dashboard: {
          Component: '/components/admin/DashboardShortcuts',
        },
      },
    },

    // Live Preview configuration
    livePreview: {
      url: ({ data }) => {
        const pagePaths: Record<string, string> = {
          home: '/',
          about: '/about',
          'practice-areas': '/practice-areas',
          attorneys: '/our-attorneys',
          insights: '/articles',
          contact: '/contact',
        }

        const path = pagePaths[String(data?.pageType)]

        if (!path || !data?.slug) {
          return null
        }

        const params = new URLSearchParams({
          collection: 'pages',
          slug: String(data.slug),
          path,
        })

        return `/preview?${params.toString()}`
      },
      collections: ['pages'],
    },
  },

  collections: [
    Users,
    Media,
    PracticeAreas,
    Attorneys,
    Testimonials,
    FAQs,
    Pages,
    Posts,
    ConsultationBookings,
    GuidingPrinciples,
  ],

  globals: [Header, Footer, SiteSettings],

  editor: lexicalEditor(),

  secret: payloadSecret,

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  db: mongooseAdapter({
    url: databaseURL,
  }),

  sharp,

  plugins: [
    seoPlugin({
      collections: ['pages', 'posts', 'attorneys', 'practice-areas'],
      uploadsCollection: 'media',

      generateTitle: ({ doc, collectionSlug }) => {
        if (collectionSlug === 'attorneys') {
          return doc?.name
            ? `${doc.name} | Aurelex Legal`
            : 'Aurelex Legal'
        }

        if (collectionSlug === 'practice-areas') {
          return doc?.title
            ? `${doc.title} | Aurelex Legal`
            : 'Aurelex Legal'
        }

        if (collectionSlug === 'posts') {
          return doc?.title
            ? `${doc.title} | Aurelex Legal`
            : 'Aurelex Legal'
        }

        if (collectionSlug === 'pages') {
          return doc?.title
            ? `${doc.title} | Aurelex Legal`
            : 'Aurelex Legal'
        }

        return 'Aurelex Legal'
      },

      generateDescription: ({ doc, collectionSlug }) => {
        if (collectionSlug === 'pages') {
          return doc?.description || ''
        }

        if (collectionSlug === 'posts') {
          return doc?.excerpt || ''
        }

        if (collectionSlug === 'attorneys') {
          return doc?.shortDescription || doc?.bio || ''
        }

        if (collectionSlug === 'practice-areas') {
          return doc?.shortDescription || doc?.description || ''
        }

        return ''
      },

      generateImage: ({ doc, collectionSlug }) => {
        if (collectionSlug === 'posts') {
          return doc?.featuredImage
        }

        if (collectionSlug === 'attorneys') {
          return doc?.photo || doc?.image || undefined
        }

        if (collectionSlug === 'practice-areas') {
          return doc?.image || doc?.featuredImage || undefined
        }

        return undefined
      },

      generateURL: ({ doc, collectionSlug }) => {
        if (collectionSlug === 'pages') {
          return `https://YOUR-DOMAIN.com/${doc?.slug === 'home' ? '' : doc?.slug || ''}`
        }

        if (collectionSlug === 'attorneys') {
          return `https://YOUR-DOMAIN.com/attorneys/${doc?.slug || ''}`
        }

        if (collectionSlug === 'practice-areas') {
          return `https://YOUR-DOMAIN.com/practice-areas/${doc?.slug || ''}`
        }

        return `https://YOUR-DOMAIN.com/articles/${doc?.slug || ''}`
      },
    }),

    redirectsPlugin({
      collections: [
        'pages',
        'posts',
        'attorneys',
        'practice-areas',
      ],
      redirectTypes: ['301', '302'],
    }),

    formBuilderPlugin({
      fields: {
        text: true,
        textarea: true,
        email: true,
        select: true,
        radio: true,
        checkbox: true,
        number: true,
        date: true,
        message: true,
      },

      redirectRelationships: ['pages'],

      formSubmissionOverrides: {
        admin: {
          group: 'Client Requests',
        },

        fields: ({ defaultFields }) =>
          defaultFields.map((field) => {
            if (
              !('name' in field) ||
              field.name !== 'submissionData' ||
              field.type !== 'array'
            ) {
              return field
            }

            return {
              ...field,
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'field',
                      type: 'text',
                      required: true,
                      admin: {
                        width: '30%',
                      },
                    },
                    {
                      name: 'value',
                      type: 'textarea',
                      required: true,
                      admin: {
                        width: '70%',
                        className: 'submission-value-field',
                      },
                    },
                  ],
                },
              ],
            }
          }),
      },

      formOverrides: {
        admin: {
          group: 'Website Content',
        },
      },
    }),
  ],
})
