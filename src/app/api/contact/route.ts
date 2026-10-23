
import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload/getPayloadClient'

export async function POST(request: Request) {
    try {
        const body = await request.json()

        const name = String(body.name ?? '').trim()
        const email = String(body.email ?? '').trim()
        const phone = String(body.phone ?? '').trim()
        const subject = String(body.subject ?? '').trim()
        const message = String(body.message ?? '').trim()

        // Validate the submitted data on the server

        if (
            !name ||
            name.length > 120 ||
            !email ||
            email.length > 254 ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
            !/^[6-9]\d{9}$/.test(phone) ||
            !subject ||
            subject.length > 200 ||
            message.length < 10 ||
            message.length > 5000
        ) {
            return NextResponse.json(
                { message: 'Please check your details and try again. Enter a valid 10-digit Indian mobile number.' },
                { status: 400 },
            )
        }


        const payload = await getPayloadClient()

        // Save the enquiry using the existing Payload collection
        await payload.create({
            collection: 'contact-submissions',
            data: {
                name,
                email,
                phone: phone || undefined,
                subject,
                message,
            },
            overrideAccess: false,
        })

        return NextResponse.json(
            { message: 'Your enquiry has been submitted successfully.' },
            { status: 201 },
        )
    } catch (error) {
        console.error('Contact submission failed:', error)

        return NextResponse.json(
            { message: 'Unable to submit your enquiry. Please try again later.' },
            { status: 500 },
        )
    }
}
