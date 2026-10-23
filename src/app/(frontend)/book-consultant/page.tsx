
import Link from 'next/link'
import ConsultationForm from '@/components/book-consultant/ConsultationForm'
import { getAllPracticeAreas } from '@/lib/payload/practiceAreas'

export const metadata = {
  title: 'Book a Consultant | Aurelex Legal',
  description:
    'Request a consultation with Aurelex Legal for professional legal guidance.',
}

export default async function BookConsultantPage() {
  const practiceAreas = await getAllPracticeAreas()

  const formPracticeAreas = practiceAreas.map((area) => ({
    id: String(area.id),
    title: area.title,
  }))

  return (
    <section className="min-h-screen bg-gray-50 px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-800">
            Aurelex Legal
          </p>

          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            Book a Consultation
          </h1>

          <p className="text-gray-600">
            Tell us about your legal needs, and our team will contact you
            to discuss the next steps.
          </p>
        </div>

        <div className="rounded-xl bg-white p-8 shadow-sm">
          <ConsultationForm practiceAreas={formPracticeAreas} />
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          Have a general enquiry?{' '}
          <Link
            href="/contact"
            className="font-medium text-blue-800 hover:underline"
          >
            Contact us
          </Link>
        </p>
      </div>
    </section>
  )
}
