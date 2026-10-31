
import type { Metadata } from 'next'
import { getPageData } from '@/lib/payload/pages'
import PageLayoutRenderer from '@/components/layout/PageLayoutRenderer'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData('practice-areas')

  return {
    title: page?.meta?.title || 'Legal Services',
    description:
      page?.meta?.description ||
      'Explore our areas of legal practice and discover how we can assist you.',
  }
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
