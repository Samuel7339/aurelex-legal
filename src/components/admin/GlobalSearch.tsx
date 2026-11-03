
'use client'

import { useEffect, useState, useTransition } from 'react'
import Link from 'next/link'
import { Search, ArrowUpRight, FileSearch } from 'lucide-react'

type SearchResult = {
    id: string | number
    title: string
    collection: string
    url: string
}

export default function GlobalSearch() {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<SearchResult[]>([])
    const [isPending, startTransition] = useTransition()

    useEffect(() => {
        const term = query.trim()

        if (term.length < 2) {
            setResults([])
            return
        }

        const timer = setTimeout(() => {
            startTransition(async () => {
                try {
                    const response = await fetch(
                        `/api/dashboard/search?q=${encodeURIComponent(term)}`,
                    )

                    if (!response.ok) {
                        throw new Error('Search request failed')
                    }

                    const data: SearchResult[] = await response.json()
                    setResults(data)
                } catch (error) {
                    console.error('Dashboard search failed:', error)
                    setResults([])
                }
            })
        }, 300)

        return () => clearTimeout(timer)
    }, [query])

    const hasQuery = query.trim().length >= 2

    return (
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-6 py-5 sm:px-7">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                        <Search size={22} strokeWidth={2} />
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold tracking-tight text-gray-900">
                            Global Search
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Quickly find and manage your website content.
                        </p>
                    </div>
                </div>
            </div>

            <div className="p-6 sm:px-7 sm:py-6">
                <div className="relative">
                    <Search
                        size={21}
                        strokeWidth={2}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        type="search"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search pages, attorneys, articles..."
                        className="h-14 w-full rounded-xl border border-gray-300 bg-gray-50 pl-12 pr-4 text-base text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-400 focus:border-slate-500 focus:bg-white focus:ring-4 focus:ring-slate-100"
                    />
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                        Search across 6 content collections
                    </p>

                    <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                        Minimum 2 characters
                    </span>
                </div>

                {hasQuery && (
                    <div className="mt-6">
                        <div className="mb-3 flex items-center justify-between">
                            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                                Search Results
                            </h3>

                            {!isPending && results.length > 0 && (
                                <span className="text-sm text-gray-500">
                                    {results.length} found
                                </span>
                            )}
                        </div>

                        {isPending ? (
                            <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-5">
                                <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-slate-700" />
                                <p className="text-sm font-medium text-gray-600">
                                    Searching your content...
                                </p>
                            </div>
                        ) : results.length > 0 ? (
                            <div className="space-y-2">
                                {results.map((result) => (
                                    <Link
                                        key={`${result.collection}-${result.id}`}
                                        href={result.url}
                                        className="group flex items-center justify-between gap-4 rounded-xl border border-gray-100 bg-white px-4 py-4 transition hover:border-gray-300 hover:bg-gray-50"
                                    >
                                        <div className="min-w-0">
                                            <p className="truncate text-base font-medium text-gray-800 transition group-hover:text-slate-950">
                                                {result.title}
                                            </p>

                                            <span className="mt-2 inline-flex rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                                                {result.collection}
                                            </span>
                                        </div>

                                        <ArrowUpRight
                                            size={19}
                                            className="shrink-0 text-gray-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-slate-800"
                                        />
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-5 py-9 text-center">
                                <FileSearch
                                    size={32}
                                    strokeWidth={1.5}
                                    className="mx-auto text-gray-400"
                                />

                                <p className="mt-3 text-base font-semibold text-gray-800">
                                    No matching content found
                                </p>

                                <p className="mt-1 text-sm text-gray-500">
                                    Try another keyword or check your spelling.
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    )
}
