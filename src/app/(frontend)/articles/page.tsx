
import type { Metadata } from 'next'
import { getPageData } from '@/lib/payload/pages'
import PageLayoutRenderer from '@/components/layout/PageLayoutRenderer'


export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData('insights')

  return {
    title: page?.meta?.title || 'Articles | Aurelex Legal',
    description:
      page?.meta?.description ||
      'Explore legal updates, practical guidance, and perspectives on matters that affect you.',
  }
}

export default async function ArticlesPage() {
  const page = await getPageData('insights')

  if (!page) {
    return <main>Insights page content is not available.</main>
  }

  return (
    <main>
      <PageLayoutRenderer layout={page.layout} pageSlug={page.slug} />
    </main>
  )
}
