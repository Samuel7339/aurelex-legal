import 'server-only'
import { getPayloadClient } from '@/lib/payload/getPayloadClient'

export async function getPublishedPosts() {


    
    const payload = await getPayloadClient()

    const result = await payload.find({
        collection: 'posts',
        where: {
            _status: {
                equals: 'published',
            },
        },
        sort: '-publishedAt',
        depth: 1,
        limit: 100,
    })

    

    return result.docs
}

export async function getPostBySlug(slug: string) {
    const payload = await getPayloadClient()

    const result = await payload.find({
        collection: 'posts',
        where: {
            and: [
                { slug: { equals: slug } },
                { _status: { equals: 'published' } },
            ],
        },
        limit: 1,
        depth: 1,
    })

    return result.docs[0] ?? null
}