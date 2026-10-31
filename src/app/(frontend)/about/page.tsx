
import type { Metadata } from 'next'
import { getPageData } from '@/lib/payload/pages'
import PageLayoutRenderer from '@/components/layout/PageLayoutRenderer'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData('about')

  return {
    title: page?.meta?.title || 'About Us | Aurelex Legal',
    description:
      page?.meta?.description ||
      'Learn about Aurelex Legal, our values, and our commitment to providing thoughtful legal guidance and professional representation.',
  }
}

export default async function AboutPage() {
  const aboutPage = await getPageData('about')

  if (!aboutPage) {
    return <main>About page content is not available.</main>
  }

  return (
    <main>
      <PageLayoutRenderer layout={aboutPage.layout} />
    </main>
  )
}
