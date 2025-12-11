/**
 * Payload CMS Local API Client
 *
 * This module provides utility functions to interact with Payload CMS using the local API
 * for fetching listings, categories, hosts, reviews, and managing bookings.
 */

import { getPayload } from 'payload'
import config from '@payload-config'

interface PayloadResponse<T> {
  docs: T[]
  totalDocs: number
  limit: number
  page: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

interface PayloadSingleResponse<T> {
  doc: T
}

/**
 * Get Payload instance with timeout
 */
async function getPayloadInstance() {
  try {
    // Add a timeout to prevent hanging
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Payload initialization timeout')), 5000)
    )

    const payloadPromise = getPayload({ config })

    return await Promise.race([payloadPromise, timeoutPromise]) as any
  } catch (error) {
    console.error('Error initializing Payload:', error)
    throw error
  }
}

/**
 * LISTINGS
 */

export interface Listing {
  id: string
  title: string
  slug: string
  handle: string
  description: any
  listingCategory: string | { id: string; name: string; slug: string }
  host: string | {
    id: string
    displayName: string
    handle: string
    avatarUrl: string
  }
  location?: string | {
    id: string
    name: string
    slug: string
    country: string
  }
  featuredImage: string | { url: string; alt?: string }
  galleryImgs: Array<{ image: string | { url: string; alt?: string } }>
  price: number
  currency: string
  saleOff?: string
  address: string
  map: { lat: number; lng: number }
  maxGuests: number
  bedrooms: number
  beds: number
  bathrooms: number
  amenities: string[] | Array<{ id: string; name: string }>
  reviewStart: number
  reviewCount: number
  like: boolean
  isAds: boolean
  isActive: boolean
  bookingSettings: {
    instantBook: boolean
    minimumStay: number
    maximumStay?: number
    checkInTime: string
    checkOutTime: string
    cleaningFee: number
  }
  date: string
  viewCount: number
}

export async function getListings(params?: {
  limit?: number
  page?: number
  category?: string
  location?: string
  minPrice?: number
  maxPrice?: number
  guests?: number
  bedrooms?: number
}): Promise<PayloadResponse<Listing>> {
  const payload = await getPayloadInstance()

  const where: any = {
    isActive: { equals: true }
  }

  if (params?.category) where.listingCategory = { equals: params.category }
  if (params?.location) where.location = { equals: params.location }
  if (params?.minPrice) where.price = { ...where.price, greater_than_equal: params.minPrice }
  if (params?.maxPrice) where.price = { ...where.price, less_than_equal: params.maxPrice }
  if (params?.guests) where.maxGuests = { greater_than_equal: params.guests }
  if (params?.bedrooms) where.bedrooms = { equals: params.bedrooms }

  const result = await payload.find({
    collection: 'listings',
    where,
    limit: params?.limit || 10,
    page: params?.page || 1,
    depth: 2,
  })

  return result as PayloadResponse<Listing>
}

export async function getListingBySlug(slug: string): Promise<Listing | null> {
  try {
    const payload = await getPayloadInstance()
    const response = await payload.find({
      collection: 'listings',
      where: { slug: { equals: slug } },
      depth: 2,
      limit: 1,
    })
    return (response.docs[0] as Listing) || null
  } catch (error) {
    console.error('Error fetching listing:', error)
    return null
  }
}

export async function getListingByHandle(handle: string): Promise<Listing | null> {
  try {
    const payload = await getPayloadInstance()
    const response = await payload.find({
      collection: 'listings',
      where: { handle: { equals: handle } },
      depth: 2,
      limit: 1,
    })
    return (response.docs[0] as Listing) || null
  } catch (error) {
    console.error('Error fetching listing:', error)
    return null
  }
}

export async function getListingById(id: string): Promise<Listing | null> {
  try {
    const payload = await getPayloadInstance()
    const result = await payload.findByID({
      collection: 'listings',
      id,
      depth: 2,
    })
    return result as Listing
  } catch (error) {
    console.error('Error fetching listing:', error)
    return null
  }
}

/**
 * CATEGORIES
 */

