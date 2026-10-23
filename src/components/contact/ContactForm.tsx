
'use client'

import { useState } from 'react'

export default function ContactForm() {
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState('')
    const [isError, setIsError] = useState(false)

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault()

        setLoading(true)
        setStatus('')
        setIsError(false)

        const form = event.currentTarget
        const formData = new FormData(form)

        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            subject: formData.get('subject'),
            message: formData.get('message'),
        }

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.message || 'Submission failed.')
            }

            setStatus(result.message)
            form.reset()
        } catch (error) {
            setIsError(true)
            setStatus(
                error instanceof Error
                    ? error.message
                    : 'Unable to submit your enquiry. Please try again.',
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium">
                    Full Name
                </label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    maxLength={120}
                    autoComplete="name"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-700"
                />
            </div>

            <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium">
                    Email Address
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    maxLength={254}
                    autoComplete="email"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-700"
                />
            </div>


            <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-medium">
                    Phone Number
                </label>
                <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    inputMode="numeric"
                    pattern="[6-9][0-9]{9}"
                    minLength={10}
                    maxLength={10}
                    autoComplete="tel"
                    title="Enter a valid 10-digit Indian mobile number"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-700"
                />
            </div>


            <div>
                <label htmlFor="subject" className="mb-2 block text-sm font-medium">
                    Subject
                </label>
                <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    maxLength={200}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-700"
                />
            </div>

            <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium">
                    How Can We Help?
                </label>
                <textarea
                    id="message"
                    name="message"
                    required
                    minLength={10}
                    maxLength={5000}
                    rows={5}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-700"
                />
            </div>

            {status && (
                <p
                    role="status"
                    aria-live="polite"
                    className={isError ? 'text-sm text-red-600' : 'text-sm text-green-700'}
                >
                    {status}
                </p>
            )}

            <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-blue-900 px-6 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {loading ? 'Submitting...' : 'Submit Enquiry →'}
            </button>
        </form>
    )
}
