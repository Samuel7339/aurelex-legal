
import Link from 'next/link'

type CTASectionProps = {
    heading: string
    buttonLabel: string
    buttonUrl: string
}

export default function CTASection({
    heading,
    buttonLabel,
    buttonUrl,
}: CTASectionProps) {
    return (
        <section className="border-y border-amber-500/20 bg-gradient-to-r from-orange-300 via-orange-400 to-amber-400 py-10 sm:py-12 lg:py-14">
            <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-6 px-5 sm:flex-row sm:items-center sm:gap-8 sm:px-8 lg:px-10">
                <h2 className="max-w-3xl font-serif text-lg md:text-xl font-semibold leading-snug tracking-tight text-slate-900 sm:text-2xl lg:text-3xl">
                    {heading}
                </h2>

                <Link
                    href={buttonUrl}
                    className="inline-flex shrink-0 items-center gap-3 rounded-sm border border-slate-900/10 bg-slate-900 px-2 md:px-5 py-2.5 md:py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-400"
                >
                    {buttonLabel}
                    <span aria-hidden="true">→</span>
                </Link>
            </div>
        </section>
    )
}
