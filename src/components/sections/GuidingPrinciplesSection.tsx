
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
  'font-serif text-2xl font-semibold leading-snug text-slate-900 sm:text-3xl lg:text-4xl'

  return (
    <section className="bg-slate-50 py-14 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
            Our Values
          </p>

          <h2 className={headingClass}>
            {heading}
          </h2>

          <div className="mx-auto mt-6 h-1 w-16 bg-amber-500" />

          {description ? (
            <p className="mt-6 text-sm leading-7 text-slate-600 sm:text-base">
              {description}
            </p>
          ) : null}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((principle, index) => (
            <article
              key={principle.id}
              className="border border-slate-200 bg-white p-6 transition hover:border-amber-500 sm:p-8"
            >
              <p className="font-serif text-3xl font-semibold text-amber-700">
                {String(index + 1).padStart(2, '0')}
              </p>

              <h3 className="mt-5 font-serif text-xl font-semibold text-slate-900">
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
