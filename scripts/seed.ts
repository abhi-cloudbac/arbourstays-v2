import { getPayload } from 'payload'
import config from '../payload.config'

const sampleCategories = [
  {
    name: 'Beach House',
    slug: 'beach-house',
    taxonomy: 'stay-type',
    description: 'Stunning beachfront properties with ocean views',
    icon: 'beach',
    listingCount: 0,
    isActive: true,
  },
  {
    name: 'Mountain Cabin',
    slug: 'mountain-cabin',
    taxonomy: 'stay-type',
    description: 'Cozy cabins nestled in the mountains',
    icon: 'cabin',
    listingCount: 0,
    isActive: true,
  },
  {
    name: 'City Apartment',
    slug: 'city-apartment',
    taxonomy: 'stay-type',
    description: 'Modern apartments in the heart of the city',
    icon: 'apartment',
    listingCount: 0,
    isActive: true,
  },
  {
    name: 'Villa',
    slug: 'villa',
    taxonomy: 'stay-type',
    description: 'Luxurious villas with private amenities',
    icon: 'villa',
    listingCount: 0,
    isActive: true,
  },
  {
    name: 'Countryside',
    slug: 'countryside',
    taxonomy: 'stay-type',
    description: 'Peaceful retreats in rural settings',
    icon: 'countryside',
    listingCount: 0,
    isActive: true,
  },
  {
    name: 'Lakehouse',
    slug: 'lakehouse',
    taxonomy: 'stay-type',
    description: 'Serene properties by the lake',
    icon: 'lake',
    listingCount: 0,
    isActive: true,
  },
]

const sampleAmenities = [
  { name: 'WiFi', slug: 'wifi', category: 'internet-office', icon: 'wifi', description: 'High-speed internet', isActive: true },
  { name: 'Pool', slug: 'pool', category: 'outdoor', icon: 'pool', description: 'Swimming pool', isActive: true },
  { name: 'Kitchen', slug: 'kitchen', category: 'kitchen-dining', icon: 'kitchen', description: 'Fully equipped kitchen', isActive: true },
  { name: 'Air Conditioning', slug: 'ac', category: 'heating-cooling', icon: 'ac', description: 'Central AC', isActive: true },
  { name: 'Parking', slug: 'parking', category: 'parking', icon: 'parking', description: 'Free parking on premises', isActive: true },
  { name: 'TV', slug: 'tv', category: 'entertainment', icon: 'tv', description: 'Smart TV with streaming', isActive: true },
  { name: 'Washer & Dryer', slug: 'washer-dryer', category: 'other', icon: 'washer', description: 'In-unit laundry', isActive: true },
  { name: 'Pet Friendly', slug: 'pet-friendly', category: 'other', icon: 'pet', description: 'Pets allowed', isActive: true },
  { name: 'Gym', slug: 'gym', category: 'other', icon: 'gym', description: 'Fitness center', isActive: true },
  { name: 'Balcony', slug: 'balcony', category: 'outdoor', icon: 'balcony', description: 'Private balcony', isActive: true },
  { name: 'BBQ Grill', slug: 'bbq-grill', category: 'outdoor', icon: 'bbq', description: 'Outdoor BBQ grill', isActive: true },
  { name: 'Hot Tub', slug: 'hot-tub', category: 'outdoor', icon: 'hot-tub', description: 'Private hot tub', isActive: true },
]

const sampleHosts = [
  {
    displayName: 'ArbourStays',
    handle: 'arbourstays',
    bio: 'Welcome to ArbourStays - your trusted platform for exceptional vacation rentals. We curate and manage premium properties to ensure unforgettable experiences for our guests.',
    email: 'hello@arbourstays.com',
    verified: true,
    joinedDate: new Date('2020-01-15').toISOString(),
    languages: [{ language: 'English' }],
    responseRate: 100,
    responseTime: 'within an hour',
    totalListings: 0,
    rating: 4.9,
    reviewCount: 524,
    isActive: true,
  },
]

