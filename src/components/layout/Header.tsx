
import Link from 'next/link'
import Image from 'next/image'
import { getHeaderData, getSiteSettings } from '@/lib/payload/globals'
import MobileNavigation from '@/components/layout/MobileNavigation'

export default async function Header() {
  const [header, settings] = await Promise.all([
    getHeaderData(),
    getSiteSettings(),
  ])

  const logo =
    settings.logo && typeof settings.logo === 'object'
      ? settings.logo
      : null

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 text-slate-900 shadow-sm shadow-slate-900/[0.03] backdrop-blur-md">
      <div className="mx-auto flex min-h-[70px] w-full max-w-7xl items-center justify-between gap-3 px-5 sm:min-h-[78px] sm:gap-5 sm:px-8 lg:px-10">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Aurelex Legal home"
          className="flex min-w-0 shrink-0 items-center gap-2.5 text-slate-900 transition-opacity duration-200 hover:opacity-85 sm:gap-3"
        >
          {logo?.url ? (
            <Image
              src={logo.url}
              alt={logo.alt || settings.firmName || 'Aurelex Legal'}
              width={180}
              height={60}
              priority
              className="h-10 w-auto max-w-[100px] object-contain sm:h-12 sm:max-w-[120px]"
            />
          ) : (
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-sm border border-amber-600/70 bg-amber-50/70 font-serif text-2xl text-amber-700 shadow-sm shadow-amber-900/5 sm:h-11 sm:w-11 sm:text-[27px]">
              A
            </span>
          )}

          <span className="flex min-w-0 flex-col leading-tight">
            <strong className="text-sm font-semibold tracking-[0.09em] sm:text-base sm:tracking-[0.13em]">
              {settings.firmName || 'Aurelex Legal'}
            </strong>
            <span className="mt-1.5 text-[9px] font-medium tracking-[0.2em] text-slate-500 sm:text-[10px] sm:tracking-[0.28em]">
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
              className="whitespace-nowrap text-[13px] font-medium text-slate-700 transition-colors duration-200 hover:text-amber-700 xl:text-sm"
            >
              {item.label}
            </Link>
          ))}

          {header.ctaLabel && header.ctaUrl && (
            <Link
              href={header.ctaUrl}
              className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-sm border border-amber-600 bg-amber-600 px-5 py-3 text-center text-sm font-semibold text-white shadow-sm shadow-amber-950/10 transition-all duration-200 hover:border-amber-700 hover:bg-amber-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
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
