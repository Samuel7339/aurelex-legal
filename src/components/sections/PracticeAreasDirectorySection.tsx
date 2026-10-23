import Link from 'next/link'
import type { PracticeArea } from '@/payload-types'

type PracticeAreasDirectoryProps = {
  practiceAreas: PracticeArea[]
}

export default function PracticeAreasDirectory({
  practiceAreas,
}: PracticeAreasDirectoryProps) {
  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mb-10 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
            How We Can Help
          </p>

          <h2 className="mt-3 font-serif text-3xl font-semibold text-slate-900 sm:text-4xl">
            Our Legal Services
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            We provide legal guidance and representation across a range
            of practice areas, with an approach focused on your needs
            and circumstances.
          </p>
        </div>

        {practiceAreas.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {practiceAreas.map((area) => (
              <article
                key={area.id}
                className="group border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-amber-400 hover:shadow-lg sm:p-8"
              >
                <div className="flex size-12 items-center justify-center rounded-xl bg-amber-50 font-serif text-2xl text-amber-700">
                  §
                </div>

                <h3 className="mt-6 font-serif text-xl font-semibold text-slate-900 sm:text-2xl">
                  {area.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {area.shortDescription}
                </p>

                {area.services && area.services.length > 0 && (
                  <ul className="mt-5 space-y-2 border-t border-slate-200 pt-5">
                    {area.services.map((item, index) => (
                      <li
                        key={item.id ?? `${area.id}-${index}`}
                        className="flex items-start gap-2 text-sm text-slate-600"
                      >
                        <span className="mt-0.5 text-amber-600">✓</span>
                        <span>{item.service}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <Link
                  href={`/practice-areas/${area.slug}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-amber-700 underline underline-offset-4 transition hover:text-amber-900"
                >
                  Explore Practice Area
                  <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="border border-slate-200 bg-slate-50 px-6 py-12 text-center">
            <h3 className="font-serif text-xl font-semibold text-slate-900">
              Practice areas coming soon
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Please check back soon for information about our legal services.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}