
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
  secondaryButtonLabel?: string | null
  secondaryButtonUrl?: string | null
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

  const currentSlide = slides[activeSlide] ?? slides[0]

  const heroImage =
    currentSlide?.image && typeof currentSlide.image === 'object'
      ? currentSlide.image
      : null

  const previousSlide = () => {
    setActiveSlide((current) =>
      current === 0 ? slides.length - 1 : current - 1,
    )
  }

  const nextSlide = () => {
    setActiveSlide((current) =>
      current === slides.length - 1 ? 0 : current + 1,
    )
  }

  return (
    <section id="home" className="bg-slate-900 text-white">
      <div
        className={`${container} grid min-h-[560px] items-center gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:gap-12 lg:py-20`}
      >
        <div className="max-w-2xl">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">
            {currentSlide?.eyebrow || 'Your rights. Our mission.'}
          </p>

          <h1 className="font-serif text-2xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
            {currentSlide?.heading ||
              'Trusted Legal Guidance for What Matters Most'}
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
            {currentSlide?.description ||
              'At Aurelex Law Group, we combine deep legal knowledge with a client-first approach to protect your future and provide peace of mind.'}
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <a
              href={currentSlide?.primaryButtonUrl || '#contact'}
              className="inline-flex min-h-12 items-center justify-center bg-amber-600 px-6 py-3 font-semibold text-white transition hover:bg-amber-700"
            >
              {currentSlide?.primaryButtonLabel || 'Schedule a Consultation'}
            </a>

            <a
              href={currentSlide?.secondaryButtonUrl || '#about'}
              className="inline-flex min-h-12 items-center justify-center border border-slate-500 px-6 py-3 font-semibold text-white transition hover:border-amber-300 hover:text-amber-300"
            >
              {currentSlide?.secondaryButtonLabel || 'Learn More'}
            </a>
          </div>

          <div className="mt-8 border-l-2 border-amber-500 pl-5">
            <strong className="block font-serif text-3xl text-white">
              25+
            </strong>
            <span className="mt-1 block text-sm text-slate-300">
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

        <div className="relative h-[300px] w-full overflow-hidden border border-white/15 bg-slate-800 sm:h-[400px] lg:h-[480px]">
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
            <div className="flex h-full items-center justify-center px-6 text-center text-slate-300">
              Add an image to this hero slide in Payload Admin.
            </div>
          )}

          {slides.length > 1 && (
            <>
              <button
                type="button"
                onClick={previousSlide}
                aria-label="Previous slide"
                className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-slate-900/75 text-2xl text-white transition hover:bg-amber-600"
              >
                &#8249;
              </button>

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next slide"
                className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-slate-900/75 text-2xl text-white transition hover:bg-amber-600"
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
