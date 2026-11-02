
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayloadClient } from '@/lib/payload/getPayloadClient'
import CTASection from '@/components/layout/CTASection'
import { RichText } from '@payloadcms/richtext-lexical/react'

import { handleRedirect } from '@/lib/payload/redirects'

type Props = {
  params: Promise<{ slug: string }>
}

async function getPracticeArea(slug: string) {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'practice-areas',
    where: {
      and: [
        { slug: { equals: slug } },
        { _status: { equals: 'published' } },
      ],
    },
    limit: 1,
    depth: 1,
  })
  
  return result.docs[0] ?? null
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params
  const area = await getPracticeArea(slug)

  if (!area) {
    return {
      title: 'Practice Area Not Found | Aurelex Legal',
    }
  }

  const title =
    area.meta?.title ||
    `${area.title} | Aurelex Legal`

  const description =
    area.meta?.description ||
    area.shortDescription ||
    'Explore our legal services and available guidance.'

  const pluginImage =
    typeof area.meta?.image === 'object' &&
    area.meta.image !== null
      ? area.meta.image
      : null

  const image = pluginImage?.url

  return {
    title: { absolute: title },
    description,
    openGraph: {
      title,
      description,
      images: image
        ? [
            {
              url: image,
              alt: area.title,
            },
          ]
        : undefined,
    },
  }
}

export default async function PracticeAreaDetailPage({ params }: Props) {
  const { slug } = await params
  const area = await getPracticeArea(slug)

  if (!area) {
  await handleRedirect(`/practice-areas/${slug}`)
  notFound()
}

  return (
    <>
      <section className="bg-slate-900 py-16 text-white sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <Link
            href="/practice-areas"
            className="mb-8 inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-amber-400"
          >
            <span aria-hidden="true">←</span>
            All Practice Areas
          </Link>

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
            Our Legal Expertise
          </p>

          <h1 className="mt-4 max-w-4xl font-serif text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
            {area.title}
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            {area.shortDescription}
          </p>

          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-3 bg-amber-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-amber-700"
          >
            Contact Our Team
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="py-14 sm:py-20 lg:py-24">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16 lg:px-10">
          <article className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
              Overview
            </p>

            <h2 className="mt-3 font-serif text-3xl font-semibold text-slate-900 sm:text-4xl">
              Legal support tailored to your needs
            </h2>

            <div className="mt-6 h-1 w-16 bg-amber-500" />

            {area.description ? (
              <div className="prose prose-slate mt-8 max-w-none prose-headings:font-serif prose-headings:font-semibold prose-headings:text-slate-900 prose-p:leading-8 prose-a:text-amber-700">
                <RichText data={area.description} />
              </div>
            ) : (
              <p className="mt-8 text-base leading-8 text-slate-600">
                Contact our team to learn more about our{' '}
                {area.title.toLowerCase()} services and how we may be able to
                assist with your legal needs.
              </p>
            )}

            {area.services && area.services.length > 0 && (
              <div className="mt-12">
                <h2 className="font-serif text-2xl font-semibold text-slate-900 sm:text-3xl">
                  How We Can Assist
                </h2>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {area.services.map((item, index) => (
                    <div
                      key={item.id ?? `${area.id}-${index}`}
                      className="flex items-start gap-3 border border-slate-200 bg-white p-5 transition hover:border-amber-400"
                    >
                      <span className="mt-0.5 text-lg text-amber-600">
                        ✓
                      </span>
                      <span className="text-sm leading-7 text-slate-700">
                        {item.service}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </article>

          <aside className="h-fit border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
              Need Legal Guidance?
            </p>

            <h2 className="mt-4 font-serif text-2xl font-semibold leading-snug text-slate-900">
              Let’s discuss your legal needs
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600">
              Reach out to our team to discuss your situation and explore the
              next steps.
            </p>

            <Link
              href="/contact"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Contact Us
              <span aria-hidden="true">→</span>
            </Link>

            <Link
              href="/practice-areas"
              className="mt-4 inline-flex text-sm font-semibold text-amber-700 underline underline-offset-4 hover:text-amber-900"
            >
              Explore All Practice Areas
            </Link>
          </aside>
        </div>
      </section>

      <CTASection
        heading="Need guidance with a legal matter?"
        buttonLabel="Contact Our Team"
        buttonUrl="/contact"
      />
    </>
  )
}
