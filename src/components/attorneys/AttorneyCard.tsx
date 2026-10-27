
import Image from 'next/image'
import Link from 'next/link'
import type { Media } from '@/payload-types'

type AttorneyCardData = {
    id: string
    name: string
    slug: string
    designation: string
    photo?: string | Media | null
    shortDescription?: string | null
}

type AttorneyCardProps = {
    attorney: AttorneyCardData
}

export default function AttorneyCard({
    attorney,
}: AttorneyCardProps) {
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
        <article className="group overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-amber-400/70 hover:shadow-xl motion-reduce:transform-none motion-reduce:transition-none">
            <div className="relative flex h-64 items-center justify-center overflow-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 sm:h-72">
                {photo?.url ? (
                    <Image
                        src={photo.url}
                        alt={photo.alt || attorney.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none"
                    />
                ) : (
                    <span className="font-serif text-5xl font-semibold tracking-wider text-amber-400">
                        {initials}
                    </span>
                )}

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/35 to-transparent" />
            </div>

            <div className="p-6 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
                    {attorney.designation}
                </p>

                <h3 className="mt-3 font-serif text-xl font-semibold leading-snug text-slate-900 transition-colors duration-300 group-hover:text-amber-800 sm:text-2xl">
                    {attorney.name}
                </h3>

                {attorney.shortDescription && (
                    <p className="mt-4 border-t border-slate-200 pt-4 text-sm leading-7 text-slate-600">
                        {attorney.shortDescription}
                    </p>
                )}

                <Link
                    href={`/our-attorneys/${attorney.slug}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-amber-700 transition-colors duration-300 hover:text-amber-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
                >
                    View Profile
                    <span
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                        →
                    </span>
                </Link>
            </div>
        </article>
    )
}
