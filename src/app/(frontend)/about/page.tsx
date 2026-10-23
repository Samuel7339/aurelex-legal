
import { getPageData } from '@/lib/payload/pages'
import PageLayoutRenderer from '@/components/layout/PageLayoutRenderer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | Aurelex Legal',
  description:
    'Learn about Aurelex Legal, our values, and our commitment to providing thoughtful legal guidance and professional representation.',
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
