
'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Media } from '@/payload-types'

type HeroSlide = {
  eyebrow?: string | null
  heading?: string | null
  description?: string | null
  primaryButtonLabel?: string | null
  primaryButtonUrl?: string | null
  primaryButtonDestinationType?: 'page' | 'custom' | null
  primaryButtonSelectedPage?: string | null
  secondaryButtonLabel?: string | null
  secondaryButtonUrl?: string | null
  secondaryButtonDestinationType?: 'page' | 'custom' | null
  secondaryButtonSelectedPage?: string | null
  image?: string | Media | null
}

type HomeHeroSectionProps = {
  slides: HeroSlide[]
}

const container = 'mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10'

export default function HomeHeroSection({
  slides,
}: HomeHeroSectionProps) {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isChanging, setIsChanging] = useState(false)

  const currentSlide = slides[activeSlide] ?? slides[0]

  const heroImage =
    currentSlide?.image && typeof currentSlide.image === 'object'
      ? currentSlide.image
      : null

  const primaryButtonUrl =
    currentSlide?.primaryButtonDestinationType === 'page'
      ? currentSlide.primaryButtonSelectedPage || undefined
      : currentSlide?.primaryButtonUrl || undefined

  const secondaryButtonUrl =
    currentSlide?.secondaryButtonDestinationType === 'page'
      ? currentSlide.secondaryButtonSelectedPage || undefined
      : currentSlide?.secondaryButtonUrl || undefined

  const changeSlide = (direction: 'previous' | 'next') => {
    if (isChanging || slides.length <= 1) return

    setIsChanging(true)

    setTimeout(() => {
      setActiveSlide((current) =>
        direction === 'previous'
          ? current === 0
            ? slides.length - 1
            : current - 1
          : current === slides.length - 1
            ? 0
            : current + 1,
      )

      setIsChanging(false)
    }, 180)
  }

  const previousSlide = () => {
    changeSlide('previous')
  }

  const nextSlide = () => {
    changeSlide('next')
  }

  return (
    <section
      id="home"
      className="overflow-hidden bg-gradient-to-br from-[#10233f] via-[#142c49] to-[#0b192d] text-white"
    >
      <div
        className={`${container} grid min-h-[560px] items-center gap-10 py-14 sm:py-16 lg:grid-cols-2 lg:gap-14 lg:py-20 xl:py-24`}
      >
        <div className="max-w-2xl">
          <div
            className={`transition-opacity duration-500 ease-in-out ${
              isChanging ? 'opacity-75' : 'opacity-100'
            }`}
          >
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-300 sm:mb-6 sm:text-xs">
              {currentSlide?.eyebrow || 'Your rights. Our mission.'}
            </p>

            <h1 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-[46px] lg:leading-[1.15] xl:text-[52px]">
              {currentSlide?.heading ||
                'Trusted Legal Guidance for What Matters Most'}
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:mt-6 sm:text-base sm:leading-8 lg:text-[17px]">
              {currentSlide?.description ||
                'At Aurelex Law Group, we combine deep legal knowledge with a client-first approach to protect your future and provide peace of mind.'}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
              {currentSlide?.primaryButtonLabel && primaryButtonUrl && (
                <a
                  href={primaryButtonUrl}
                  className="inline-flex min-h-12 items-center justify-center rounded-sm border border-amber-500 bg-amber-500 px-6 py-3 text-sm font-semibold text-[#10233f] shadow-md shadow-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-300 hover:bg-amber-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#10233f]"
                >
                  {currentSlide.primaryButtonLabel}
                </a>
              )}

              {currentSlide?.secondaryButtonLabel && secondaryButtonUrl && (
                <a
                  href={secondaryButtonUrl}
                  className="inline-flex min-h-12 items-center justify-center rounded-sm border border-white/30 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-amber-300/80 hover:bg-white/[0.06] hover:text-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#10233f]"
                >
                  {currentSlide.secondaryButtonLabel}
                </a>
              )}
            </div>
          </div>

          <div className="mt-8 border-l-2 border-amber-400 pl-5 sm:mt-10">
            <strong className="block font-serif text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              25+
            </strong>
            <span className="mt-1.5 block text-sm leading-6 text-slate-300">
              Years of Combined Legal Experience
            </span>
          </div>

          {/* {slides.length > 1 && (
            <div className="mt-8 flex items-center gap-3">
              {slides.map((slide, index) => (
                <button
                  key={`${slide.heading}-${index}`}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Show slide ${index + 1}`}
                  aria-pressed={activeSlide === index}
                  className={`h-3 rounded-full transition-all ${
                    activeSlide === index
                      ? 'w-9 bg-amber-400'
                      : 'w-3 bg-slate-500 hover:bg-slate-300'
                  }`}
                />
              ))}
            </div>
          )} */}
        </div>

        <div className="relative h-[300px] w-full overflow-hidden rounded-sm border border-white/15 bg-slate-800 shadow-2xl shadow-black/25 sm:h-[400px] lg:h-[480px]">
          <div
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              isChanging ? 'opacity-75' : 'opacity-100'
            }`}
          >
            {heroImage?.url ? (
              <Image
                src={heroImage.url}
                alt={
                  heroImage.alt ||
                  currentSlide?.heading ||
                  'Legal services'
                }
                fill
                priority={activeSlide === 0}
                className="object-cover"
                sizes="(max-width: 1023px) 100vw, 50vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center px-6 text-center text-sm leading-7 text-slate-300">
                Add an image to this hero slide in Payload Admin.
              </div>
            )}
          </div>

          {slides.length > 1 && (
            <>
              <button
                type="button"
                onClick={previousSlide}
                aria-label="Previous slide"
                className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-slate-950/75 text-2xl text-white shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:border-amber-300 hover:bg-amber-500 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
              >
                &#8249;
              </button>

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next slide"
                className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-slate-950/75 text-2xl text-white shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:border-amber-300 hover:bg-amber-500 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
              >
                &#8250;
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
