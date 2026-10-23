
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
    <footer className="bg-[#10233f] text-white">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Firm information */}
          <div>
            <Link href="/" className="text-2xl font-bold tracking-tight">
              {settings.firmName || 'Aurelex Legal'}
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-gray-300">
              {footer.description ||
                'Thoughtful legal guidance and professional representation for individuals and businesses.'}
            </p>
          </div>

          {/* Quick links */}
          <div className='pl-10'>
            <h2 className="text-base font-semibold">Quick Links</h2>

            <ul className="mt-5 space-y-3">
              {(footer.quickLinks ?? []).map((item, index) => (
                <li key={`${item.url}-${index}`}>
                  <Link
                    href={item.url}
                    className="text-sm text-gray-300 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Practice Areas */}
          <div>
            <h2 className="text-base font-semibold">Practice Areas</h2>

            <ul className="mt-5 space-y-3">
              {practiceAreas.map((area) => (
                <li key={area.id}>
                  <Link
                    href={`/practice-areas/${area.slug}`}
                    className="text-sm text-gray-300 transition-colors hover:text-white"
                  >
                    {area.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-base font-semibold">Contact</h2>

            <p className="mt-5 text-sm leading-7 text-gray-300">
              Have a legal question? Contact our team to discuss your needs
              and explore the next steps.
            </p>

            <Link
              href="/contact"
              className="mt-5 inline-block rounded-md bg-orange-400 px-4 py-2.5 text-sm font-semibold text-[#10233f] transition-colors hover:bg-[#f0cf80]"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-white/15 pt-6">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} {settings.firmName || 'Aurelex Legal'}.{' '}
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
