import { getSiteSettings } from '@/lib/payload/globals'
import { getPageData } from '@/lib/payload/pages'
import PageHero from '@/components/layout/PageHero'
import ContactForm from '@/components/contact/ContactForm'
import { Metadata } from 'next'


export const metadata: Metadata = {
    title: 'Contact Us | Aurelex',
    description:
        'Tell us about your legal concerns. Our team is here to help you understand your options.',
}
export default async function ContactPage() {
    const [page, settings] = await Promise.all([
        getPageData('contact'),
        getSiteSettings(),
    ])

    return (
        <>
            <PageHero
                heading={page?.title || 'Contact Us'}
                description={
                    page?.description ||
                    'Tell us about your legal concerns. Our team is here to help you understand your options.'
                }
            />

            <section className="bg-white py-14 sm:py-20 lg:py-24">
                <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-10">

                    {/* Contact Information */}
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                            Get in Touch
                        </p>

                        <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl">
                            Let's discuss how we can help
                        </h2>

                        <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
                            Every legal matter deserves careful attention.
                            Contact our team to discuss your concerns and
                            understand the next steps available to you.
                        </p>

                        <div className="mt-8 space-y-6">
                            {settings.phone && (
                                <div className="flex gap-4">
                                    <div className="flex size-12 shrink-0 items-center justify-center bg-amber-50 text-xl text-amber-800">
                                        <span aria-hidden="true">☎</span>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-slate-900">
                                            Phone
                                        </h3>

                                        <a
                                            href={`tel:${settings.phone.replace(/[^\d+]/g, '')}`}
                                            className="mt-1 block text-sm leading-6 text-slate-600 transition hover:text-amber-800"
                                        >
                                            {settings.phone}
                                        </a>
                                    </div>
                                </div>
                            )}

                            {settings.email && (
                                <div className="flex gap-4">
                                    <div className="flex size-12 shrink-0 items-center justify-center bg-amber-50 text-xl text-amber-800">
                                        <span aria-hidden="true">✉</span>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-slate-900">
                                            Email
                                        </h3>

                                        <a
                                            href={`mailto:${settings.email}`}
                                            className="mt-1 block break-all text-sm leading-6 text-slate-600 transition hover:text-amber-800"
                                        >
                                            {settings.email}
                                        </a>
                                    </div>
                                </div>
                            )}

                            {settings.address && (
                                <div className="flex gap-4">
                                    <div className="flex size-12 shrink-0 items-center justify-center bg-amber-50 text-xl text-amber-800">
                                        <span aria-hidden="true">⌖</span>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-slate-900">
                                            Office Address
                                        </h3>

                                        <p className="mt-1 whitespace-pre-line text-sm leading-7 text-slate-600">
                                            {settings.address}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mt-10 border-l-2 border-amber-500 bg-slate-50 p-5">
                            <h3 className="font-serif text-lg font-semibold text-slate-900">
                                Confidentiality matters
                            </h3>

                            <p className="mt-2 text-sm leading-7 text-slate-600">
                                Please avoid including highly sensitive
                                personal information or confidential
                                documents in your initial enquiry.
                            </p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                            Send an Enquiry
                        </p>

                        <h2 className="mt-3 font-serif text-2xl font-semibold text-slate-900 sm:text-3xl">
                            How can we assist you?
                        </h2>

                        <p className="mt-3 text-sm leading-7 text-slate-600">
                            Share a few details so our team can understand
                            your enquiry.
                        </p>
                        <ContactForm />

                        {/* <form
                            action="/api/contact"
                            method="POST"
                            className="mt-8 space-y-5"
                        >
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-medium text-slate-800"
                                >
                                    Full Name *
                                </label>

                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    maxLength={120}
                                    className="w-full border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="mb-2 block text-sm font-medium text-slate-800"
                                    >
                                        Email Address *
                                    </label>

                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        maxLength={254}
                                        className="w-full border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
                                        placeholder="you@example.com"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="phone"
                                        className="mb-2 block text-sm font-medium text-slate-800"
                                    >
                                        Phone Number
                                    </label>

                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        autoComplete="tel"
                                        maxLength={30}
                                        className="w-full border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
                                        placeholder="Enter your phone number"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="subject"
                                    className="mb-2 block text-sm font-medium text-slate-800"
                                >
                                    Subject *
                                </label>

                                <input
                                    id="subject"
                                    name="subject"
                                    type="text"
                                    required
                                    maxLength={200}
                                    className="w-full border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
                                    placeholder="What is your enquiry about?"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="message"
                                    className="mb-2 block text-sm font-medium text-slate-800"
                                >
                                    Your Message *
                                </label>

                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    minLength={10}
                                    maxLength={5000}
                                    rows={5}
                                    className="w-full resize-y border border-slate-300 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
                                    placeholder="Briefly describe how we may assist you..."
                                />
                            </div>

                            <p className="text-xs leading-5 text-slate-500">
                                By submitting this form, you are asking our
                                team to contact you about your enquiry.
                                Submitting an enquiry does not establish an
                                attorney-client relationship.
                            </p>

                            <button
                                type="submit"
                                className="inline-flex w-full items-center justify-center gap-2 bg-amber-600 px-6 py-4 text-sm font-semibold text-white transition hover:bg-amber-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700"
                            >
                                Submit Enquiry
                                <span aria-hidden="true">→</span>
                            </button>
                        </form> */}
                    </div>
                </div>
            </section>
        </>
    )
}