export interface Category {
  id: string
  name: string
  slug: string
  taxonomy: 'stay-type' | 'property-feature' | 'location-type'
  description?: string
  icon?: string
  featuredImage?: string | { url: string; alt?: string }
  listingCount: number
  isActive: boolean
}

export async function getCategories(taxonomy?: string): Promise<Category[]> {
  const payload = await getPayloadInstance()

  const where: any = {
    isActive: { equals: true }
  }

  if (taxonomy) {
    where.taxonomy = { equals: taxonomy }
  }

  const response = await payload.find({
    collection: 'categories',
    where,
    limit: 100,
  })

  return response.docs as Category[]
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const payload = await getPayloadInstance()
    const response = await payload.find({
      collection: 'categories',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    return (response.docs[0] as Category) || null
  } catch (error) {
    console.error('Error fetching category:', error)
    return null
  }
}

/**
 * LOCATIONS
 */

export interface Location {
  id: string
  name: string
  slug: string
  country: string
  region?: string
  coordinates: { lat: number; lng: number }
  featuredImage?: string | { url: string; alt?: string }
  description?: string
  listingCount: number
  isFeatured: boolean
  displayOrder: number
  isActive: boolean
}

export async function getLocations(params?: {
  featured?: boolean
  limit?: number
}): Promise<Location[]> {
  const payload = await getPayloadInstance()

  const where: any = {
    isActive: { equals: true }
  }

  if (params?.featured) {
    where.isFeatured = { equals: true }
  }

  const response = await payload.find({
    collection: 'locations',
    where,
    limit: params?.limit || 100,
    sort: 'displayOrder',
  })

  return response.docs as Location[]
}

export async function getLocationBySlug(slug: string): Promise<Location | null> {
  try {
    const payload = await getPayloadInstance()
    const response = await payload.find({
      collection: 'locations',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    return (response.docs[0] as Location) || null
  } catch (error) {
    console.error('Error fetching location:', error)
    return null
  }
}

/**
 * HOSTS
 */

export interface Host {
  id: string
  displayName: string
  handle: string
  avatarUrl?: string | { url: string }
  bio?: string
  verified: boolean
  joinedDate: string
  languages?: Array<{ language: string }>
  responseRate?: number
  responseTime?: string
  totalListings: number
  rating?: number
  reviewCount: number
  isActive: boolean
}

export async function getHosts(): Promise<Host[]> {
  const payload = await getPayloadInstance()
  const response = await payload.find({
    collection: 'hosts',
    where: { isActive: { equals: true } },
    limit: 100,
  })
  return response.docs as Host[]
}

export async function getHostByHandle(handle: string): Promise<Host | null> {
  try {
    const payload = await getPayloadInstance()
    const response = await payload.find({
      collection: 'hosts',
      where: { handle: { equals: handle } },
      limit: 1,
    })
    return (response.docs[0] as Host) || null
  } catch (error) {
    console.error('Error fetching host:', error)
    return null
  }
}

/**
 * AMENITIES
 */

export interface Amenity {
  id: string
  name: string
  slug: string
  category: string
  icon?: string
  description?: string
  isActive: boolean
}

export async function getAmenities(category?: string): Promise<Amenity[]> {
  const payload = await getPayloadInstance()

  const where: any = {
    isActive: { equals: true }
  }

  if (category) {
    where.category = { equals: category }
  }

  const response = await payload.find({
    collection: 'amenities',
    where,
    limit: 100,
  })

  return response.docs as Amenity[]
}

/**
 * REVIEWS
 */

export interface Review {
  id: string
  listing: string
  user: string | { id: string; email: string }
  title?: string
  comment: string
  rating: number
  categoryRatings?: {
    cleanliness?: number
    accuracy?: number
    checkIn?: number
    communication?: number
    location?: number
    value?: number
  }
  date: string
  stayDate?: string
  verified: boolean
  images?: Array<{ image: string | { url: string } }>
  hostResponse?: {
    comment: string
    date: string
  }
  helpful: number
  isActive: boolean
}

export async function getReviewsForListing(listingId: string): Promise<Review[]> {
  const payload = await getPayloadInstance()
  const response = await payload.find({
    collection: 'reviews',
    where: {
      listing: { equals: listingId },
      isActive: { equals: true }
    },
    limit: 100,
    depth: 1,
  })
  return response.docs as Review[]
}

export async function createReview(reviewData: Partial<Review>): Promise<Review> {
  const payload = await getPayloadInstance()
  const result = await payload.create({
    collection: 'reviews',
    data: reviewData as any,
  })
  return result as Review
}

/**
 * AVAILABILITY
 */

export interface Availability {
  id: string
  listing: string
  dateRange: {
    startDate: string
    endDate: string
  }
  status: 'available' | 'booked' | 'blocked' | 'maintenance'
  availableGuests?: number
  priceOverride?: {
    enabled: boolean
    price?: number
    currency?: string
  }
  minimumStay?: number
  maximumStay?: number
  booking?: string
}

export async function checkAvailability(
  listingId: string,
  startDate: string,
  endDate: string
): Promise<boolean> {
  try {
    const payload = await getPayloadInstance()
    const response = await payload.find({
      collection: 'availability',
      where: {
        listing: { equals: listingId },
        'dateRange.startDate': { less_than_equal: endDate },
        'dateRange.endDate': { greater_than_equal: startDate },
        status: { not_equals: 'available' }
      },
    })
    // If there are any non-available periods, the listing is not available
    return response.docs.length === 0
  } catch (error) {
    console.error('Error checking availability:', error)
    return false
  }
}

export async function getAvailabilityForListing(
  listingId: string,
  startDate?: string,
  endDate?: string
): Promise<Availability[]> {
  const payload = await getPayloadInstance()

  const where: any = {
    listing: { equals: listingId }
  }

  if (startDate) {
    where['dateRange.endDate'] = { greater_than_equal: startDate }
  }
  if (endDate) {
    where['dateRange.startDate'] = { less_than_equal: endDate }
  }

  const response = await payload.find({
    collection: 'availability',
    where,
  })

  return response.docs as Availability[]
}

/**
 * BOOKINGS
 */

export interface Booking {
  id: string
  bookingNumber: string
  listing: string | Listing
  user: string
  dates: {
    checkIn: string
    checkOut: string
    nights: number
  }
  guests: {
    adults: number
    children: number
    infants: number
    total: number
  }
  pricing: {
    basePrice: number
    nightsTotal: number
    cleaningFee: number
    serviceFee: number
    tax: number
    discount: number
    totalPrice: number
    currency: string
  }
  status: 'pending' | 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled' | 'completed'
  paymentStatus: 'pending' | 'paid' | 'partially-paid' | 'refunded' | 'failed'
  paymentMethod?: string
  guestMessage?: string
  specialRequests?: string
  createdAt: string
}

export async function createBooking(bookingData: Partial<Booking>): Promise<Booking> {
  const payload = await getPayloadInstance()
  const result = await payload.create({
    collection: 'bookings',
    data: bookingData as any,
  })
  return result as Booking
}

export async function getBookingsForUser(userId: string): Promise<Booking[]> {
  const payload = await getPayloadInstance()
  const response = await payload.find({
    collection: 'bookings',
    where: { user: { equals: userId } },
    depth: 2,
  })
  return response.docs as Booking[]
}

export async function getBookingByNumber(bookingNumber: string): Promise<Booking | null> {
  try {
    const payload = await getPayloadInstance()
    const response = await payload.find({
      collection: 'bookings',
      where: { bookingNumber: { equals: bookingNumber } },
      depth: 2,
      limit: 1,
    })
    return (response.docs[0] as Booking) || null
  } catch (error) {
    console.error('Error fetching booking:', error)
    return null
  }
}

export async function updateBookingStatus(
  bookingId: string,
  status: Booking['status']
): Promise<Booking> {
  const payload = await getPayloadInstance()
  const result = await payload.update({
    collection: 'bookings',
    id: bookingId,
    data: { status } as any,
  })
  return result as Booking
}
