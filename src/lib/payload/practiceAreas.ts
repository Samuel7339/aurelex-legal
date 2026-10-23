import 'server-only'
import { getPayloadClient } from '@/lib/payload/getPayloadClient'

export async function getAllPracticeAreas() {
    const payload = await getPayloadClient()

    const result = await payload.find({
        collection: 'practice-areas',
        where: {
            _status: {
                equals: 'published',
            },
        },
        sort: 'sortOrder',
        depth: 1,
        limit: 100,
    })

    return result.docs
}

// export async function getFeaturedPracticeAreas() {
//     const payload = await getPayloadClient()

//     const result = await payload.find({
//         collection: 'practice-areas',
//         where: {
//             and: [
//                 {
//                     featured: {
//                         equals: true,
//                     },
//                 },
//                 {
//                     _status: {
//                         equals: 'published',
//                     },
//                 },
//             ],
//         },
//         sort: 'sortOrder',
//         depth: 1,
//         limit: 6,
//     })

//     return result.docs
// }