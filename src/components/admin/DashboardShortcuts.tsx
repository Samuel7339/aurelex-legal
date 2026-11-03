
import config from '@payload-config'
import { getPayloadClient } from '@/lib/payload/getPayloadClient'
import { headers } from 'next/headers'
import { getPendingDrafts } from '@/lib/dashboard/getPendingDrafts'
import { getDashboardStats } from '@/lib/dashboard/getDashboardStats'
import GlobalSearch from '@/components/admin/GlobalSearch'

const quickAccess = [
    {
        label: 'Website Pages',
        description: 'Manage page content and layouts.',
        href: '/admin/collections/pages',
    },
    {
        label: 'Consultation Bookings',
        description: 'Review incoming consultation requests.',
        href: '/admin/collections/consultation-bookings',
    },
    {
        label: 'Attorneys',
        description: 'Update attorney profiles and biographies.',
        href: '/admin/collections/attorneys',
    },
    {
        label: 'Practice Areas',
        description: 'Manage your firm’s legal services.',
        href: '/admin/collections/practice-areas',
    },
    {
        label: 'Insights & Articles',
        description: 'Publish and manage legal articles.',
        href: '/admin/collections/posts',
    },
    {
        label: 'Media Library',
        description: 'Organize images and uploaded files.',
        href: '/admin/collections/media',
    },
]

const groupDescriptions: Record<string, string> = {
    'Website Content':
        'Manage pages and the shared elements used across your website.',
    'People & Legal Services':
        'Keep your firm profiles, services, and values up to date.',
    'Articles & Client Resources':
        'Maintain useful information and resources for website visitors.',
    'Client Requests':
        'Access incoming enquiries and consultation bookings.',
    Administration:
        'Manage administrator and editor accounts.',
}

type DashboardLink = {
    label: string
    href: string
}

type DashboardGroup = {
    title: string
    description: string
    links: DashboardLink[]
}

async function getDashboardGroups(): Promise<DashboardGroup[]> {
    const payloadConfig = await config
    const groupMap = new Map<string, DashboardGroup>()

    for (const [title, description] of Object.entries(groupDescriptions)) {
        groupMap.set(title, {
            title,
            description,
            links: [],
        })
    }

    for (const collection of payloadConfig.collections) {
        const group = collection.admin?.group

        if (typeof group !== 'string') {
            continue
        }

        if (!groupMap.has(group)) {
            groupMap.set(group, {
                title: group,
                description: 'Manage content in this group.',
                links: [],
            })
        }

        const pluralLabel = collection.labels?.plural

        const label =
            typeof pluralLabel === 'string'
                ? pluralLabel
                : collection.slug

        groupMap.get(group)!.links.push({
            label,
            href: `/admin/collections/${collection.slug}`,
        })
    }

    for (const global of payloadConfig.globals) {
        const group = global.admin?.group

        if (typeof group !== 'string') {
            continue
        }

        if (!groupMap.has(group)) {
            groupMap.set(group, {
                title: group,
                description: 'Manage content in this group.',
                links: [],
            })
        }

        groupMap.get(group)!.links.push({
            label:
                typeof global.label === 'string'
                    ? global.label
                    : global.slug,
            href: `/admin/globals/${global.slug}`,
        })
    }

    return [...groupMap.values()].filter(
        (group) => group.links.length > 0,
    )
}

