
'use client'

import Link from 'next/link'
import { useState } from 'react'

type NavigationItem = {
  label: string
  url: string
}

type MobileNavigationProps = {
  navigation: NavigationItem[]
  ctaLabel?: string | null
  ctaUrl?: string | null
}

export default function MobileNavigation({
  navigation,
  ctaLabel,
  ctaUrl,
}: MobileNavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="relative lg:hidden">
      <button
        type="button"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
        onClick={() => setMenuOpen((open) => !open)}
        className="flex h-11 w-11 items-center justify-center text-slate-900 hover:bg-slate-100"
      >
        {menuOpen ? (
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-6 w-6"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-6 w-6"
          >
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        )}
      </button>

      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="absolute right-0 top-full z-50 mt-2 max-h-[calc(100dvh-90px)] w-[min(20rem,calc(100vw-2rem))] overflow-y-auto border border-slate-200 bg-white p-3 text-slate-900 shadow-xl"
        >
          <div className="flex flex-col">
            {navigation.map((item, index) => (
              <Link
                key={`${item.url}-${index}`}
                href={item.url}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-amber-700"
              >
                {item.label}
              </Link>
            ))}

            {ctaLabel && ctaUrl && (
              <Link
                href={ctaUrl}
                onClick={() => setMenuOpen(false)}
                className="mt-2 flex min-h-11 items-center justify-center bg-amber-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-amber-700"
              >
                {ctaLabel}
              </Link>
            )}
          </div>
        </nav>
      )}
    </div>
  )
}
