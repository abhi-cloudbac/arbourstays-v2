import { CollectionConfig } from 'payload'

export const Hosts: CollectionConfig = {
  slug: 'hosts',
  admin: {
    useAsTitle: 'displayName',
    defaultColumns: ['displayName', 'handle', 'verified', 'joinedDate'],
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      label: 'Associated User Account',
      admin: {
        description: 'Link to the user account (optional for authentication)',
      },
    },
    {
      name: 'displayName',
      type: 'text',
      required: true,
      label: 'Display Name',
    },
    {
      name: 'handle',
      type: 'text',
      required: true,
      unique: true,
      label: 'Handle/Username',
      admin: {
        description: 'Unique username (e.g., @johnsmith)',
      },
    },
    {
      name: 'avatarUrl',
      type: 'upload',
      relationTo: 'media',
      label: 'Avatar Image',
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Bio',
      admin: {
        description: 'Short description about the host',
      },
    },
    {
      name: 'email',
      type: 'email',
      label: 'Contact Email',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone Number',
    },
    {
      name: 'verified',
      type: 'checkbox',
      defaultValue: false,
      label: 'Verified Host',
      admin: {
        description: 'Has this host been verified?',
      },
    },
    {
      name: 'joinedDate',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      label: 'Joined Date',
    },
    {
      name: 'languages',
      type: 'array',
      label: 'Languages Spoken',
      fields: [
        {
          name: 'language',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'responseRate',
      type: 'number',
      min: 0,
      max: 100,
      label: 'Response Rate (%)',
      admin: {
        description: 'Percentage of inquiries responded to',
      },
    },
    {
      name: 'responseTime',
      type: 'text',
      label: 'Average Response Time',
      admin: {
        description: 'e.g., "within an hour", "within a day"',
      },
    },
    {
      name: 'totalListings',
      type: 'number',
      defaultValue: 0,
      label: 'Total Listings',
      admin: {
        description: 'Number of active listings by this host',
      },
    },
    {
      name: 'rating',
      type: 'number',
      min: 0,
      max: 5,
      label: 'Average Rating',
    },
    {
      name: 'reviewCount',
      type: 'number',
      defaultValue: 0,
      label: 'Total Reviews',
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: 'Active Host',
    },
  ],
}
