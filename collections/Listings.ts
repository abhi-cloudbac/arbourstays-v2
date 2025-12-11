import type { CollectionConfig } from 'payload'

export const Listings: CollectionConfig = {
  slug: 'listings',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'listingCategory', 'price', 'host', 'isActive'],
  },
  access: {
    read: () => true,
  },
  fields: [
    // Basic Information
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Listing Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'handle',
      type: 'text',
      required: true,
      unique: true,
      label: 'Handle',
      admin: {
        description: 'Unique identifier for the listing',
      },
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Description',
    },

    // Category & Host
    {
      name: 'listingCategory',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      label: 'Category',
    },
    {
      name: 'host',
      type: 'relationship',
      relationTo: 'hosts',
      required: true,
      label: 'Host',
    },
    {
      name: 'location',
      type: 'relationship',
      relationTo: 'locations',
      required: false,
      label: 'Location/City',
      admin: {
        description: 'The city or location where this property is located',
      },
    },

    // Images
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Featured Image',
    },
    {
      name: 'galleryImgs',
      type: 'array',
      label: 'Gallery Images',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },

    // Pricing
    {
      name: 'price',
      type: 'number',
      required: true,
      label: 'Price per Night',
    },
    {
      name: 'saleOff',
      type: 'text',
      label: 'Sale/Discount',
      admin: {
        description: 'e.g., "20% off" or null if no sale',
      },
    },

    // Location
    {
      name: 'address',
      type: 'text',
      required: true,
      label: 'Address',
    },
    {
      name: 'map',
      type: 'group',
      label: 'Map Coordinates',
      fields: [
        {
          name: 'lat',
          type: 'number',
          required: true,
          label: 'Latitude',
        },
        {
          name: 'lng',
          type: 'number',
          required: true,
          label: 'Longitude',
        },
      ],
    },

    // Property Details
    {
      name: 'maxGuests',
      type: 'number',
      required: true,
      label: 'Maximum Guests',
    },
    {
      name: 'bedrooms',
      type: 'number',
      required: true,
      label: 'Number of Bedrooms',
    },
    {
      name: 'beds',
      type: 'number',
      required: true,
      label: 'Number of Beds',
    },
    {
      name: 'bathrooms',
      type: 'number',
      required: true,
      label: 'Number of Bathrooms',
    },

    // Amenities
    {
      name: 'amenities',
      type: 'relationship',
      relationTo: 'amenities',
      hasMany: true,
      label: 'Amenities',
    },

    // Reviews & Ratings
    {
      name: 'reviewStart',
      type: 'number',
      min: 0,
      max: 5,
      label: 'Average Rating',
      admin: {
        description: 'Calculated from reviews',
      },
    },
    {
      name: 'reviewCount',
      type: 'number',
      defaultValue: 0,
      label: 'Total Reviews',
      admin: {
        description: 'Automatically calculated',
      },
    },

    // Additional Features
    {
      name: 'like',
      type: 'checkbox',
      defaultValue: false,
      label: 'Featured/Liked',
      admin: {
        description: 'Mark as featured listing',
      },
    },
    {
      name: 'isAds',
      type: 'checkbox',
      defaultValue: false,
      label: 'Promoted (Ads)',
      admin: {
        description: 'Show as promoted listing',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: 'Active',
      admin: {
        description: 'Show this listing on the website',
      },
    },

    // Booking Settings
    {
      name: 'bookingSettings',
      type: 'group',
      label: 'Booking Settings',
      fields: [
        {
          name: 'instantBook',
          type: 'checkbox',
          defaultValue: false,
          label: 'Instant Booking',
        },
        {
          name: 'minimumStay',
          type: 'number',
          defaultValue: 1,
          label: 'Minimum Stay (nights)',
        },
        {
          name: 'maximumStay',
          type: 'number',
          label: 'Maximum Stay (nights)',
        },
        {
          name: 'checkInTime',
          type: 'text',
          defaultValue: '3:00 PM',
          label: 'Check-in Time',
        },
        {
          name: 'checkOutTime',
          type: 'text',
          defaultValue: '11:00 AM',
          label: 'Check-out Time',
        },
        {
          name: 'cleaningFee',
          type: 'number',
          defaultValue: 0,
          label: 'Cleaning Fee',
        },
      ],
    },

    // Metadata
    {
      name: 'date',
      type: 'date',
      defaultValue: () => new Date().toISOString(),
      label: 'Listing Date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'viewCount',
      type: 'number',
      defaultValue: 0,
      label: 'View Count',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        // Auto-generate handle from title if not provided
        if (!data.handle && data.title) {
          data.handle = data.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
        }

        // Auto-generate slug from title if not provided
        if (!data.slug && data.title) {
          data.slug = data.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
        }

        return data
      },
    ],
  },
}
