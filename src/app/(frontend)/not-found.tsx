
import Link from 'next/link'

export default function NotFound() {
  return (
    <main 
    // style={{ backgroundColor: 'red', color: 'white' }}
    className="flex min-h-[70vh] flex-col items-center justify-center bg-[#F8F6F1] px-6 py-20 text-center">
      <p className="text-sm font-semibold tracking-[0.2em] text-amber-800">
        404 ERROR
      </p>

      <h1 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        Page Not Found
      </h1>

      <p className="mt-4 max-w-md text-base leading-7 text-slate-600">
        Sorry, we couldn&apos;t find the page you&apos;re looking for.
        It may have been moved or no longer exists.
      </p>

      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-md bg-amber-800 px-6 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-amber-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-800 focus-visible:ring-offset-2"
      >
        Return to Home
      </Link>
    </main>
  )
}
