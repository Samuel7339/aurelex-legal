
import type { Testimonial } from '@/payload-types'

type TestimonialsSectionProps = {
  testimonials: Testimonial[]
  heading?: string
  description?: string
}

const container = 'mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10'

const eyebrow =
  'mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-700'

const headingClass =
  'font-serif text-2xl font-semibold leading-snug text-slate-900 sm:text-3xl lg:text-4xl'

export default function TestimonialsSection({
  testimonials,
  heading = 'Testimonials',
  description = 'We measure our work by the trust our clients place in us.',
}: TestimonialsSectionProps) {
  if (testimonials.length === 0) {
    return null
  }

  return (
    <section
      id="testimonials"
      className="bg-stone-50 py-14 sm:py-16 lg:py-20"
    >
      <div className={container}>
        <div className="mx-auto mb-9 max-w-2xl text-center sm:mb-11">
          <p className={eyebrow}>Client stories</p>

          <h2 className={headingClass}>{heading}</h2>

          {description ? (
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
              {description}
            </p>
          ) : null}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              className="flex h-full flex-col rounded-sm border border-slate-200/80 bg-white p-5 transition-colors duration-200 hover:border-amber-700/40 sm:p-6 lg:p-7"
              key={testimonial.id}
            >
              <p className="flex-1 font-serif text-base leading-7 text-slate-700 sm:text-[15px] sm:leading-7">
                “{testimonial.testimonial}”
              </p>

              <div className="mt-6 border-t border-slate-100 pt-4">
                <p className="text-sm font-semibold text-slate-900 sm:text-base">
                  {testimonial.clientName}
                </p>

                {testimonial.role ? (
                  <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                    {testimonial.role}
                  </p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
