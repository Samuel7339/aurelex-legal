import { getPageData } from '@/lib/payload/pages'
import PageLayoutRenderer from '@/components/layout/PageLayoutRenderer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Legal Services | Aurelex',
  description:
    'Explore our areas of legal practice and discover how we can assist you.',
}

export default async function PracticeAreasPage() {
  const page = await getPageData('practice-areas')

  if (!page) {
    return <main>Practice Areas page content is not available.</main>
  }

  return (
    <main>
      <PageLayoutRenderer layout={page.layout} />
    </main>
  )
}