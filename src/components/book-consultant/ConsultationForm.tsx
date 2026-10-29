
'use client'

import { useState } from 'react'

type PracticeArea = {
  id: string | number
  title: string
}

type ConsultationFormProps = {
  practiceAreas: PracticeArea[]
}

export default function ConsultationForm({
  practiceAreas,
}: ConsultationFormProps) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const form = e.currentTarget
    setLoading(true)
    setMessage('')
    setIsSuccess(false)

    const formData = new FormData(form)

    const data = {
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      practiceArea: formData.get('practiceArea'),
      preferredDate: formData.get('preferredDate') || null,
      message: formData.get('message'),
    }

    try {
      const response = await fetch('/api/book-consultant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(
          result.message || 'Unable to submit your request.',
        )
      }

      form.reset()
      setIsSuccess(true)
      setMessage('Your consultation request has been submitted successfully.')
    } catch (error) {
      setIsSuccess(false)
      setMessage(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
        <div className="min-w-0">
          <label
            htmlFor="fullName"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            autoComplete="name"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-blue-800 focus:ring-2 focus:ring-blue-800/10"
          />
        </div>

        <div className="min-w-0">
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-blue-800 focus:ring-2 focus:ring-blue-800/10"
          />
        </div>

        <div className="min-w-0">
          <label
            htmlFor="phone"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-blue-800 focus:ring-2 focus:ring-blue-800/10"
          />
        </div>

        <div className="min-w-0">
          <label
            htmlFor="practiceArea"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Practice Area
          </label>
          <select
            id="practiceArea"
            name="practiceArea"
            defaultValue=""
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-colors focus:border-blue-800 focus:ring-2 focus:ring-blue-800/10"
          >
            <option value="">Select a practice area (optional)</option>
            {practiceAreas.map((area) => (
              <option key={area.id} value={area.id}>
                {area.title}
              </option>
            ))}
          </select>
        </div>

        <div className="min-w-0 sm:col-span-2">
          <label
            htmlFor="preferredDate"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Preferred Date
          </label>
          <input
            id="preferredDate"
            name="preferredDate"
            type="date"
            min={new Date().toLocaleDateString('en-CA')}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-colors focus:border-blue-800 focus:ring-2 focus:ring-blue-800/10"
          />
        </div>

        <div className="min-w-0 sm:col-span-2">
          <label
            htmlFor="message"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Tell Us About Your Legal Needs
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className="w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-blue-800 focus:ring-2 focus:ring-blue-800/10"
          />
        </div>
      </div>

      {message && (
        <p
          role="status"
          aria-live="polite"
          className={`text-sm ${
            isSuccess ? 'text-green-700' : 'text-red-600'
          }`}
        >
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-blue-900 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-800 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? 'Submitting...' : 'Request a Consultation'}
      </button>
    </form>
  )
}
