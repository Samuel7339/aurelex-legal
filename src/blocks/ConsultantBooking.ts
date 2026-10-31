
import type { Block } from 'payload'

export const ConsultantBookingBlock: Block = {
  slug: 'consultantBooking',
  labels: {
    singular: 'Consultant Booking Form',
    plural: 'Consultant Booking Forms',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
      required: false,
      admin: {
        description: 'Optional heading displayed above the booking form.',
      },
    },
  ],
}
