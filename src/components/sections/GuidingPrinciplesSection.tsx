
import type { GuidingPrinciple } from '@/payload-types'

type GuidingPrinciplesSectionProps = {
  principles: GuidingPrinciple[]
  heading?: string
  description?: string
}

export default function GuidingPrinciplesSection({
  principles,
  heading = 'What Guides Us',
  description = 'Our values shape how we work, how we communicate, and how we serve every client.',
}: GuidingPrinciplesSectionProps) {
  if (principles.length === 0) {
    return null
  }

  const headingClass =
  'font-serif text-2xl font-semibold leading-snug tracking-tight text-slate-900 sm:text-3xl lg:text-4xl'

  return (
    <section className="bg-gradient-to-b from-[#faf8f3] to-[#f3f1eb] py-14 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-700 sm:text-xs">
            Our Values
          </p>

          <h2 className={headingClass}>
            {heading}
          </h2>

          <div className="mx-auto mt-6 h-1 w-14 rounded-full bg-gradient-to-r from-amber-500 to-orange-400" />

          {description ? (
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              {description}
            </p>
          ) : null}
        </div>

        <div className="mt-12 grid gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {principles.map((principle, index) => (
            <article
              key={principle.id}
              className="group rounded-sm border border-slate-200/80 bg-white/90 p-6 shadow-sm shadow-slate-900/[0.03] transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/70 hover:shadow-lg hover:shadow-slate-900/[0.06] sm:p-7 lg:p-8"
            >
              <p className="font-serif text-3xl font-semibold tracking-tight text-amber-700 transition-colors duration-300 group-hover:text-amber-600">
                {String(index + 1).padStart(2, '0')}
              </p>

              <h3 className="mt-5 font-serif text-lg font-semibold leading-snug text-slate-900 sm:text-xl">
                {principle.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                {principle.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
