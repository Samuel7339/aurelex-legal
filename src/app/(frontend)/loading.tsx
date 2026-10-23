
export default function Loading() {
  return (
    <main
      className="flex min-h-[60vh] items-center justify-center bg-gray-50 px-6"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="text-center">
        <div
          className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-900"
          aria-hidden="true"
        />

        <h2 className="text-lg font-semibold text-gray-900">
          Loading...
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          Please wait while we load the page.
        </p>
      </div>
    </main>
  )
}
