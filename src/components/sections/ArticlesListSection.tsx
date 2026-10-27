
import Link from 'next/link'
import type { Post } from '@/payload-types'
import ArticleCard from '@/components/insights/ArticleCard'

type ArticlesListSectionProps = {
  posts: Post[]
  heading?: string
  description?: string
  viewAllLabel?: string
  viewAllUrl?: string
}

export default function ArticlesListSection({
  posts,
  heading = 'Latest Articles',
  description = 'Read our latest articles and explore legal topics, updates, and practical guidance.',
  viewAllLabel = 'View All Insights',
  viewAllUrl = '/insights',
}: ArticlesListSectionProps) {
  return (
    <section className="bg-stone-50/70 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mb-10 flex flex-col gap-5 border-b border-slate-200 pb-8 sm:mb-12 sm:flex-row sm:items-end sm:justify-between sm:gap-8 sm:pb-10">
          <div>
            <p className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
              <span className="h-px w-7 bg-amber-600" />
              Knowledge &amp; Guidance
            </p>

            <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              {heading}
            </h2>

            {description ? (
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                {description}
              </p>
            ) : null}
          </div>

          {posts.length > 0 && viewAllLabel && viewAllUrl ? (
            <Link
              href={viewAllUrl}
              className="group inline-flex shrink-0 items-center gap-2 self-start text-sm font-semibold text-amber-800 transition-colors duration-300 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-4 sm:self-auto"
            >
              {viewAllLabel}
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          ) : null}
        </div>

        {posts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
            {posts.map((post) => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-slate-200 bg-white px-6 py-16 text-center shadow-sm sm:py-20">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
              Articles &amp; Updates
            </p>

            <h3 className="mt-4 font-serif text-2xl font-semibold text-slate-900 sm:text-3xl">
              Articles coming soon
            </h3>

            <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-slate-600">
              We&apos;re preparing helpful legal articles and updates. Please
              check back soon.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
