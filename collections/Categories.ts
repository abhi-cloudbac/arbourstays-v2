import { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'taxonomy', 'updatedAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Category Name',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug',
      admin: {
        description: 'URL-friendly version of the name',
      },
    },
    {
      name: 'taxonomy',
      type: 'select',
      required: true,
      options: [
        { label: 'Stay Type', value: 'stay-type' },
        { label: 'Property Feature', value: 'property-feature' },
        { label: 'Location Type', value: 'location-type' },
      ],
      defaultValue: 'stay-type',
      label: 'Category Type',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'icon',
      type: 'text',
      label: 'Icon Name',
      admin: {
        description: 'Icon identifier (e.g., "beach", "cabin", "villa")',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Featured Image',
    },
    {
      name: 'listingCount',
      type: 'number',
      defaultValue: 0,
      label: 'Number of Listings',
      admin: {
        description: 'Automatically calculated count of listings in this category',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: 'Active',
      admin: {
        description: 'Show this category on the website',
      },
    },
  ],
}
