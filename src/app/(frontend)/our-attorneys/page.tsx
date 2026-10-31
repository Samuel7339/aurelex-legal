
import type { Metadata } from 'next'
import { getPageData } from '@/lib/payload/pages'
import PageLayoutRenderer from '@/components/layout/PageLayoutRenderer'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData('attorneys')

  const title = page?.meta?.title || 'Our Attorneys'
  const description =
    page?.meta?.description ||
    'Meet the legal professionals at Aurelex Legal and learn about their experience and areas of practice.'

  return {
    title,
    description,
  }
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
