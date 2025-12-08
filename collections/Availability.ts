import { CollectionConfig } from 'payload'

export const Availability: CollectionConfig = {
  slug: 'availability',
  admin: {
    useAsTitle: 'listing',
    defaultColumns: ['listing', 'startDate', 'endDate', 'status'],
    description: 'Manage listing availability and pricing for specific date ranges',
  },
  fields: [
    {
      name: 'listing',
      type: 'relationship',
      relationTo: 'listings',
      required: true,
      label: 'Listing',
      index: true,
    },
    {
      name: 'dateRange',
      type: 'group',
      label: 'Date Range',
      fields: [
        {
          name: 'startDate',
          type: 'date',
          required: true,
          label: 'Start Date',
        },
        {
          name: 'endDate',
          type: 'date',
          required: true,
          label: 'End Date',
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      options: [
        { label: 'Available', value: 'available' },
        { label: 'Booked', value: 'booked' },
        { label: 'Blocked', value: 'blocked' },
        { label: 'Maintenance', value: 'maintenance' },
      ],
      defaultValue: 'available',
      label: 'Availability Status',
    },
    {
      name: 'availableGuests',
      type: 'number',
      label: 'Available Guest Count',
      admin: {
        description: 'Override max guests for this date range (optional)',
      },
    },
    {
      name: 'priceOverride',
      type: 'group',
      label: 'Price Override',
      admin: {
        description: 'Set custom pricing for this date range (e.g., peak season)',
      },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: false,
          label: 'Enable Price Override',
        },
        {
          name: 'price',
          type: 'number',
          label: 'Custom Price',
          admin: {
            condition: (data, siblingData) => siblingData?.enabled === true,
          },
        },
        {
          name: 'currency',
          type: 'text',
          defaultValue: 'USD',
          label: 'Currency',
          admin: {
            condition: (data, siblingData) => siblingData?.enabled === true,
          },
        },
      ],
    },
    {
      name: 'minimumStay',
      type: 'number',
      label: 'Minimum Stay (nights)',
      admin: {
        description: 'Override minimum stay requirement for this date range',
      },
    },
    {
      name: 'maximumStay',
      type: 'number',
      label: 'Maximum Stay (nights)',
      admin: {
        description: 'Override maximum stay requirement for this date range',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Internal Notes',
      admin: {
        description: 'Private notes about this availability period',
      },
    },
    {
      name: 'booking',
      type: 'relationship',
      relationTo: 'bookings',
      label: 'Associated Booking',
      admin: {
        description: 'If status is "booked", link to the booking',
        condition: (data) => data.status === 'booked',
      },
    },
  ],
}
