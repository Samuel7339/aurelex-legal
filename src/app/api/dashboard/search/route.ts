
import { NextRequest, NextResponse } from 'next/server'

import { getPayloadClient } from '@/lib/payload/getPayloadClient'

export async function GET(request: NextRequest) {
    try {
        const term = request.nextUrl.searchParams.get('q')?.trim() ?? ''

        if (term.length < 2) {
            return NextResponse.json([])
        }

        const payload = await getPayloadClient()

        const { user } = await payload.auth({
            headers: request.headers,
            canSetHeaders: false,
        })

        if (!user || (user.role !== 'admin' && user.role !== 'editor')) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 },
            )
        }

        const searchCollections = await Promise.all([
            payload.find({
                collection: 'pages',
                where: {
                    or: [
                        { title: { contains: term } },
                        { slug: { contains: term } },
                    ],
                },
                limit: 5,
                depth: 0,
                overrideAccess: false,
                user,
            }),

            payload.find({
                collection: 'attorneys',
                where: {
                    or: [
                        { name: { contains: term } },
                        { designation: { contains: term } },
                    ],
                },
                limit: 5,
                depth: 0,
                overrideAccess: false,
                user,
            }),

            payload.find({
                collection: 'practice-areas',
                where: {
                    or: [
                        { title: { contains: term } },
                        { slug: { contains: term } },
                    ],
                },
                limit: 5,
                depth: 0,
                overrideAccess: false,
                user,
            }),

            payload.find({
                collection: 'posts',
                where: {
                    or: [
                        { title: { contains: term } },
                        { slug: { contains: term } },
                        { category: { contains: term } },
                    ],
                },
                limit: 5,
                depth: 0,
                overrideAccess: false,
                user,
            }),

            payload.find({
                collection: 'faqs',
                where: {
                    or: [
                        { question: { contains: term } },
                        { category: { contains: term } },
                    ],
                },
                limit: 5,
                depth: 0,
                overrideAccess: false,
                user,
            }),

            payload.find({
                collection: 'testimonials',
                where: {
                    or: [
                        { clientName: { contains: term } },
                        { role: { contains: term } },
                        { testimonial: { contains: term } },
                    ],
                },
                limit: 5,
                depth: 0,
                overrideAccess: false,
                user,
            }),
        ])

        const [
            pages,
            attorneys,
            practiceAreas,
            posts,
            faqs,
            testimonials,
        ] = searchCollections

        const results = [
            ...pages.docs.map((doc) => ({
                id: doc.id,
                title: doc.title,
                collection: 'Pages',
                url: `/admin/collections/pages/${doc.id}`,
            })),

            ...attorneys.docs.map((doc) => ({
                id: doc.id,
                title: doc.name,
                collection: 'Attorneys',
                url: `/admin/collections/attorneys/${doc.id}`,
            })),

            ...practiceAreas.docs.map((doc) => ({
                id: doc.id,
                title: doc.title,
                collection: 'Practice Areas',
                url: `/admin/collections/practice-areas/${doc.id}`,
            })),

            ...posts.docs.map((doc) => ({
                id: doc.id,
                title: doc.title,
                collection: 'Articles',
                url: `/admin/collections/posts/${doc.id}`,
            })),

            ...faqs.docs.map((doc) => ({
                id: doc.id,
                title: doc.question,
                collection: 'FAQs',
                url: `/admin/collections/faqs/${doc.id}`,
            })),

            ...testimonials.docs.map((doc) => ({
                id: doc.id,
                title: doc.clientName,
                collection: 'Testimonials',
                url: `/admin/collections/testimonials/${doc.id}`,
            })),
        ]

        return NextResponse.json(results)
    } catch (error) {
        console.error('Dashboard search failed:', error)

        return NextResponse.json(
            { message: 'Search failed' },
            { status: 500 },
        )
    }
}
