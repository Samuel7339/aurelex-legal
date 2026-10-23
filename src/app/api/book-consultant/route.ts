
import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload/getPayloadClient'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { fullName, email, phone, practiceArea,preferredDate, message  } = body

    if (
      typeof fullName !== 'string' ||
      !fullName.trim() ||
      typeof email !== 'string' ||
      !email.trim() ||
      typeof phone !== 'string' ||
      !phone.trim()
    ) {
      return NextResponse.json(
        { message: 'Please provide your name, email, and phone number.' },
        { status: 400 },
      )
    }

    const payload = await getPayloadClient()

    await payload.create({
      collection: 'consultation-bookings',
      data: {
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        practiceArea: practiceArea || undefined,
        preferredDate: preferredDate || undefined,
        message: typeof message === 'string' ? message.trim() : '',
        status: 'pending',
      },
    })

    return NextResponse.json(
      { message: 'Consultation request submitted successfully.' },
      { status: 201 },
    )
  } catch {
    return NextResponse.json(
      { message: 'Unable to submit your request. Please try again.' },
      { status: 500 },
    )
  }
}
