
import Link from 'next/link'
import { getFooterData } from '@/lib/payload/globals'
import { getPayloadClient } from '@/lib/payload/getPayloadClient'
import { getAllPracticeAreas } from '@/lib/payload/practiceAreas'
import { getSiteSettings } from '@/lib/payload/globals'

export default async function Footer() {
  const [footer, payload, practiceAreas, settings] = await Promise.all([
    getFooterData(),
    getPayloadClient(),
    getAllPracticeAreas(),
    getSiteSettings(),
  ])

  // const practiceAreas = await payload.find({
  //   collection: 'practice-areas',
  //   where: {
  //     // Only show published practice areas.
  //     _status: {
  //       equals: 'published',
  //     },
  //   },
  //   limit: 8,
  //   sort: 'title',
  //   depth: 0,
  // })

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#10233f] via-[#132b49] to-[#0b192d] text-white">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-4 lg:gap-x-10 lg:gap-y-12">
          {/* Firm information */}
          <div>
            <Link
              href="/"
              className="inline-block text-2xl font-semibold tracking-tight text-white transition-colors duration-300 hover:text-amber-300 sm:text-[26px]"
            >
              {settings.firmName || 'Aurelex Legal'}
            </Link>

            <div className="mt-4 h-px w-12 bg-gradient-to-r from-amber-300 to-amber-300/10" />

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-300">
              {footer.description ||
                'Thoughtful legal guidance and professional representation for individuals and businesses.'}
            </p>
          </div>

          {/* Quick links */}
          <div className="sm:pl-4 lg:pl-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-white sm:text-[13px]">
              Quick Links
            </h2>

            <div className="mt-4 h-px w-9 bg-amber-400/80" />

            <ul className="mt-5 space-y-3.5">
              {(footer.quickLinks ?? []).map((item, index) => (
                <li key={`${item.url}-${index}`}>
                  <Link
                    href={item.url}
                    className="inline-flex text-sm leading-6 text-slate-300 transition-colors duration-200 hover:text-amber-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        
          {/* Practice Areas */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-white sm:text-[13px]">
              Practice Areas
            </h2>

            <div className="mt-4 h-px w-9 bg-amber-400/80" />

            <ul className="mt-5 space-y-3.5">
              {practiceAreas.slice(0, 5).map((area) => (
                <li key={area.id}>
                  <Link
                    href={`/practice-areas/${area.slug}`}
                    className="inline-flex text-sm leading-6 text-slate-300 transition-colors duration-200 hover:text-amber-300"
                  >
                    {area.title}
                  </Link>
                </li>
              ))}

              <Link
                href="/practice-areas"
                className="inline-flex text-sm leading-6 text-slate-300 transition-colors duration-200 hover:text-amber-300"
              >
                View All Practice Areas

              </Link>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-white sm:text-[13px]">
              Contact
            </h2>

            <div className="mt-4 h-px w-9 bg-amber-400/80" />

            <p className="mt-5 text-sm leading-7 text-slate-300">
              Have a legal question? Contact our team to discuss your needs
              and explore the next steps.
            </p>

            <Link
              href="/contact"
              className="mt-6 inline-flex items-center justify-center rounded-lg border border-amber-300/70 bg-amber-400 px-5 py-3 text-sm font-semibold text-[#10233f] shadow-sm shadow-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-200 hover:bg-amber-300 hover:shadow-lg hover:shadow-black/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#10233f]"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-14 border-t border-white/10 pt-6 sm:mt-16 sm:pt-7">
          <p className="text-xs leading-6 text-slate-400 sm:text-sm">
            © {new Date().getFullYear()} {settings.firmName || 'Aurelex Legal'}.{' '}
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
