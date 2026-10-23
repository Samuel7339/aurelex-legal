
'use client'

import { useEffect } from 'react'

type ErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({
  error,
  reset,
}: ErrorProps) {
  useEffect(() => {
    console.error('Frontend route error:', error)
  }, [error])

  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-gray-50 px-6 py-16">
      <div className="max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Something went wrong
        </h2>

        <p className="mt-3 text-gray-600">
          We couldn't load this page. Please try again.
        </p>

        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-lg bg-blue-900 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
        >
          Try again
        </button>
      </div>
    </main>
  )
}
