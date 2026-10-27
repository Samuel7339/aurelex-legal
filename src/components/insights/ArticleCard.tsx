
import Image from 'next/image'
import Link from 'next/link'
import type { Media, Post } from '@/payload-types'

type ArticleCardProps = {
  post: Post
}

export default function ArticleCard({ post }: ArticleCardProps) {
  const image =
    typeof post.featuredImage === 'object' &&
    post.featuredImage !== null &&
    'url' in post.featuredImage
      ? post.featuredImage
      : null

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-amber-400/70 hover:shadow-xl motion-reduce:transform-none motion-reduce:transition-none">
      <Link
        href={`/articles/${post.slug}`}
        className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-gradient-to-br from-slate-100 to-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-amber-500"
        aria-label={`Read ${post.title}`}
      >
        {image?.url ? (
          <Image
            src={image.url}
            alt={image.alt || post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none"
          />
        ) : (
          <span className="font-serif text-3xl font-medium tracking-wide text-slate-400">
            Legal Insights
          </span>
        )}

        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950/20 to-transparent" />
      </Link>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        {post.publishedAt && (
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-700">
            {new Date(post.publishedAt).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        )}

        <h3 className="mt-3 font-serif text-xl font-semibold leading-snug text-slate-900 transition-colors duration-300 group-hover:text-amber-800 sm:text-2xl">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600">
            {post.excerpt}
          </p>
        )}

        <div className="mt-auto border-t border-slate-100 pt-5">
          <Link
            href={`/articles/${post.slug}`}
            className="group/link inline-flex items-center gap-2 text-sm font-semibold text-amber-800 transition-colors duration-300 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-4"
          >
            Read Article
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover/link:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  )
}
