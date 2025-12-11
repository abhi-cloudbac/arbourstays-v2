import { CollectionConfig } from 'payload'

export const Locations: CollectionConfig = {
  slug: 'locations',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'country', 'listingCount', 'isFeatured', 'isActive'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'City/Location Name',
      admin: {
        description: 'e.g., "New York", "Tokyo", "Paris"',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug',
      admin: {
        description: 'URL-friendly version of the name (e.g., "new-york")',
      },
    },
    {
      name: 'country',
      type: 'text',
      required: true,
      label: 'Country',
      admin: {
        description: 'e.g., "United States", "Japan", "France"',
      },
    },
    {
      name: 'region',
      type: 'text',
      label: 'Region',
      admin: {
        description: 'e.g., "North America", "Asia", "Europe"',
      },
    },
    {
      name: 'coordinates',
      type: 'group',
      label: 'Coordinates',
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
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Featured Image',
      admin: {
        description: 'Hero image representing this location',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      admin: {
        description: 'Brief description of the location',
      },
    },
    {
      name: 'listingCount',
      type: 'number',
      defaultValue: 0,
      label: 'Number of Listings',
      admin: {
        description: 'Automatically calculated count of listings in this location',
        readOnly: true,
      },
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Featured Location',
      admin: {
        description: 'Show this location in the home page filter tabs',
      },
    },
    {
      name: 'displayOrder',
      type: 'number',
      defaultValue: 0,
      label: 'Display Order',
      admin: {
        description: 'Order in which this location appears in filter tabs (lower number = first)',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: 'Active',
      admin: {
        description: 'Show this location on the website',
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data }) => {
        // Auto-generate slug from name if not provided
        if (!data.slug && data.name) {
          data.slug = data.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
        }
        return data
      },
    ],
  },
}
