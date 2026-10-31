
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAttorneyBySlug } from '@/lib/payload/attorneys'
import RichText from '@/components/RichText/RichText'

import { handleRedirect } from '@/lib/payload/redirects'

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({
    params,
}: Props): Promise<Metadata> {
    const { slug } = await params
    const attorney = await getAttorneyBySlug(slug)

    if (!attorney) {
        return {
            title: 'Attorney Not Found | Aurelex Legal',
        }
    }

    const title =
        attorney.meta?.title ||
        `${attorney.name} | Aurelex Legal`

    const description =
        attorney.meta?.description ||
        attorney.shortDescription ||
        'Learn about our legal professionals and their experience.'

    const pluginImage =
        typeof attorney.meta?.image === 'object' &&
            attorney.meta.image !== null
            ? attorney.meta.image
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
                        alt: attorney.name,
                    },
                ]
                : undefined,
        },
    }
}

export default async function AttorneyProfilePage({ params }: Props) {
    const { slug } = await params
    const attorney = await getAttorneyBySlug(slug)

    if (!attorney) {
        await handleRedirect(`/our-attorneys/${slug}`)
        notFound()
    }

    const photo =
        typeof attorney.photo === 'object' && attorney.photo !== null
            ? attorney.photo
            : null

    const initials = attorney.name
        .trim()
        .split(/\s+/)
        .map((part) => part[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()

    return (
        <main className="min-h-screen bg-slate-50">
            <section className="bg-slate-900 px-5 py-16 text-white sm:px-8 md:py-20">
                <div className="mx-auto max-w-7xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
                        Our Legal Team
                    </p>

                    <h1 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">
                        {attorney.name}
                    </h1>

                    <p className="mt-4 text-lg font-medium text-amber-400">
                        {attorney.designation}
                    </p>

                    {attorney.shortDescription && (
                        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                            {attorney.shortDescription}
                        </p>
                    )}
                </div>
            </section>

            <section className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:py-16 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-16 lg:px-10">
                <aside>
                    <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950">
                        {photo?.url ? (
                            <Image
                                src={photo.url}
                                alt={photo.alt || attorney.name}
                                fill
                                sizes="(max-width: 1024px) 100vw, 320px"
                                className="object-contain object-center"
                            />
                        ) : (
                            <span className="font-serif text-6xl font-semibold text-amber-400">
                                {initials}
                            </span>
                        )}
                    </div>

                    <div className="mt-6 border border-slate-200 bg-white p-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">
                            Role
                        </p>

                        <h2 className="mt-2 font-serif text-xl font-semibold text-slate-900">
                            {attorney.designation}
                        </h2>

                        {attorney.practiceAreas &&
                            attorney.practiceAreas.length > 0 && (
                                <div className="mt-6 border-t border-slate-200 pt-5">
                                    <h3 className="font-serif text-lg font-semibold text-slate-900">
                                        Practice Areas
                                    </h3>

                                    <ul className="mt-4 space-y-3">
                                        {attorney.practiceAreas.map((area, index) => {
                                            const practiceArea =
                                                typeof area === 'object' && area !== null
                                                    ? area
                                                    : null

                                            if (!practiceArea) {
                                                return null
                                            }

                                            return (
                                                <li
                                                    key={practiceArea.id || index}
                                                    className="border-b border-slate-100 pb-3 text-sm leading-6 text-slate-600"
                                                >
                                                    {practiceArea.title}
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            )}
                    </div>
                </aside>

                <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                        About the Attorney
                    </p>

                    <h2 className="mt-3 font-serif text-3xl font-semibold text-slate-900 sm:text-4xl">
                        Biography
                    </h2>

                    {attorney.bio ? (
                        <div className="mt-6 leading-8 text-slate-700">
                            <RichText data={attorney.bio} />
                        </div>
                    ) : (
                        <p className="mt-6 leading-8 text-slate-500">
                            Biography details will be available soon.
                        </p>
                    )}

                    {attorney.email && (
                        <a
                            href={`mailto:${attorney.email}`}
                            className="mt-8 inline-flex bg-amber-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-amber-400"
                        >
                            Contact Attorney
                        </a>
                    )}

                    <div className="mt-8 border-t border-slate-200 pt-6">
                        <Link
                            href="/our-attorneys"
                            className="font-semibold text-amber-700 underline underline-offset-4 transition hover:text-amber-900"
                        >
                            ← Back to Our Attorneys
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}
