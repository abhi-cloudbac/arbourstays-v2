import { CollectionConfig } from 'payload'

export const Amenities: CollectionConfig = {
  slug: 'amenities',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'isActive'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Amenity Name',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Internet & Office', value: 'internet-office' },
        { label: 'Kitchen & Dining', value: 'kitchen-dining' },
        { label: 'Entertainment', value: 'entertainment' },
        { label: 'Outdoor', value: 'outdoor' },
        { label: 'Bathroom', value: 'bathroom' },
        { label: 'Heating & Cooling', value: 'heating-cooling' },
        { label: 'Safety & Security', value: 'safety-security' },
        { label: 'Accessibility', value: 'accessibility' },
        { label: 'Family Friendly', value: 'family-friendly' },
        { label: 'Parking', value: 'parking' },
        { label: 'Other', value: 'other' },
      ],
      defaultValue: 'other',
      label: 'Category',
    },
    {
      name: 'icon',
      type: 'text',
      label: 'Icon Name',
      admin: {
        description: 'Icon identifier (e.g., "wifi", "pool", "kitchen")',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: 'Active',
    },
  ],
}
