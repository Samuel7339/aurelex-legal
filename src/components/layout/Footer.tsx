import Link from 'next/link'
import { getFooterData, getSiteSettings } from '@/lib/payload/globals'

type FooterEntry = {
  id?: string | number
  title?: string | null
  name?: string | null
  slug?: string | null
}

type CollectionType = 'practice-areas' | 'attorneys' | 'posts'

const collectionConfig = {
  'practice-areas': {
    field: 'practiceAreas',
    heading: 'Practice Areas',
    basePath: '/practice-areas',
  },
  attorneys: {
    field: 'attorneys',
    heading: 'Our Attorneys',
    basePath: '/our-attorneys',
  },
  posts: {
    field: 'posts',
    heading: 'Insights',
    basePath: '/articles',
  },
} as const

function isPopulatedEntry(value: unknown): value is FooterEntry {
  return (
    typeof value === 'object' &&
    value !== null &&
    'slug' in value
  )
}

function getCollectionEntries(section: {
  contentType?: CollectionType | null
  practiceAreas?: unknown[] | null
  attorneys?: unknown[] | null
  posts?: unknown[] | null
}): FooterEntry[] {
  const config = section.contentType
    ? collectionConfig[section.contentType]
    : undefined

  if (!config) return []

  const entries = section[config.field]

  return Array.isArray(entries)
    ? entries.filter(isPopulatedEntry)
    : []
}

export default async function Footer() {
  const [footer, settings] = await Promise.all([
    getFooterData(),
    getSiteSettings(),
  ])

  const quickLinks =
    footer.quickLinks?.flatMap((item) => {
      const url =
        item.destinationType === 'page'
          ? item.selectedPage || undefined
          : item.url || undefined

      return url ? [{ ...item, url }] : []
    }) ?? []

  const collectionSections =
    footer.collectionLinks?.flatMap((section) => {
      const contentType = section.contentType as
        | CollectionType
        | undefined

      const config = contentType
        ? collectionConfig[contentType]
        : undefined

      if (!config) return []

      const links = getCollectionEntries(section).flatMap((entry) => {
        const label = entry.title || entry.name

        if (!label || !entry.slug) return []

        return [
          {
            id: entry.id ?? entry.slug,
            label,
            url: `${config.basePath}/${entry.slug}`,
          },
        ]
      })

      const viewAllUrl =
  section.viewAllDestinationType === 'page'
    ? section.viewAllSelectedPage
    : section.viewAllCustomUrl

      const showViewAll =
        section.showViewAll === true &&
        Boolean(section.viewAllLabel?.trim()) &&
        Boolean(viewAllUrl?.trim())

      if (links.length === 0 && !showViewAll) return []

      return [
        {
          heading: config.heading,
          links,
          viewAllLabel: showViewAll
            ? section.viewAllLabel
            : undefined,
          viewAllUrl: showViewAll ? viewAllUrl : undefined,
        },
      ]
    }) ?? []

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#10233f] via-[#132b49] to-[#0b192d] text-white">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(160px,1fr))] lg:gap-x-6 lg:gap-y-12">
          {/* Firm information */}
          <div className="min-w-0">
            <Link
              href="/"
              className="inline-block text-2xl font-semibold tracking-tight text-white transition-colors duration-300 hover:text-amber-300 sm:text-[26px]"
            >
              {settings.firmName || 'Aurelex Legal'}
            </Link>

            <div className="mt-4 h-px w-12 bg-gradient-to-r from-amber-300 to-amber-300/10" />

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-300">
              {footer.description ||
                'Thoughtful legal guidance and professional representation for individuals and businesses.'}
            </p>
          </div>

          {/* Quick Links */}
          <div className="min-w-0">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-white sm:text-[13px]">
              Quick Links
            </h2>

            <div className="mt-4 h-px w-9 bg-amber-400/80" />

            <ul className="mt-5 space-y-3.5">
              {quickLinks.map((item, index) => (
                <li key={`${item.url}-${index}`}>
                  <Link
                    href={item.url}
                    className="inline-flex text-sm leading-6 text-slate-300 transition-colors duration-200 hover:text-amber-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Collection sections */}
          {collectionSections.map((section, index) => (
            <div
              key={`${section.heading}-${index}`}
              className="min-w-0"
            >
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-white sm:text-[13px]">
                {section.heading}
              </h2>

              <div className="mt-4 h-px w-9 bg-amber-400/80" />

              <ul className="mt-5 space-y-3.5">
                {section.links.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.url}
                      className="inline-flex text-sm leading-6 text-slate-300 transition-colors duration-200 hover:text-amber-300"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}

                {section.viewAllLabel && section.viewAllUrl && (
                  <li>
                    <Link
                      href={section.viewAllUrl}
                      className="inline-flex text-sm leading-6 text-slate-300 transition-colors duration-200 hover:text-amber-300"
                    >
                      {section.viewAllLabel}
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div className="min-w-0">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-white sm:text-[13px]">
              Contact
            </h2>

            <div className="mt-4 h-px w-9 bg-amber-400/80" />

            <p className="mt-5 text-sm leading-7 text-slate-300">
              Have a legal question? Contact our team to discuss your needs
              and explore the next steps.
            </p>

            <Link
              href="/contact"
              className="mt-6 inline-flex items-center justify-center rounded-lg border border-amber-300/70 bg-amber-400 px-5 py-3 text-sm font-semibold text-[#10233f] shadow-sm shadow-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-200 hover:bg-amber-300 hover:shadow-lg hover:shadow-black/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#10233f]"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-14 border-t border-white/10 pt-6 sm:mt-16 sm:pt-7">
          <p className="text-xs leading-6 text-slate-400 sm:text-sm">
            © {new Date().getFullYear()} {settings.firmName || 'Aurelex Legal'}.{' '}
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
