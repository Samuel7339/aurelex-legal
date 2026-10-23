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
        <section className="py-8 sm:py-10 bg-orange-400/90">
            <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-4 px-5 sm:flex-row sm:items-center sm:px-8 lg:px-10">
                <h2 className="font-serif text-xl font-semibold leading-snug text-slate-900 sm:text-2xl">
                    {heading}
                </h2>

                <Link
                    href={buttonUrl}
                    className="inline-flex shrink-0 items-center gap-2 bg-amber-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-amber-700"
                >
                    {buttonLabel}
                    <span aria-hidden="true">→</span>
                </Link>
            </div>
        </section>
    )
}