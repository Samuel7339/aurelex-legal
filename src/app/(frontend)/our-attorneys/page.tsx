
import type { Metadata } from 'next'
import { getPageData } from '@/lib/payload/pages'
import PageLayoutRenderer from '@/components/layout/PageLayoutRenderer'

export const metadata: Metadata = {
  title: 'Our Attorneys | Aurelex',
  description:
    'Meet the legal professionals at Aurelex Legal and learn about their experience and areas of practice.',
}

export default async function OurAttorneysPage() {
  const page = await getPageData('attorneys')

  if (!page) {
    return <main>Attorneys page content is not available.</main>
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <PageLayoutRenderer
        layout={page.layout}
        pageSlug="attorneys"
      />
    </main>
  )
}
