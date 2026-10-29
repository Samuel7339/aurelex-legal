
import config from '@payload-config'

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

    return (
        <main className="mx-auto w-full max-w-[1500px] space-y-12 px-4 py-7 sm:px-6 sm:py-9 lg:px-10 lg:py-12">
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

            {/* Quick Access */}
            <section aria-labelledby="quick-access-heading">
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
            <section aria-labelledby="management-heading" className="space-y-7">
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
                        Browse your content and administrative tools, organized by purpose.
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
                    Aurelex Legal <span className="mx-2 text-[#C5A052]">·</span>
                    Content Management Workspace
                </p>
            </footer>
        </main>
    )
}
