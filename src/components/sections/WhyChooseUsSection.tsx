
type WhyChooseUsSectionProps = {
  eyebrow?: string
  heading?: string
  description?: string
  secondaryDescription?: string
  buttonLabel?: string
  buttonUrl?: string
  highlightText?: string
  statOneValue?: string
  statOneLabel?: string
  statTwoValue?: string
  statTwoLabel?: string
}

const container = 'mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10'
const eyebrowClass =
  'mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700'

export default function WhyChooseUsSection({
  eyebrow = 'Why Choose Us',
  heading = 'Your Success Is Our Legal Commitment',
  description,
  secondaryDescription,
  buttonLabel,
  buttonUrl,
  highlightText,
  statOneValue,
  statOneLabel,
  statTwoValue,
  statTwoLabel,
}: WhyChooseUsSectionProps) {
  return (
    <section id="why-us" className="py-14 sm:py-16 lg:py-20">
      <div
        className={`${container} grid items-center gap-10 lg:grid-cols-2 lg:gap-14`}
      >
        <div>
          <p className={eyebrowClass}>{eyebrow}</p>

          <h2 className="font-serif text-2xl font-semibold leading-snug text-slate-900 sm:text-3xl">
            {heading}
          </h2>

          {description ? (
            <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
              {description}
            </p>
          ) : null}

          {secondaryDescription ? (
            <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
              {secondaryDescription}
            </p>
          ) : null}

          {buttonLabel && buttonUrl ? (
            <a
              className="mt-6 inline-flex items-center justify-center border border-slate-800 px-5 py-2.5 text-sm font-medium text-slate-800 transition hover:bg-slate-900 hover:text-white"
              href={buttonUrl}
            >
              {buttonLabel}
            </a>
          ) : null}
        </div>

        <div className="border border-slate-200 bg-stone-50 p-6 sm:p-8">
          {highlightText ? (
            <p className="text-sm leading-7 text-slate-700 sm:text-base">
              {highlightText}
            </p>
          ) : null}

          <div className="mt-6 grid grid-cols-2 gap-5 border-t border-slate-200 pt-6">
            {statOneValue || statOneLabel ? (
              <div>
                {statOneValue ? (
                  <p className="font-serif text-2xl font-semibold text-slate-900 sm:text-3xl">
                    {statOneValue}
                  </p>
                ) : null}
                {statOneLabel ? (
                  <p className="mt-1 text-xs leading-5 text-slate-600 sm:text-sm">
                    {statOneLabel}
                  </p>
                ) : null}
              </div>
            ) : null}

            {statTwoValue || statTwoLabel ? (
              <div>
                {statTwoValue ? (
                  <p className="font-serif text-2xl font-semibold text-slate-900 sm:text-3xl">
                    {statTwoValue}
                  </p>
                ) : null}
                {statTwoLabel ? (
                  <p className="mt-1 text-xs leading-5 text-slate-600 sm:text-sm">
                    {statTwoLabel}
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
