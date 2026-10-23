
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
    <article className="group flex h-full flex-col overflow-hidden border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl">
      <Link
        href={`/articles/${post.slug}`}
        className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-slate-100"
        aria-label={`Read ${post.title}`}
      >
        {image?.url ? (
          <Image
            src={image.url}
            alt={image.alt || post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <span className="font-serif text-3xl text-slate-400">
            Legal Insights
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        {post.publishedAt && (
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
            {new Date(post.publishedAt).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        )}

        <h3 className="mt-3 font-serif text-xl font-semibold leading-snug text-slate-900 transition group-hover:text-amber-800 sm:text-2xl">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600">
            {post.excerpt}
          </p>
        )}

        <div className="mt-auto pt-6">
          <Link
            href={`/articles/${post.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700 underline underline-offset-4 transition hover:text-amber-900"
          >
            Read Article
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  )
}
