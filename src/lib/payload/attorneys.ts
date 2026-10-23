
import 'server-only'
import { getPayloadClient } from '@/lib/payload/getPayloadClient'

// export async function getFeaturedAttorneys() {
//     const payload = await getPayloadClient()

//     const result = await payload.find({
//         collection: 'attorneys',
//         where: {
//             and: [
//                 { featuredOnHome: { equals: true } },
//                 { _status: { equals: 'published' } },
//             ],
//         },
//         sort: 'sortOrder',

//         depth: 1,
//         select: {
//             name: true,
//             slug: true,
//             designation: true,
//             shortDescription: true,
//             photo: true,
//             featuredOnHome: true,
//             sortOrder: true,
//         },
//         limit: 10,
//     })

//     return result.docs
// }

export async function getAllAttorneys() {
    const payload = await getPayloadClient()

    const result = await payload.find({
        collection: 'attorneys',
        where: {
            _status: { equals: 'published' },
        },
        sort: 'sortOrder',
        depth: 1,
        limit: 100,
    })

    return result.docs
}

export async function getAttorneyBySlug(slug: string) {
    const payload = await getPayloadClient()

    const result = await payload.find({
        collection: 'attorneys',
        where: {
            and: [
                { slug: { equals: slug } },
                { _status: { equals: 'published' } },
            ],
        },
        depth: 1,
        limit: 1,
    })

    return result.docs[0] ?? null
}


