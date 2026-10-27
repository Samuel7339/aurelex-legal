
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
    <section id="why-us" className="relative overflow-hidden bg-gradient-to-br from-[#F8F6F1] via-white to-[#F3EEE4] py-16 sm:py-20 lg:py-24">
      <div
        className={`${container} grid items-center gap-10 lg:grid-cols-2 lg:gap-16`}
      >
        <div>
          <p className={eyebrowClass}>{eyebrow}</p>

          <h2 className="max-w-xl font-serif text-2xl font-semibold leading-snug tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            {heading}
          </h2>

          {description ? (
            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              {description}
            </p>
          ) : null}

          {secondaryDescription ? (
            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              {secondaryDescription}
            </p>
          ) : null}

          {buttonLabel && buttonUrl ? (
            <a
              className="mt-7 inline-flex items-center justify-center border border-slate-800 bg-slate-900 px-6 py-3 text-sm font-medium text-white shadow-sm transition duration-300 hover:border-amber-600 hover:bg-amber-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2"
              href={buttonUrl}
            >
              {buttonLabel}
            </a>
          ) : null}
        </div>

        <div className="relative border border-[#E5DCCB] bg-white/80 p-6 shadow-[0_16px_50px_-28px_rgba(15,23,42,0.28)] backdrop-blur-sm transition duration-300 hover:border-amber-300 hover:shadow-[0_22px_55px_-28px_rgba(15,23,42,0.3)] sm:p-9 lg:p-10">
          {highlightText ? (
            <p className="text-sm leading-7 text-slate-700 sm:text-base sm:leading-8">
              {highlightText}
            </p>
          ) : null}

          <div className="mt-7 grid grid-cols-2 gap-5 border-t border-[#E5DCCB] pt-7 sm:mt-8 sm:pt-8">
            {statOneValue || statOneLabel ? (
              <div>
                {statOneValue ? (
                  <p className="font-serif text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                    {statOneValue}
                  </p>
                ) : null}
                {statOneLabel ? (
                  <p className="mt-2 text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">
                    {statOneLabel}
                  </p>
                ) : null}
              </div>
            ) : null}

            {statTwoValue || statTwoLabel ? (
              <div>
                {statTwoValue ? (
                  <p className="font-serif text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                    {statTwoValue}
                  </p>
                ) : null}
                {statTwoLabel ? (
                  <p className="mt-2 text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">
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
