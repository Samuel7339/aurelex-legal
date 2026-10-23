
import type { PracticeArea } from '@/payload-types'
import Link from 'next/link'

type PracticeAreasSectionProps = {
  heading?: string
  practiceAreas: PracticeArea[]
}

const container = 'mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10'

const eyebrow =
  'mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700'

const sectionHeading =
  'font-serif text-2xl font-semibold leading-snug text-slate-900 sm:text-3xl lg:text-4xl'

  
export default function PracticeAreasSection({
  heading,
  practiceAreas,
}: PracticeAreasSectionProps) {
  return (
    <section
      id="practice-areas"
      className="bg-stone-50 py-16 sm:py-20 lg:py-24"
    >
      <div className={container}>
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className={eyebrow}>Our expertise</p>

          <h2 className={sectionHeading}>
            {heading || 'Areas of Practice'}
          </h2>

          <p className="mt-5 leading-7 text-slate-600">
            Comprehensive legal counsel tailored to your needs, backed by
            experience and a commitment to protecting what matters most.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {practiceAreas.map((area, index) => (
            <a
              href={`/practice-areas/${area.slug}`}
              className="group flex min-h-52 flex-col border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-amber-500 hover:shadow-md sm:p-7"
              key={area.id}
            >
              <span className="text-xs font-semibold tracking-[0.18em] text-amber-700">
                {String(index + 1).padStart(2, '0')}
              </span>

              <h3 className="mt-5 font-serif text-xl font-semibold text-slate-900 group-hover:text-amber-700">
                {area.title}
              </h3>

              <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
                {typeof area.shortDescription === 'string' &&
                area.shortDescription
                  ? area.shortDescription
                  : 'Learn more about our legal services.'}
              </p>

              <span className="mt-5 text-sm font-semibold text-slate-800 group-hover:text-amber-700">
                Learn more
              </span>
            </a>
          ))}
        </div>
        <div className="mt-12 text-center">
                    <Link
                      href='/practice-areas'
                      className="inline-block border border-gray-300 rounded-xl px-7 py-3 font-semibold text-gray-500 transition hover:bg-gray-700 hover:text-white"
                    >
                      View All Practice Areas
                    </Link>
                  </div>
      </div>
    </section>
  )
}
