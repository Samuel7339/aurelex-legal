
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'

import { getPostBySlug } from '@/lib/payload/posts'
import CTASection from '@/components/layout/CTASection'
import type { Media } from '@/payload-types'

type ArticlePageProps = {
    params: Promise<{
        slug: string
    }>
}

export async function generateMetadata({ params }: ArticlePageProps) {
    const { slug } = await params
    const article = await getPostBySlug(slug)

    if (!article) {
        return {
            title: 'Article Not Found | Aurelex',
            robots: {
                index: false,
                follow: false,
            },
        }
    }

    const description =
        article.excerpt ||
        `Read ${article.title} from Aurelex's legal insights.`

    const image =
        typeof article.featuredImage === 'object' &&
            article.featuredImage !== null
            ? (article.featuredImage as Media)
            : null

    return {
        title: `${article.title} | Aurelex Legal`,
        description,
        openGraph: {
            title: article.title,
            description,
            type: 'article' as const,
            ...(article.publishedAt
                ? { publishedTime: article.publishedAt }
                : {}),
            ...(image?.url
                ? {
                    images: [
                        {
                            url: image.url,
                            alt: image.alt || article.title,
                        },
                    ],
                }
                : {}),
        },
    }
}

export default async function ArticleDetailPage({
    params,
}: ArticlePageProps) {
    const { slug } = await params
    const article = await getPostBySlug(slug)

    if (!article) {
        notFound()
    }

    const image =
        typeof article.featuredImage === 'object' &&
            article.featuredImage !== null
            ? (article.featuredImage as Media)
            : null

    const formattedDate = article.publishedAt
        ? new Date(article.publishedAt).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })
        : null

    return (
        <>
            <article>
                <header className="bg-slate-900 py-14 text-white sm:py-20">
                    <div className="mx-auto w-full max-w-4xl px-5 sm:px-8">
                        <Link
                            href="/articles"
                            className="inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-amber-400"
                        >
                            <span aria-hidden="true">←</span>
                            All Articles
                        </Link>

                        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
                            Legal Insights
                        </p>

                        <h1 className="mt-4 font-serif text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                            {article.title}
                        </h1>

                        {formattedDate && (
                            <p className="mt-5 text-sm text-slate-300">
                                Published on {formattedDate}
                            </p>
                        )}

                        {article.excerpt && (
                            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                                {article.excerpt}
                            </p>
                        )}
                    </div>
                </header>

                <div className="mx-auto w-full max-w-4xl px-5 py-12 sm:px-8 sm:py-16">
                    {image?.url && (
                        <div className="relative mb-10 aspect-[16/9] overflow-hidden bg-slate-100">
                            <Image
                                src={image.url}
                                alt={image.alt || article.title}
                                fill
                                priority
                                sizes="(max-width: 896px) 100vw, 896px"
                                className="object-cover"
                            />
                        </div>
                    )}

                    <div className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:font-semibold prose-headings:text-slate-900 prose-a:text-amber-700 prose-a:underline prose-strong:text-slate-900">
                        {article.content && (
                            <RichText data={article.content} />
                        )}
                    </div>

                    <div className="mt-12 border-t border-slate-200 pt-6">
                        <Link
                            href="/articles"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700 transition hover:text-amber-900"
                        >
                            <span aria-hidden="true">←</span>
                            Back to All Articles
                        </Link>
                    </div>
                </div>
            </article>

            <CTASection
                heading="Have a legal question?"
                buttonLabel="Contact Our Team"
                buttonUrl="/contact"
            />
        </>
    )
}
