
import Image from 'next/image'
import RichText from '@/components/RichText/RichText'
import type { Media } from '@/payload-types'

type AboutFirmSectionProps = {
  eyebrow?: string
  heading: string
  image: string | Media
  description: any
  buttonLabel?: string
  buttonUrl?: string
}

export default function AboutFirmSection({
  eyebrow = 'Who We Are',
  heading,
  image,
  description,
  buttonLabel,
  buttonUrl,
}: AboutFirmSectionProps) {
  const imageData =
    typeof image === 'object' && image !== null ? image : null

  return (
    <section className="overflow-hidden bg-gradient-to-b from-white to-[#faf8f3] py-14 sm:py-20 lg:py-24">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-10">
        <div className="relative lg:pr-3">
          {imageData?.url ? (
            <div className="relative min-h-[320px] overflow-hidden rounded-sm bg-slate-100 shadow-xl shadow-slate-900/[0.08] sm:min-h-[440px]">
              <Image
                src={imageData.url}
                alt={imageData.alt || 'Our law firm'}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-[1.02]"
              />
            </div>
          ) : (
            <div className="flex min-h-[320px] items-center justify-center rounded-sm border border-slate-200 bg-gradient-to-br from-stone-100 to-stone-200 text-sm text-slate-500 sm:min-h-[440px]">
              About our firm
            </div>
          )}

          <div className="absolute -bottom-3 -right-3 -z-10 h-1/3 w-1/3 bg-amber-500/20 sm:-bottom-4 sm:-right-4" />
        </div>

        <div className="py-2 lg:py-6">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-700 sm:text-xs">
            {eyebrow}
          </p>

          <h2 className="font-serif text-2xl font-semibold leading-snug tracking-tight text-slate-900 sm:text-3xl lg:text-4xl lg:leading-[1.2]">
            {heading}
          </h2>

          <div className="mt-6 h-1 w-14 rounded-full bg-gradient-to-r from-amber-500 to-orange-400" />

          <div className="mt-6 text-sm leading-8 text-slate-600 sm:text-base">
            {description ? <RichText data={description} /> : "We provide Legal services to help you navigate complex legal matters with confidence and clarity. Our team of experienced attorneys is dedicated to protecting your rights and achieving the best possible outcomes for your case."}
          </div>

          {buttonLabel && buttonUrl ? (
            <a
              href={buttonUrl}
              className="mt-7 inline-flex items-center justify-center rounded-sm border border-slate-800 bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-600 hover:bg-amber-600 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
            >
              {buttonLabel}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  )
}
