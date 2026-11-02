
import config from '@payload-config'
import { getPayload } from 'payload'
import { headers } from 'next/headers'

export type DashboardStats = {
    totalPages: number
    totalAttorneys: number
    publishedArticles: number
    totalEnquiries: number
}

export async function getDashboardStats(): Promise<DashboardStats> {
    const payload = await getPayload({ config })

    const requestHeaders = await headers()

    const { user } = await payload.auth({
        headers: requestHeaders,
        canSetHeaders: false,
    })

    if (!user || (user.role !== 'admin' && user.role !== 'editor')) {
        return {
            totalPages: 0,
            totalAttorneys: 0,
            publishedArticles: 0,
            totalEnquiries: 0,
        }
    }

    const [
        pages,
        attorneys,
        articles,
        enquiries,
    ] = await Promise.all([
        payload.count({
            collection: 'pages',
        }),

        payload.count({
            collection: 'attorneys',
        }),

        payload.count({
            collection: 'posts',
            where: {
                _status: {
                    equals: 'published',
                },
            },
        }),

        payload.count({
            collection: 'consultation-bookings',
        }),
    ])

    return {
        totalPages: pages.totalDocs,
        totalAttorneys: attorneys.totalDocs,
        publishedArticles: articles.totalDocs,
        totalEnquiries: enquiries.totalDocs,
    }
}
