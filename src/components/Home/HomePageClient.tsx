
import type { Page } from '@/payload-types'
import PageLayoutRenderer from '@/components/layout/PageLayoutRenderer'

type HomePageClientProps = {
  homePage: Page | null
}

export default function HomePageClient({
  homePage,
}: HomePageClientProps) {
  if (!homePage) {
    return <main>Home page content is not available.</main>
  }

  return (
    <main className="min-h-screen bg-white font-sans text-slate-700">
      <PageLayoutRenderer layout={homePage.layout} />
    </main>
  )
}