const sampleListings = [
  {
    title: 'Stunning Beachfront Villa with Ocean Views',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'Experience luxury living in this stunning beachfront villa. Wake up to breathtaking ocean views and fall asleep to the sound of waves.' },
            ],
          },
        ],
      },
    },
    address: '123 Ocean Drive, Malibu, CA 90265',
    map: { lat: 34.0259, lng: -118.7798 },
    price: 450,
    maxGuests: 8,
    bedrooms: 4,
    beds: 5,
    bathrooms: 3,
    reviewStart: 4.9,
    reviewCount: 42,
    like: true,
    isAds: false,
    isActive: true,
    bookingSettings: {
      instantBook: true,
      minimumStay: 2,
      checkInTime: '3:00 PM',
      checkOutTime: '11:00 AM',
      cleaningFee: 150,
    },
  },
  {
    title: 'Cozy Mountain Cabin with Fireplace',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'Escape to the mountains in this cozy cabin. Perfect for a romantic getaway or family retreat with stunning mountain views.' },
            ],
          },
        ],
      },
    },
    address: '456 Mountain Road, Aspen, CO 81611',
    map: { lat: 39.1911, lng: -106.8175 },
    price: 280,
    maxGuests: 6,
    bedrooms: 3,
    beds: 4,
    bathrooms: 2,
    reviewStart: 4.8,
    reviewCount: 38,
    like: false,
    isAds: true,
    isActive: true,
    bookingSettings: {
      instantBook: false,
      minimumStay: 3,
      checkInTime: '4:00 PM',
      checkOutTime: '10:00 AM',
      cleaningFee: 100,
    },
  },
  {
    title: 'Modern Downtown Loft',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'Stylish loft in the heart of downtown. Walking distance to restaurants, shops, and entertainment. Perfect for city explorers.' },
            ],
          },
        ],
      },
    },
    address: '789 Broadway, New York, NY 10003',
    map: { lat: 40.7282, lng: -73.9942 },
    price: 320,
    maxGuests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    reviewStart: 4.7,
    reviewCount: 65,
    like: true,
    isAds: false,
    isActive: true,
    bookingSettings: {
      instantBook: true,
      minimumStay: 1,
      checkInTime: '3:00 PM',
      checkOutTime: '11:00 AM',
      cleaningFee: 75,
    },
  },
  {
    title: 'Luxury Villa with Private Pool',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'Indulge in luxury at this stunning villa featuring a private pool, gourmet kitchen, and expansive outdoor living spaces.' },
            ],
          },
        ],
      },
    },
    address: '321 Palm Avenue, Miami, FL 33139',
    map: { lat: 25.7907, lng: -80.1300 },
    price: 550,
    saleOff: '15% off',
    maxGuests: 10,
    bedrooms: 5,
    beds: 7,
    bathrooms: 4,
    reviewStart: 5.0,
    reviewCount: 28,
    like: true,
    isAds: true,
    isActive: true,
    bookingSettings: {
      instantBook: true,
      minimumStay: 3,
      checkInTime: '3:00 PM',
      checkOutTime: '11:00 AM',
      cleaningFee: 200,
    },
  },
  {
    title: 'Charming Countryside Cottage',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'Peaceful countryside retreat surrounded by nature. Perfect for those seeking tranquility and relaxation away from the city.' },
            ],
          },
        ],
      },
    },
    address: '567 Country Lane, Napa Valley, CA 94558',
    map: { lat: 38.2975, lng: -122.2869 },
    price: 220,
    maxGuests: 4,
    bedrooms: 2,
    beds: 3,
    bathrooms: 1,
    reviewStart: 4.6,
    reviewCount: 51,
    like: false,
    isAds: false,
    isActive: true,
    bookingSettings: {
      instantBook: false,
      minimumStay: 2,
      checkInTime: '3:00 PM',
      checkOutTime: '11:00 AM',
      cleaningFee: 80,
    },
  },
  {
    title: 'Serene Lakehouse Retreat',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'Beautiful lakehouse with private dock and stunning water views. Perfect for fishing, kayaking, and water activities.' },
            ],
          },
        ],
      },
    },
    address: '890 Lakeview Drive, Lake Tahoe, CA 96150',
    map: { lat: 39.0968, lng: -120.0324 },
    price: 380,
    maxGuests: 6,
    bedrooms: 3,
    beds: 4,
    bathrooms: 2,
    reviewStart: 4.8,
    reviewCount: 33,
    like: true,
    isAds: false,
    isActive: true,
    bookingSettings: {
      instantBook: true,
      minimumStay: 2,
      checkInTime: '3:00 PM',
      checkOutTime: '11:00 AM',
      cleaningFee: 120,
    },
  },
]

