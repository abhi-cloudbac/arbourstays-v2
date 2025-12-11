import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Listings } from './collections/Listings'
import { Categories } from './collections/Categories'
import { Hosts } from './collections/Hosts'
import { Amenities } from './collections/Amenities'
import { Reviews } from './collections/Reviews'
import { Bookings } from './collections/Bookings'
import { Availability } from './collections/Availability'
import { Locations } from './collections/Locations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- Arbour Stays',
      favicon: '/icon.png',
      ogImage: '/icon.png',
    },
    components: {
      // You can add custom components here in the future
      // graphics: {
      //   Logo: './components/Logo',
      //   Icon: './components/Icon',
      // },
    },
  },
  collections: [
    Users,
    Media,
    Listings,
    Categories,
    Locations,
    Hosts,
    Amenities,
    Reviews,
    Bookings,
    Availability,
  ],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'YOUR_SECRET_HERE',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
      connectionTimeoutMillis: 5000,
      idleTimeoutMillis: 10000,
      max: 10,
    },
  }),
  cors: [
    process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3006',
  ].filter(Boolean),
  csrf: [
    process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3006',
  ].filter(Boolean),
})
