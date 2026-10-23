
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
    <section className="bg-slate-900 py-20 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-400">
            Our Legal Team
          </p>

          <h2 className="mt-3 font-serif text-3xl font-bold md:text-4xl">
            {heading}
          </h2>

          {description ? (
            <p className="mx-auto mt-4 max-w-2xl text-slate-300">
              {description}
            </p>
          ) : null}
        </div>

        {attorneys.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {attorneys.map((attorney) => (
              <AttorneyCard key={attorney.id} attorney={attorney} />
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-300">
            Our attorney profiles will be available soon.
          </p>
        )}

        {viewAllLabel && viewAllUrl ? (
          <div className="mt-12 text-center">
            <Link
              href={viewAllUrl}
              className="inline-block border border-amber-400 px-7 py-3 font-semibold text-amber-400 transition hover:bg-amber-400 hover:text-slate-900"
            >
              {viewAllLabel}
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  )
}
