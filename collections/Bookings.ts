import { CollectionConfig } from 'payload'

export const Bookings: CollectionConfig = {
  slug: 'bookings',
  admin: {
    useAsTitle: 'bookingNumber',
    defaultColumns: ['bookingNumber', 'listing', 'user', 'checkIn', 'checkOut', 'status'],
  },
  fields: [
    {
      name: 'bookingNumber',
      type: 'text',
      required: true,
      unique: true,
      label: 'Booking Number',
      admin: {
        description: 'Auto-generated booking reference number',
      },
    },
    {
      name: 'listing',
      type: 'relationship',
      relationTo: 'listings',
      required: true,
      label: 'Listing',
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      label: 'Guest',
    },
    {
      name: 'dates',
      type: 'group',
      label: 'Stay Dates',
      fields: [
        {
          name: 'checkIn',
          type: 'date',
          required: true,
          label: 'Check-in Date',
        },
        {
          name: 'checkOut',
          type: 'date',
          required: true,
          label: 'Check-out Date',
        },
        {
          name: 'nights',
          type: 'number',
          label: 'Number of Nights',
          admin: {
            description: 'Automatically calculated',
          },
        },
      ],
    },
    {
      name: 'guests',
      type: 'group',
      label: 'Guest Details',
      fields: [
        {
          name: 'adults',
          type: 'number',
          required: true,
          min: 1,
          label: 'Adults',
        },
        {
          name: 'children',
          type: 'number',
          defaultValue: 0,
          label: 'Children',
        },
        {
          name: 'infants',
          type: 'number',
          defaultValue: 0,
          label: 'Infants',
        },
        {
          name: 'total',
          type: 'number',
          label: 'Total Guests',
          admin: {
            description: 'Automatically calculated',
          },
        },
      ],
    },
    {
      name: 'pricing',
      type: 'group',
      label: 'Pricing',
      fields: [
        {
          name: 'basePrice',
          type: 'number',
          required: true,
          label: 'Base Price (per night)',
        },
        {
          name: 'nightsTotal',
          type: 'number',
          label: 'Total for Nights',
        },
        {
          name: 'cleaningFee',
          type: 'number',
          defaultValue: 0,
          label: 'Cleaning Fee',
        },
        {
          name: 'serviceFee',
          type: 'number',
          defaultValue: 0,
          label: 'Service Fee',
        },
        {
          name: 'tax',
          type: 'number',
          defaultValue: 0,
          label: 'Taxes',
        },
        {
          name: 'discount',
          type: 'number',
          defaultValue: 0,
          label: 'Discount',
        },
        {
          name: 'totalPrice',
          type: 'number',
          required: true,
          label: 'Total Price',
        },
        {
          name: 'currency',
          type: 'text',
          defaultValue: 'USD',
          label: 'Currency',
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Checked In', value: 'checked-in' },
        { label: 'Checked Out', value: 'checked-out' },
        { label: 'Cancelled', value: 'cancelled' },
        { label: 'Completed', value: 'completed' },
      ],
      defaultValue: 'pending',
      label: 'Booking Status',
    },
    {
      name: 'paymentStatus',
      type: 'select',
      required: true,
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Paid', value: 'paid' },
        { label: 'Partially Paid', value: 'partially-paid' },
        { label: 'Refunded', value: 'refunded' },
        { label: 'Failed', value: 'failed' },
      ],
      defaultValue: 'pending',
      label: 'Payment Status',
    },
    {
      name: 'paymentMethod',
      type: 'select',
      options: [
        { label: 'Credit Card', value: 'credit-card' },
        { label: 'Debit Card', value: 'debit-card' },
        { label: 'PayPal', value: 'paypal' },
        { label: 'Bank Transfer', value: 'bank-transfer' },
        { label: 'Other', value: 'other' },
      ],
      label: 'Payment Method',
    },
    {
      name: 'paymentIntentId',
      type: 'text',
      label: 'Payment Intent ID',
      admin: {
        description: 'Stripe or other payment processor ID',
      },
    },
    {
      name: 'guestMessage',
      type: 'textarea',
      label: 'Message to Host',
    },
    {
      name: 'specialRequests',
      type: 'textarea',
      label: 'Special Requests',
    },
    {
      name: 'cancellation',
      type: 'group',
      label: 'Cancellation Details',
      admin: {
        condition: (data) => data.status === 'cancelled',
      },
      fields: [
        {
          name: 'cancelledBy',
          type: 'select',
          options: [
            { label: 'Guest', value: 'guest' },
            { label: 'Host', value: 'host' },
            { label: 'Admin', value: 'admin' },
          ],
          label: 'Cancelled By',
        },
        {
          name: 'cancelledAt',
          type: 'date',
          label: 'Cancellation Date',
        },
        {
          name: 'reason',
          type: 'textarea',
          label: 'Cancellation Reason',
        },
        {
          name: 'refundAmount',
          type: 'number',
          label: 'Refund Amount',
        },
      ],
    },
    {
      name: 'createdAt',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      label: 'Booking Created',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'confirmedAt',
      type: 'date',
      label: 'Booking Confirmed',
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Internal Notes',
      admin: {
        description: 'Private notes for admin/host',
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        // Auto-generate booking number if creating new booking
        if (operation === 'create' && !data.bookingNumber) {
          const timestamp = Date.now()
          const random = Math.floor(Math.random() * 1000)
          data.bookingNumber = `BK-${timestamp}-${random}`
        }

        // Calculate total guests
        if (data.guests) {
          const { adults = 0, children = 0, infants = 0 } = data.guests
          data.guests.total = adults + children + infants
        }

        // Calculate nights
        if (data.dates?.checkIn && data.dates?.checkOut) {
          const checkIn = new Date(data.dates.checkIn)
          const checkOut = new Date(data.dates.checkOut)
          const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime())
          data.dates.nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        }

        // Calculate pricing
        if (data.pricing && data.dates?.nights) {
          const { basePrice = 0, cleaningFee = 0, serviceFee = 0, tax = 0, discount = 0 } = data.pricing
          const nightsTotal = basePrice * data.dates.nights
          data.pricing.nightsTotal = nightsTotal
          data.pricing.totalPrice = nightsTotal + cleaningFee + serviceFee + tax - discount
        }

        return data
      },
    ],
  },
}
