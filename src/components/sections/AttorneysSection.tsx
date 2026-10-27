import Link from 'next/link'
import AttorneyCard from '@/components/attorneys/AttorneyCard'

import type { Media } from '@/payload-types'

type SectionAttorney = {
  id: string
  name: string
  slug: string
  designation: string
  shortDescription?: string | null
  photo?: string | Media | null
  featuredOnHome?: boolean | null
  sortOrder?: number | null
}

type AttorneysSectionProps = {
  attorneys: SectionAttorney[]
  heading?: string
  description?: string
  viewAllLabel?: string
  viewAllUrl?: string
}

export default function AttorneysSection({
  attorneys,
  heading = 'Meet Our Attorneys',
  description = 'Experienced legal professionals committed to protecting your interests.',
  viewAllLabel = 'Meet All Attorneys',
  viewAllUrl = '/attorneys',
}: AttorneysSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 py-16 text-white sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(180,140,60,0.10),transparent_55%)]" />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <p className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-amber-400 sm:text-sm">
            <span className="h-px w-8 bg-amber-500/70" />
            Our Legal Team
            <span className="h-px w-8 bg-amber-500/70" />
          </p>

          <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            {heading}
          </h2>

          {description ? (
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
              {description}
            </p>
          ) : null}

          <div className="mx-auto mt-7 h-px w-16 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
        </div>

        {attorneys.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
            {attorneys.map((attorney) => (
              <AttorneyCard key={attorney.id} attorney={attorney} />
            ))}
          </div>
        ) : (
          <p className="text-center text-sm leading-7 text-slate-300">
            Our attorney profiles will be available soon.
          </p>
        )}

        {viewAllLabel && viewAllUrl ? (
          <div className="mt-12 text-center sm:mt-16">
            <Link
              href={viewAllUrl}
              className="group inline-flex items-center justify-center gap-3 rounded-md border border-amber-400/70 bg-amber-400/5 px-7 py-3.5 text-sm font-semibold text-amber-300 transition-all duration-300 hover:border-amber-300 hover:bg-amber-400 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            >
              {viewAllLabel}
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  )
}

