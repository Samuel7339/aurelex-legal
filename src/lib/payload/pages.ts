
import 'server-only'
import { draftMode } from 'next/headers'
import { getPayloadClient } from '@/lib/payload/getPayloadClient'

export async function getHomePageData() {
    const payload = await getPayloadClient()
    const { isEnabled } = await draftMode()

    const result = await payload.find({
        collection: 'pages',
        draft: isEnabled,
        where: {
            and: [
                {
                    pageType: {
                        equals: 'home',
                    },
                },
                ...(!isEnabled
                    ? [
                        {
                            _status: {
                                equals: 'published',
                            },
                        },
                    ]
                    : []),
            ],
        },
        limit: 1,
        depth: 2,
    })

    return result.docs[0] ?? null
}

export async function getPageData(pageType: string) {
    const payload = await getPayloadClient()
    const { isEnabled } = await draftMode()

    const result = await payload.find({
        collection: 'pages',
        draft: isEnabled,
        where: {
            and: [
                {
                    pageType: {
                        equals: pageType,
                    },
                },
                ...(!isEnabled
                    ? [
                        {
                            _status: {
                                equals: 'published',
                            },
                        },
                    ]
                    : []),
            ],
        },
        limit: 1,
        depth: 2,
    })

    return result.docs[0] ?? null
}
