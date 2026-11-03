
import 'server-only'

import { draftMode, headers } from 'next/headers'
import { getPayloadClient } from '@/lib/payload/getPayloadClient'

async function getPageByType(pageType: string) {
  const payload = await getPayloadClient()
  const { isEnabled } = await draftMode()

  const requestHeaders = await headers()
  const authResult = await payload.auth({
    headers: requestHeaders,
    canSetHeaders: false,
  })

  const result = await payload.find({
    collection: 'pages',
    user: authResult.user ?? undefined,
    overrideAccess: false,
    draft: isEnabled,
    where: {
      pageType: {
        equals: pageType,
      },
    },
    limit: 1,
    depth: 2,
  })

  return result.docs[0] ?? null
}

export async function getHomePageData() {
  return getPageByType('home')
}

export async function getPageData(pageType: string) {
  return getPageByType(pageType)
}
