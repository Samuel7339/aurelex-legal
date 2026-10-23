
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Breadcrumbs() {
  const pathname = usePathname()

  const pages = pathname.split('/').filter(Boolean)

  if (!pages.length) return null

  return (
    <nav className="mx-auto max-w-7xl px-5 py-4 sm:px-8 lg:px-10">
      <p className="text-sm text-slate-500">
        <Link href="/" className="text-amber-700 hover:underline">
          Home
        </Link>

        {pages.map((page, index) => {
          const href = '/' + pages.slice(0, index + 1).join('/')
          const isLast = index === pages.length - 1
          const label = decodeURIComponent(page)
            .replace(/-/g, ' ')
            .replace(/\b\w/g, (letter) => letter.toUpperCase())

          return (
            <span key={href}>
              <span className="mx-2 text-slate-400">/</span>
              {isLast ? (
                <span className="font-medium text-slate-700">
                  {label}
                </span>
              ) : (
                <Link href={href} className="text-amber-700 hover:underline">
                  {label}
                </Link>
              )}
            </span>
          )
        })}
      </p>
    </nav>
  )
}
