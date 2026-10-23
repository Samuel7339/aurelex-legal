
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
  const [openFaq, setOpenFaq] = useState<string | null>(null)

  if (faqs.length === 0) return null

  return (
    <section id="faq" className="py-14 sm:py-16 lg:py-20">
      <div className={container}>
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <p className={eyebrow}>Frequently asked questions</p>

          <h2 className={headingClass}>{heading}</h2>

          {description ? (
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
              {description}
            </p>
          ) : null}
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2 lg:gap-12">
          {groups.map((group) => {
            const groupFaqs = faqs.filter(
              (faq) => faq.category === group.value,
            )

            if (groupFaqs.length === 0) return null

            return (
              <div key={group.value}>
                <h3 className="mb-3 font-serif text-lg font-semibold text-slate-900 sm:text-xl">
                  {group.title}
                </h3>

                <div className="divide-y divide-slate-200/80 border-y border-slate-200">
                  {groupFaqs.map((faq, index) => {
                    const key = `${group.value}-${faq.id}`
                    const isOpen = openFaq === key
                    const answerId = `faq-answer-${group.value}-${index}`

                    return (
                      <div key={key}>
                        <button
                          type="button"
                          className="group flex w-full items-center justify-between gap-4 py-4 text-left transition-colors duration-200 hover:text-amber-800 sm:py-5"
                          aria-expanded={isOpen}
                          aria-controls={answerId}
                          onClick={() =>
                            setOpenFaq(isOpen ? null : key)
                          }
                        >
                          <span className="text-sm font-medium leading-6 text-slate-800 transition-colors group-hover:text-amber-800 sm:text-base">
                            {faq.question}
                          </span>

                          <span
                            className={`flex size-7 shrink-0 items-center justify-center rounded-full border text-lg leading-none transition-all duration-200 ${
                              isOpen
                                ? 'border-amber-700 bg-amber-700 text-white'
                                : 'border-slate-200 text-amber-700 group-hover:border-amber-700'
                            }`}
                            aria-hidden="true"
                          >
                            {isOpen ? '−' : '+'}
                          </span>
                        </button>

                        {isOpen ? (
                          <div
                            id={answerId}
                            className="max-w-2xl pb-5 pr-8 text-sm leading-7 text-slate-600 sm:pr-10"
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
