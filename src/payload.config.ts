import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { PracticeAreas } from './collections/PracticeAreas'
import { Attorneys } from './collections/Attorneys'
import { Testimonials } from './collections/Testimonials'
import { FAQs } from './collections/FAQs'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { ContactSubmissions } from './collections/ContactSubmissions'
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
    ContactSubmissions,
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

  plugins: [],
})
