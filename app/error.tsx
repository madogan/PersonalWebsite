'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md p-8 text-center">
        <h1 className="mb-4 text-2xl font-bold">An Error Occurred</h1>
        <p className="mb-6 text-gray-600">
          Sorry, an unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}
