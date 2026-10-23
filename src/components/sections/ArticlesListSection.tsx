
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
    <section className="py-14 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
              Knowledge &amp; Guidance
            </p>

            <h2 className="mt-3 font-serif text-3xl font-semibold text-slate-900 sm:text-4xl">
              {heading}
            </h2>

            {description ? (
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                {description}
              </p>
            ) : null}
          </div>

          {posts.length > 0 && viewAllLabel && viewAllUrl ? (
            <Link
              href={viewAllUrl}
              className="text-sm font-semibold text-amber-700 transition hover:text-amber-800"
            >
              {viewAllLabel}
            </Link>
          ) : null}
        </div>

        {posts.length > 0 ? (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="border border-slate-200 bg-slate-50 px-6 py-16 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
              Articles &amp; Updates
            </p>

            <h3 className="mt-3 font-serif text-2xl font-semibold text-slate-900">
              Articles coming soon
            </h3>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-slate-600">
              We&apos;re preparing helpful legal articles and updates. Please
              check back soon.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
