import { CollectionConfig } from 'payload'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['listing', 'user', 'rating', 'date', 'verified'],
  },
  fields: [
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
      label: 'Reviewer',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Review Title',
    },
    {
      name: 'comment',
      type: 'textarea',
      required: true,
      label: 'Review Comment',
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
      label: 'Overall Rating',
    },
    {
      name: 'categoryRatings',
      type: 'group',
      label: 'Category Ratings',
      fields: [
        {
          name: 'cleanliness',
          type: 'number',
          min: 1,
          max: 5,
          label: 'Cleanliness',
        },
        {
          name: 'accuracy',
          type: 'number',
          min: 1,
          max: 5,
          label: 'Accuracy',
        },
        {
          name: 'checkIn',
          type: 'number',
          min: 1,
          max: 5,
          label: 'Check-in',
        },
        {
          name: 'communication',
          type: 'number',
          min: 1,
          max: 5,
          label: 'Communication',
        },
        {
          name: 'location',
          type: 'number',
          min: 1,
          max: 5,
          label: 'Location',
        },
        {
          name: 'value',
          type: 'number',
          min: 1,
          max: 5,
          label: 'Value',
        },
      ],
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      label: 'Review Date',
    },
    {
      name: 'stayDate',
      type: 'date',
      label: 'Date of Stay',
      admin: {
        description: 'When did the guest stay at this property?',
      },
    },
    {
      name: 'verified',
      type: 'checkbox',
      defaultValue: false,
      label: 'Verified Review',
      admin: {
        description: 'Review from a confirmed booking',
      },
    },
    {
      name: 'images',
      type: 'array',
      label: 'Review Images',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'hostResponse',
      type: 'group',
      label: 'Host Response',
      fields: [
        {
          name: 'comment',
          type: 'textarea',
          label: 'Response',
        },
        {
          name: 'date',
          type: 'date',
          label: 'Response Date',
        },
      ],
    },
    {
      name: 'helpful',
      type: 'number',
      defaultValue: 0,
      label: 'Helpful Count',
      admin: {
        description: 'Number of users who found this review helpful',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: 'Active',
      admin: {
        description: 'Show this review on the website',
      },
    },
  ],
}
