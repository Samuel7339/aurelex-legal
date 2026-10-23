
import { getHomePageData } from '@/lib/payload/pages'
import HomePageClient from '@/components/Home/HomePageClient'

export default async function Page() {
  const homePage = await getHomePageData()

  return <HomePageClient homePage={homePage} />
}
