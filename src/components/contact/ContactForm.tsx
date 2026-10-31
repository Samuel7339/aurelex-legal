
'use client'

import { useEffect, useState } from 'react'

const FORM_ID = '6ae43a945a553389430e7ea3'

type FormField = {
    blockType: string
    name?: string
    label?: string
    width?: number
    required?: boolean
    defaultValue?: string | number | boolean | null
}

type ContactFormConfig = {
    id: string
    fields: FormField[]
    submitButtonLabel?: string
    confirmationType?: 'message' | 'redirect'
    confirmationMessage?: unknown
    redirect?: {
        url?: string
    }
}

export default function ContactForm() {
    const [formConfig, setFormConfig] = useState<ContactFormConfig | null>(null)
    const [values, setValues] = useState<Record<string, string>>({})
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState('')
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        async function loadForm() {
            try {
                const response = await fetch(`/api/forms/${FORM_ID}`)

                if (!response.ok) {
                    throw new Error('Unable to load the contact form.')
                }

                const form = await response.json()

                setFormConfig(form)

                const initialValues: Record<string, string> = {}

                for (const field of form.fields || []) {
                    if (field.name) {
                        initialValues[field.name] = String(field.defaultValue ?? '')
                    }
                }

                setValues(initialValues)
            } catch (error) {
                setIsError(true)
                setStatus(
                    error instanceof Error
                        ? error.message
                        : 'Unable to load the contact form.',
                )
            }
        }

        loadForm()
    }, [])

    function updateValue(name: string, value: string) {
        setValues((previous) => ({
            ...previous,
            [name]: value,
        }))
    }

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault()

        if (!formConfig) return

        setLoading(true)
        setStatus('')
        setIsError(false)

        try {
            const phone = values.phone?.trim() || ''

            if (!/^[6-9][0-9]{9}$/.test(phone)) {
                throw new Error('Enter a valid 10-digit Indian mobile number.')
            }

            if ((values.message || '').trim().length < 10) {
                throw new Error('Message must contain at least 10 characters.')
            }

            const submissionData = formConfig.fields
                .filter((field) => field.name)
                .map((field) => ({
                    field: field.name!,
                    value: values[field.name!] ?? '',
                }))

            const response = await fetch('/api/form-submissions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    form: formConfig.id,
                    submissionData,
                }),
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(
                    result.errors?.[0]?.message ||
                    result.message ||
                    'Submission failed.',
                )
            }

            if (
                formConfig.confirmationType === 'redirect' &&
                formConfig.redirect?.url
            ) {
                window.location.href = formConfig.redirect.url
                return
            }

            setStatus('Form submitted successfully.')
            setValues(
                Object.fromEntries(
                    formConfig.fields
                        .filter((field) => field.name)
                        .map((field) => [field.name!, '']),
                ),
            )
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

    if (!formConfig && !status) {
        return (
            <p className="mt-8 text-sm text-slate-500">
                Loading contact form...
            </p>
        )
    }

    if (!formConfig) {
        return (
            <p role="alert" className="mt-8 text-sm text-red-600">
                {status || 'Unable to load the contact form.'}
            </p>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {formConfig.fields.map((field) => {
                    if (!field.name || field.blockType === 'message') {
                        return null
                    }

                    const name = field.name
                    const isTextarea = field.blockType === 'textarea'
                    const isEmail = field.blockType === 'email'
                    const isPhone = name === 'phone'
                    const width = field.width === 50 ? 'sm:col-span-1' : 'sm:col-span-2'

                    return (
                        <div key={name} className={width}>
                            <label
                                htmlFor={name}
                                className="mb-2 block text-sm font-medium"
                            >
                                {field.label || name}
                            </label>

                            {isTextarea ? (
                                <textarea
                                    id={name}
                                    name={name}
                                    required={field.required}
                                    minLength={name === 'message' ? 10 : undefined}
                                    maxLength={name === 'message' ? 5000 : undefined}
                                    rows={5}
                                    value={values[name] || ''}
                                    onChange={(event) =>
                                        updateValue(name, event.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-700"
                                />
                            ) : (
                                <input
                                    id={name}
                                    name={name}
                                    type={
                                        isEmail
                                            ? 'email'
                                            : isPhone
                                                ? 'tel'
                                                : 'text'
                                    }
                                    required={field.required}
                                    maxLength={
                                        name === 'name'
                                            ? 120
                                            : name === 'email'
                                                ? 254
                                                : name === 'subject'
                                                    ? 200
                                                    : isPhone
                                                        ? 10
                                                        : undefined
                                    }
                                    minLength={isPhone ? 10 : undefined}
                                    inputMode={isPhone ? 'numeric' : undefined}
                                    pattern={isPhone ? '[6-9][0-9]{9}' : undefined}
                                    autoComplete={
                                        name === 'name'
                                            ? 'name'
                                            : name === 'email'
                                                ? 'email'
                                                : isPhone
                                                    ? 'tel'
                                                    : undefined
                                    }
                                    value={values[name] || ''}
                                    onChange={(event) =>
                                        updateValue(name, event.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-700"
                                />
                            )}
                        </div>
                    )
                })}
            </div>

            {status && (
                <p
                    role="status"
                    aria-live="polite"
                    className={
                        isError
                            ? 'text-sm text-red-600'
                            : 'text-sm text-green-700'
                    }
                >
                    {status}
                </p>
            )}

            <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-blue-900 px-6 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {loading
                    ? 'Submitting...'
                    : formConfig.submitButtonLabel || 'Submit Enquiry'}
            </button>
        </form>
    )
}
