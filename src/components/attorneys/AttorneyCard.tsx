
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
        <article className="group overflow-hidden border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="relative flex h-64 items-center justify-center overflow-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950">
                {photo?.url ? (
                    <Image
                        src={photo.url}
                        alt={photo.alt || attorney.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                    />
                ) : (
                    <span className="font-serif text-5xl font-semibold tracking-wider text-amber-400">
                        {initials}
                    </span>
                )}
            </div>

            <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">
                    {attorney.designation}
                </p>

                <h3 className="mt-3 font-serif text-2xl font-semibold text-slate-900">
                    {attorney.name}
                </h3>

                {attorney.shortDescription && (
                    <p className="mt-4 border-t border-slate-200 pt-4 text-sm leading-7 text-slate-600">
                        {attorney.shortDescription}
                    </p>
                )}

                <Link
                    href={`/our-attorneys/${attorney.slug}`}
                    className="mt-5 inline-flex items-center gap-2 font-semibold text-amber-700 underline underline-offset-4 transition hover:text-amber-900"
                >
                    View Profile
                    <span aria-hidden="true">→</span>
                </Link>
            </div>
        </article>
    )
}
