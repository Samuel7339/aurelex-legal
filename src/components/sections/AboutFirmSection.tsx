
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
    <section className="py-14 sm:py-20 lg:py-24">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-10">
        <div className="relative">
          {imageData?.url ? (
            <div className="relative min-h-[320px] overflow-hidden bg-slate-100 sm:min-h-[440px]">
              <Image
                src={imageData.url}
                alt={imageData.alt || 'Our law firm'}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex min-h-[320px] items-center justify-center bg-slate-100 text-slate-500 sm:min-h-[440px]">
              About our firm
            </div>
          )}

          <div className="absolute -bottom-3 -right-3 -z-10 h-1/3 w-1/3 bg-amber-500/20 sm:-bottom-4 sm:-right-4" />
        </div>

        <div className="py-2 lg:py-6">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
            {eyebrow}
          </p>

          <h2 className="font-serif text-2xl font-semibold leading-snug text-slate-900 sm:text-3xl lg:text-4xl">
            {heading}
          </h2>

          <div className="mt-6 h-1 w-16 bg-amber-500" />

          <div className="mt-6 text-sm leading-8 text-slate-600 sm:text-base">
            {description ? <RichText data={description} /> : "We provide Legal services to help you navigate complex legal matters with confidence and clarity. Our team of experienced attorneys is dedicated to protecting your rights and achieving the best possible outcomes for your case."}
          </div>

          {buttonLabel && buttonUrl ? (
            <a
              href={buttonUrl}
              className="mt-6 inline-flex items-center justify-center border border-slate-800 px-5 py-2.5 text-sm font-medium text-slate-800 transition hover:bg-slate-900 hover:text-white"
            >
              {buttonLabel}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  )
}