export default async function DashboardShortcuts() {
    const groups = await getDashboardGroups()
    const pendingDrafts = await getPendingDrafts()
    const stats = await getDashboardStats()

    const payload = await getPayloadClient()
    const requestHeaders = await headers()

    const { user } = await payload.auth({
        headers: requestHeaders,
        canSetHeaders: false,
    })

    const isAdmin = user?.role === 'admin'

    const canSearch = user?.role === 'admin' || user?.role === 'editor'

    return (
        <main className="mx-auto w-full max-w-[1500px] space-y-16 px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-14">
            {/* Welcome */}
            <section className="relative overflow-hidden rounded-2xl bg-[#172338] px-6 py-9 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border border-[#C5A052]/20 sm:h-96 sm:w-96"
                />

                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-5 -top-10 h-48 w-48 rounded-full border border-[#C5A052]/15 sm:h-72 sm:w-72"
                />

                <div className="relative max-w-3xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#D8B66D] sm:text-base">
                        Aurelex Legal
                    </p>

                    <h1 className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                        Welcome to your workspace.
                    </h1>

                    <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                        Manage your firm’s website, keep content up to date,
                        and access important tasks from one organized workspace.
                    </p>

                    <div className="mt-7 h-1 w-16 rounded-full bg-[#C5A052]" />
                </div>
            </section>

            {/* Global Search */}
            {canSearch && (
                <section className="border-t border-slate-200 pt-12">
                    <GlobalSearch />
                </section>
            )}

            {/* Activity Overview */}
            <section
                aria-labelledby="activity-overview-heading"
                className="border-t border-slate-200 pt-12"
            >
                <div className="mb-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.17em] text-[#9A7A42]">
                        At a glance
                    </p>

                    <h2
                        id="activity-overview-heading"
                        className="mt-2 text-2xl font-semibold tracking-tight text-[#172338] sm:text-3xl"
                    >
                        Activity Overview
                    </h2>

                    <p className="mt-3 text-base leading-7 text-slate-600">
                        A quick overview of your website content and client enquiries.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                    {[
                        {
                            label: 'Website Pages',
                            value: stats.totalPages,
                            icon: 'file-text',
                        },
                        {
                            label: 'Attorneys',
                            value: stats.totalAttorneys,
                            icon: 'users',
                        },
                        {
                            label: 'Published Articles',
                            value: stats.publishedArticles,
                            icon: 'newspaper',
                        },
                        {
                            label: 'Consultant Bookings',
                            value: stats.totalEnquiries,
                            icon: 'message-square',
                        },
                    ].map((item) => (
                        <div
                            key={item.label}
                            className="rounded-xl border border-slate-200 border-t-[3px] border-t-[#C5A052] bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md"
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-md font-medium text-slate-600">
                                    {item.label}
                                </p>

                                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F7F4ED] text-[#9A7A42]">
                                    {item.icon === 'file-text' && (
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5">
                                            <path d="M7 3h7l5 5v13H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
                                            <path d="M14 3v5h5M9 13h6M9 17h6" />
                                        </svg>
                                    )}

                                    {item.icon === 'users' && (
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5">
                                            <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM20 8v6M23 11h-6" />
                                        </svg>
                                    )}

                                    {item.icon === 'newspaper' && (
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5">
                                            <path d="M4 4h16v16H4zM8 8h8M8 12h8M8 16h4" />
                                        </svg>
                                    )}

                                    {item.icon === 'message-square' && (
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5">
                                            <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H4l1.5-4A8.5 8.5 0 1 1 21 11.5Z" />
                                        </svg>
                                    )}
                                </span>
                            </div>

                            <p className="mt-5 text-3xl font-semibold tracking-tight text-[#172338]">
                                {item.value.toLocaleString()}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                                Total records
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Pending Review */}
            {isAdmin && (
                <section
                    aria-labelledby="pending-review-heading"
                    className="border-t border-slate-200 pt-12"
                >
                    <div className="mb-7">
                        <div className="flex flex-col gap-5 rounded-2xl border border-[#E8DFCD] bg-[#F7F4ED] p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-8">
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#C5A052]" />

                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9A7A42] sm:text-sm">
                                        Content approval
                                    </p>
                                </div>

                                <h2
                                    id="pending-review-heading"
                                    className="mt-3 text-2xl font-semibold tracking-tight text-[#172338] sm:text-3xl"
                                >
                                    Pending Review
                                </h2>

                                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
                                    Review unpublished content across your website
                                    before approving and publishing it.
                                </p>
                            </div>

                            <div className="flex shrink-0 items-center gap-4 rounded-xl border border-[#E8DFCD] bg-white px-5 py-4">
                                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#F7F4ED] text-[#9A7A42]">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.7"
                                        className="h-6 w-6"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </div>

                                <div>
                                    <p className="text-2xl font-semibold leading-none text-[#172338]">
                                        {pendingDrafts.length}
                                    </p>

                                    <p className="mt-1.5 text-xs font-medium text-slate-500">
                                        {pendingDrafts.length === 1
                                            ? 'Draft awaiting review'
                                            : 'Drafts awaiting review'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Draft List */}
                    {pendingDrafts.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-[#D9DDE4] bg-white px-6 py-12 text-center shadow-sm sm:py-14">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F7F4ED] text-[#9A7A42]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.6"
                                    className="h-8 w-8"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M9 12.5 11 14.5 15.5 10M12 3l2.2 1.5 2.7-.1 1.1 2.5 2.3 1.4-.5 2.7 1 2.5-1.9 2-.4 2.7-2.7.5-2.1 1.7-2.4-1.2-2.7.3-1.4-2.3-2.5-1.1.1-2.7-1.4-2.3 1.5-2.2.1-2.7 2.5-1.1 1.4-2.3 2.7.5Z"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>

                            <h3 className="mt-5 text-lg font-semibold text-[#172338] sm:text-xl">
                                All caught up!
                            </h3>

                            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 sm:text-base">
                                There are no unpublished content drafts waiting
                                for review. New drafts will appear here when
                                they are ready.
                            </p>

                            <div className="mx-auto mt-6 h-1 w-12 rounded-full bg-[#C5A052]" />
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {pendingDrafts.map((draft) => {
                                const parentId =
                                    typeof draft.parent === 'object'
                                        ? draft.parent.id
                                        : draft.parent

                                const contentTitle =
                                    draft.version?.title ||
                                    draft.version?.name ||
                                    draft.version?.question ||
                                    draft.version?.heading ||
                                    'Untitled content'

                                return (
                                    <div
                                        key={`${draft.collection}-${draft.id}`}
                                        className="group flex flex-col gap-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-[#D8C49A] hover:shadow-md sm:flex-row sm:items-center sm:justify-between sm:p-6"
                                    >
                                        <div className="flex min-w-0 items-start gap-4">
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F7F4ED] text-[#9A7A42] transition-colors group-hover:bg-[#EFE6D4]">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="1.6"
                                                    className="h-6 w-6"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        d="M7 3.75h7l5 5V20a.25.25 0 0 1-.25.25H7A1.25 1.25 0 0 1 5.75 19V5A1.25 1.25 0 0 1 7 3.75Z"
                                                        strokeLinejoin="round"
                                                    />

                                                    <path
                                                        d="M14 3.75V9h5M9 13h6M9 16.5h6"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <h3 className="break-words text-base font-semibold text-[#172338] sm:text-lg">
                                                    {contentTitle}
                                                </h3>

                                                <div className="mt-2 flex flex-wrap items-center gap-2">
                                                    <span className="rounded-md border border-[#E8DFCD] bg-[#FAF8F3] px-2.5 py-1 text-xs font-medium text-[#8C713F]">
                                                        {draft.collectionLabel}
                                                    </span>

                                                    {draft.version?.pageType && (
                                                        <span className="text-xs text-slate-500">
                                                            {draft.version.pageType}
                                                        </span>
                                                    )}

                                                    <span className="text-xs text-slate-400">
                                                        Updated ·{' '}
                                                        {draft.updatedAt
                                                            ? new Date(
                                                                draft.updatedAt,
                                                            ).toLocaleDateString()
                                                            : 'Date unavailable'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <a
                                            href={`/admin/collections/${draft.collection}/${encodeURIComponent(String(parentId))}`}
                                            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg border border-[#172338] bg-[#172338] px-5 py-2.5 text-sm font-semibold text-white no-underline transition-all duration-200 hover:border-[#263B58] hover:bg-[#263B58] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A7A42]"
                                        >
                                            Open Draft

                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    d="M5 12h14M13 6l6 6-6 6"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </a>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </section>
            )}

            {/* Quick Access */}
            <section
                aria-labelledby="quick-access-heading"
                className="border-t border-slate-200 pt-12"
            >
                <div className="mb-7">
                    <p className="text-sm font-semibold uppercase tracking-[0.17em] text-[#9A7A42]">
                        Frequently used
                    </p>

                    <h2
                        id="quick-access-heading"
                        className="mt-2 text-2xl font-semibold tracking-tight text-[#172338] sm:text-3xl"
                    >
                        Quick Access
                    </h2>

                    <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                        Jump straight to the sections you use most often.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {quickAccess.map((item, index) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="group flex min-h-44 items-start gap-4 rounded-xl border border-slate-200 border-t-[3px] border-t-[#C5A052] bg-white p-6 no-underline shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#C5A052] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9A7A42] sm:p-7"
                        >
                            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F7F4ED] text-base font-semibold text-[#9A7A42] transition-colors group-hover:bg-[#172338] group-hover:text-white">
                                {String(index + 1).padStart(2, '0')}
                            </span>

                            <div className="min-w-0 flex-1 pt-0.5">
                                <h3 className="text-lg font-semibold leading-7 text-[#172338] sm:text-xl">
                                    {item.label}
                                </h3>

                                <p className="mt-2 text-base leading-7 text-slate-600">
                                    {item.description}
                                </p>

                                <span className="mt-4 inline-flex items-center gap-2 text-base font-semibold text-[#9A7A42] transition-colors group-hover:text-[#172338]">
                                    Open section

                                    <span
                                        aria-hidden="true"
                                        className="transition-transform duration-200 group-hover:translate-x-1"
                                    >
                                        →
                                    </span>
                                </span>
                            </div>
                        </a>
                    ))}
                </div>
            </section>

            {/* Website Management Groups */}
            <section
                aria-labelledby="management-heading"
                className="space-y-7 border-t border-slate-200 pt-12"
            >
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.17em] text-[#9A7A42]">
                        All resources
                    </p>

                    <h2
                        id="management-heading"
                        className="mt-2 text-2xl font-semibold tracking-tight text-[#172338] sm:text-3xl"
                    >
                        Manage Your Website
                    </h2>

                    <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
                        Browse your content and administrative tools,
                        organized by purpose.
                    </p>
                </div>

                <div className="grid grid-cols-1 items-stretch gap-6 xl:grid-cols-2">
                    {groups.map((group, index) => (
                        <section
                            key={group.title}
                            className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-8"
                        >
                            <div className="flex items-start gap-4">
                                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#E8DFCD] bg-[#F7F4ED] text-base font-semibold text-[#9A7A42]">
                                    {String(index + 1).padStart(2, '0')}
                                </span>

                                <div className="min-w-0 flex-1">
                                    <h3 className="text-xl font-semibold leading-7 tracking-tight text-[#172338] sm:text-2xl">
                                        {group.title}
                                    </h3>

                                    <p className="mt-2 text-base leading-7 text-slate-600">
                                        {group.description}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                {group.links.map((link) => (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        className="group/link flex min-h-14 items-center justify-between gap-3 rounded-xl border border-slate-200 bg-[#FAFAF9] px-4 py-3.5 text-base font-medium leading-6 text-[#172338] no-underline transition-colors duration-200 hover:border-[#C5A052] hover:bg-[#F7F4ED] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A7A42]"
                                    >
                                        <span>{link.label}</span>

                                        <span
                                            aria-hidden="true"
                                            className="shrink-0 text-lg text-[#9A7A42] transition-transform duration-200 group-hover/link:translate-x-1"
                                        >
                                            →
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-slate-200 pt-6">
                <p className="text-sm leading-6 text-slate-500">
                    Aurelex Legal
                    <span className="mx-2 text-[#C5A052]">·</span>
                    Content Management Workspace
                </p>
            </footer>
        </main>
    )
}
