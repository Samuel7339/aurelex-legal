
import config from '@payload-config'
import { getPayload } from 'payload'
import { headers } from 'next/headers'

const reviewCollections = [
    { slug: 'pages', label: 'Website Pages' },
    { slug: 'attorneys', label: 'Attorneys' },
    { slug: 'posts', label: 'Insights & Articles' },
    { slug: 'guiding-principles', label: 'Guiding Principles' },
    { slug: 'faqs', label: 'FAQs' },
    { slug: 'practice-areas', label: 'Practice Areas' },
    { slug: 'testimonials', label: 'Testimonials' },
] as const

export type PendingDraft = {
    id: string | number
    parent: string | number | { id: string | number }
    collection: string
    collectionLabel: string
    version?: {
        title?: string
        name?: string
        question?: string
        heading?: string
        pageType?: string
    }
    updatedAt?: string
}

export async function getPendingDrafts(): Promise<PendingDraft[]> {
    const payload = await getPayload({ config })

    const requestHeaders = await headers()

    const { user } = await payload.auth({
        headers: requestHeaders,
        canSetHeaders: false,
    })

    if (!user || user.role !== 'admin') {
        return []
    }

    const allPendingDrafts: PendingDraft[] = []

    for (const collection of reviewCollections) {
        const result = await payload.findVersions({
            collection: collection.slug,
            where: {
                'version._status': {
                    equals: 'draft',
                },
            },
            sort: '-updatedAt',
            limit: 100,
            depth: 0,
        })

        const latestDrafts = new Map<string, PendingDraft>()

        for (const draft of result.docs) {
            const item = draft as unknown as PendingDraft

            const parentId =
                typeof item.parent === 'object'
                    ? item.parent.id
                    : item.parent

            if (parentId === undefined || parentId === null) continue

            const key = String(parentId)

            if (!latestDrafts.has(key)) {
                latestDrafts.set(key, {
                    ...item,
                    collection: collection.slug,
                    collectionLabel: collection.label,
                })
            }
        }

        const drafts = [...latestDrafts.values()]

        if (drafts.length === 0) continue

        const parentIds = drafts.map((draft) =>
            typeof draft.parent === 'object'
                ? draft.parent.id
                : draft.parent,
        )

        const publishedDocuments = await payload.find({
            collection: collection.slug,
            where: {
                id: {
                    in: parentIds,
                },
            },
            limit: parentIds.length,
            depth: 0,
            draft: false,
        })

        const publishedDates = new Map<string, number>()

        for (const document of publishedDocuments.docs) {
            publishedDates.set(
                String(document.id),
                new Date(document.updatedAt).getTime(),
            )
        }

        const pending = drafts.filter((draft) => {
            const parentId =
                typeof draft.parent === 'object'
                    ? draft.parent.id
                    : draft.parent

            const publishedDate = publishedDates.get(String(parentId))

            if (publishedDate === undefined) {
                return true
            }

            const draftDate = draft.updatedAt
                ? new Date(draft.updatedAt).getTime()
                : 0

            return draftDate > publishedDate
        })

        allPendingDrafts.push(...pending)
    }

    return allPendingDrafts.sort(
        (a, b) =>
            new Date(b.updatedAt || 0).getTime() -
            new Date(a.updatedAt || 0).getTime(),
    )
}
