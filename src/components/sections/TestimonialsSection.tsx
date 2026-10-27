
import type { Testimonial } from '@/payload-types'

type TestimonialsSectionProps = {
  testimonials: Testimonial[]
  heading?: string
  description?: string
}

const container = 'mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10'

const eyebrow =
  'mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-700'

const headingClass =
  'font-serif text-2xl font-semibold leading-snug tracking-tight text-slate-900 sm:text-3xl lg:text-4xl'

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
      className="bg-gradient-to-b from-[#faf8f3] to-[#f3f1eb] py-14 sm:py-16 lg:py-20"
    >
      <div className={container}>
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <p className={eyebrow}>Client stories</p>

          <h2 className={headingClass}>{heading}</h2>

          {description ? (
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              {description}
            </p>
          ) : null}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7">
          {testimonials.map((testimonial) => (
            <article
              className="group flex h-full flex-col rounded-sm border border-slate-200/80 bg-white/95 p-6 shadow-sm shadow-slate-900/[0.03] transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/70 hover:shadow-lg hover:shadow-slate-900/[0.06] sm:p-7 lg:p-8"
              key={testimonial.id}
            >
              <span
                aria-hidden="true"
                className="mb-3 font-serif text-4xl leading-none text-amber-600/80 transition-colors duration-300 group-hover:text-amber-600"
              >
                “
              </span>

              <p className="flex-1 font-serif text-base leading-7 text-slate-700 sm:text-[15px] sm:leading-7">
                “{testimonial.testimonial}”
              </p>

              <div className="mt-6 border-t border-slate-100 pt-5">
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
