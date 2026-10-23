
import Link from 'next/link'
import { getHeaderData } from '@/lib/payload/globals'
import MobileNavigation from '@/components/layout/MobileNavigation'

export default async function Header() {
  const header = await getHeaderData()

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
      <div className="mx-auto flex min-h-[68px] w-full max-w-7xl items-center justify-between gap-3 px-4 sm:min-h-[76px] sm:gap-5 sm:px-8 lg:px-10">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Aurelex Law Group home"
          className="flex min-w-0 shrink-0 items-center gap-2 text-slate-900 sm:gap-3"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center border border-amber-600 font-serif text-xl text-amber-700 sm:h-11 sm:w-11 sm:text-2xl">
            A
          </span>

          <span className="flex min-w-0 flex-col leading-tight">
            <strong className="text-sm tracking-[0.12em] sm:text-base sm:tracking-[0.16em]">
              Aurelex Legal
            </strong>

            <span className="mt-1 text-[9px] tracking-[0.2em] text-slate-500 sm:text-[10px] sm:tracking-[0.3em]">
              LAW GROUP
            </span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-5 lg:flex xl:gap-7"
        >
          {header.navigation?.map((item, index) => (
            <Link
              key={`${item.url}-${index}`}
              href={item.url}
              className="whitespace-nowrap text-sm text-slate-700 transition-colors hover:text-amber-700"
            >
              {item.label}
            </Link>
          ))}

          {header.ctaLabel && header.ctaUrl && (
            <Link
              href={header.ctaUrl}
              className="inline-flex min-h-11 shrink-0 items-center justify-center bg-amber-600 px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-amber-700"
            >
              {header.ctaLabel}
            </Link>
          )}
        </nav>

        {/* Mobile navigation */}
        <MobileNavigation
          navigation={header.navigation ?? []}
          ctaLabel={header.ctaLabel}
          ctaUrl={header.ctaUrl}
        />
      </div>
    </header>
  )
}