async function seed() {
  console.log('🌱 Starting seed process...')

  const payload = await getPayload({ config })

  try {
    // Clear existing data
    console.log('🗑️  Clearing existing data...')
    await payload.delete({
      collection: 'listings',
      where: {},
    })
    await payload.delete({
      collection: 'hosts',
      where: {},
    })
    await payload.delete({
      collection: 'amenities',
      where: {},
    })
    await payload.delete({
      collection: 'categories',
      where: {},
    })

    // Seed Categories
    console.log('📁 Seeding categories...')
    const categories = []
    for (const category of sampleCategories) {
      const created = await payload.create({
        collection: 'categories',
        data: category,
      })
      categories.push(created)
      console.log(`  ✅ Created category: ${created.name}`)
    }

    // Seed Amenities
    console.log('🏷️  Seeding amenities...')
    const amenities = []
    for (const amenity of sampleAmenities) {
      const created = await payload.create({
        collection: 'amenities',
        data: amenity,
      })
      amenities.push(created)
      console.log(`  ✅ Created amenity: ${created.name}`)
    }

    // Seed Hosts
    console.log('👥 Seeding hosts...')
    const hosts = []
    for (const host of sampleHosts) {
      const created = await payload.create({
        collection: 'hosts',
        data: host,
      })
      hosts.push(created)
      console.log(`  ✅ Created host: ${created.displayName}`)
    }

    // Seed Listings
    console.log('🏠 Seeding listings...')
    const categoryMapping = [
      categories[0], // Beach House
      categories[1], // Mountain Cabin
      categories[2], // City Apartment
      categories[3], // Villa
      categories[4], // Countryside
      categories[5], // Lakehouse
    ]

    // Use the single ArbourStays host for all listings
    const arbourStaysHost = hosts[0]

    for (let i = 0; i < sampleListings.length; i++) {
      const listing = sampleListings[i]
      const category = categoryMapping[i]

      // Select random amenities for each listing
      const selectedAmenities = amenities
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 5) + 4) // 4-8 amenities
        .map((a) => a.id)

      const created = await payload.create({
        collection: 'listings',
        data: {
          ...listing,
          listingCategory: category.id,
          host: arbourStaysHost.id,
          amenities: selectedAmenities,
        },
      })
      console.log(`  ✅ Created listing: ${created.title}`)
    }

    // Update category listing counts
    console.log('🔄 Updating category counts...')
    for (const category of categories) {
      const listings = await payload.find({
        collection: 'listings',
        where: {
          listingCategory: {
            equals: category.id,
          },
        },
      })
      await payload.update({
        collection: 'categories',
        id: category.id,
        data: {
          listingCount: listings.docs.length,
        },
      })
    }

    // Update host listing counts
    console.log('🔄 Updating host counts...')
    for (const host of hosts) {
      const listings = await payload.find({
        collection: 'listings',
        where: {
          host: {
            equals: host.id,
          },
        },
      })
      await payload.update({
        collection: 'hosts',
        id: host.id,
        data: {
          totalListings: listings.docs.length,
        },
      })
    }

    console.log('✨ Seed completed successfully!')
    console.log(`
📊 Summary:
   - ${categories.length} categories created
   - ${amenities.length} amenities created
   - 1 host created (ArbourStays)
   - ${sampleListings.length} listings created
    `)
  } catch (error) {
    console.error('❌ Error during seed:', error)
    throw error
  }

  process.exit(0)
}

seed()
