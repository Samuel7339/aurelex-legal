
export default function Loading() {
  return (
    <main
      className="flex min-h-[60vh] items-center justify-center bg-[#F8F6F1] px-6"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="w-full max-w-xs text-center">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-amber-700">
          Please Wait
        </p>

        <h2 className="mt-3 font-serif text-xl text-slate-900">
          Preparing your page
        </h2>
        
        <div
          className="mt-7 h-[3px] w-full overflow-hidden rounded-full bg-stone-200"
          aria-hidden="true"
        >
          <svg
            className="h-full w-full"
            viewBox="0 0 300 3"
            preserveAspectRatio="none"
          >
            <rect width="250" height="3" rx="1.5" fill="#B45309">
              <animate
                attributeName="x"
                values="-150;300"
                dur="4.5s"
                repeatCount="indefinite"
              />
            </rect>
          </svg>
        </div>

        <p className="mt-4 text-sm leading-6 text-stone-500">
          Please wait while we load the content.
        </p>
      </div>
    </main>
  )
}
