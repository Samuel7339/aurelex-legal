
'use client'

import { useState } from 'react'
import type { Faq } from '@/payload-types'

type FAQSectionProps = {
  faqs: Faq[]
  heading?: string
  description?: string
}

const container = 'mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10'

const eyebrow =
  'mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-700'

const headingClass =
  'font-serif text-2xl font-semibold leading-snug text-slate-900 sm:text-3xl lg:text-4xl'

const groups = [
  { value: 'general', title: 'General Questions' },
  { value: 'case-process', title: 'Case & Process' },
]

export default function FAQSection({
  faqs,
  heading = 'How Can We Help You?',
  description = 'Find answers to common questions about our legal services and the legal process.',
}: FAQSectionProps) {
  const [openGeneralFaq, setOpenGeneralFaq] = useState<string | null>(null)
  const [openCaseFaq, setOpenCaseFaq] = useState<string | null>(null)

  if (faqs.length === 0) return null

  return (
    <section id="faq" className="bg-stone-50/70 py-16 sm:py-20 lg:py-24">
      <div className={container}>
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <p className={eyebrow}>{/* Existing text remains unchanged */}Frequently asked questions</p>

          <h2 className={headingClass}>{heading}</h2>

          {description ? (
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              {description}
            </p>
          ) : null}

          <div className="mx-auto mt-7 h-px w-16 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
        </div>

        <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-2 lg:gap-10">
          {groups.map((group) => {
            const groupFaqs = faqs.filter(
              (faq) => faq.category === group.value,
            )

            if (groupFaqs.length === 0) return null

            return (
              <div
                key={group.value}
                className="rounded-lg border border-slate-200/80 bg-white px-5 shadow-sm sm:px-7"
              >
                <h3 className="mb-0 border-b border-slate-200 py-5 font-serif text-lg font-semibold text-slate-900 sm:py-6 sm:text-xl">
                  {group.title}
                </h3>

                <div className="divide-y divide-slate-100">
                  {groupFaqs.map((faq, index) => {
                    const key = `${group.value}-${faq.id}`
                    const isGeneral = group.value === 'general'

                    const isOpen = isGeneral
                      ? openGeneralFaq === key
                      : openCaseFaq === key

                    const setOpenFaq = isGeneral
                      ? setOpenGeneralFaq
                      : setOpenCaseFaq

                    const answerId = `faq-answer-${group.value}-${index}`

                    return (
                      <div key={key}>
                        <button
                          type="button"
                          className="group flex w-full items-center justify-between gap-4 rounded-sm py-5 text-left transition-colors duration-300 hover:text-amber-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-amber-500 sm:py-6"
                          aria-expanded={isOpen}
                          aria-controls={answerId}
                          onClick={() =>
                            setOpenFaq(isOpen ? null : key)
                          }
                        >
                          <span className="text-sm font-medium leading-6 text-slate-800 transition-colors duration-300 group-hover:text-amber-800 sm:text-base">
                            {faq.question}
                          </span>

                          <span
                            className={`flex size-8 shrink-0 items-center justify-center rounded-full border text-lg leading-none transition-all duration-300 ${
                              isOpen
                                ? 'border-amber-700 bg-amber-700 text-white'
                                : 'border-slate-200 bg-stone-50 text-amber-700 group-hover:border-amber-500 group-hover:bg-amber-50'
                            }`}
                            aria-hidden="true"
                          >
                            {isOpen ? '−' : '+'}
                          </span>
                        </button>

                        {isOpen ? (
                          <div
                            id={answerId}
                            className="max-w-2xl pb-6 pr-8 text-sm leading-7 text-slate-600 sm:pr-10"
                          >
                            {faq.answer}
                          </div>
                        ) : null}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
