/**
 * Payload CMS REST API Client
 *
 * This module provides utility functions to interact with Payload CMS REST API
 * for fetching listings, categories, hosts, reviews, and managing bookings.
 */

const PAYLOAD_API_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000/api'

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
 * Generic fetch function for Payload API
 */
async function payloadFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${PAYLOAD_API_URL}${endpoint}`

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      cache: 'no-store', // Disable caching for development
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Payload API error (${response.status}):`, errorText)
      throw new Error(`Payload API error: ${response.statusText} - ${errorText}`)
    }

    return response.json()
  } catch (error) {
    console.error('Error fetching from Payload:', error)
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
  featuredImage: string | { url: string; alt?: string }
  galleryImgs: Array<{ image: string | { url: string; alt?: string } }>
  price: number
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
  minPrice?: number
  maxPrice?: number
  guests?: number
  bedrooms?: number
}): Promise<PayloadResponse<Listing>> {
  const searchParams = new URLSearchParams()

  if (params?.limit) searchParams.set('limit', params.limit.toString())
  if (params?.page) searchParams.set('page', params.page.toString())
  if (params?.category) searchParams.set('where[listingCategory][equals]', params.category)
  if (params?.minPrice) searchParams.set('where[price][greater_than_equal]', params.minPrice.toString())
  if (params?.maxPrice) searchParams.set('where[price][less_than_equal]', params.maxPrice.toString())
  if (params?.guests) searchParams.set('where[maxGuests][greater_than_equal]', params.guests.toString())
  if (params?.bedrooms) searchParams.set('where[bedrooms][equals]', params.bedrooms.toString())

  // Only show active listings
  searchParams.set('where[isActive][equals]', 'true')
  searchParams.set('depth', '2')

  return payloadFetch<PayloadResponse<Listing>>(`/listings?${searchParams.toString()}`)
}

export async function getListingBySlug(slug: string): Promise<Listing | null> {
  try {
    const response = await payloadFetch<PayloadResponse<Listing>>(
      `/listings?where[slug][equals]=${slug}&depth=2`
    )
    return response.docs[0] || null
  } catch (error) {
    console.error('Error fetching listing:', error)
    return null
  }
}

export async function getListingById(id: string): Promise<Listing | null> {
  try {
    return await payloadFetch<Listing>(`/listings/${id}?depth=2`)
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
  const searchParams = new URLSearchParams()
  searchParams.set('where[isActive][equals]', 'true')
  searchParams.set('limit', '100')

  if (taxonomy) {
    searchParams.set('where[taxonomy][equals]', taxonomy)
  }

  const response = await payloadFetch<PayloadResponse<Category>>(
    `/categories?${searchParams.toString()}`
  )
  return response.docs
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const response = await payloadFetch<PayloadResponse<Category>>(
      `/categories?where[slug][equals]=${slug}`
    )
    return response.docs[0] || null
  } catch (error) {
    console.error('Error fetching category:', error)
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
  const response = await payloadFetch<PayloadResponse<Host>>(
    '/hosts?where[isActive][equals]=true&limit=100'
  )
  return response.docs
}

export async function getHostByHandle(handle: string): Promise<Host | null> {
  try {
    const response = await payloadFetch<PayloadResponse<Host>>(
      `/hosts?where[handle][equals]=${handle}`
    )
    return response.docs[0] || null
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
  const searchParams = new URLSearchParams()
  searchParams.set('where[isActive][equals]', 'true')
  searchParams.set('limit', '100')

  if (category) {
    searchParams.set('where[category][equals]', category)
  }

  const response = await payloadFetch<PayloadResponse<Amenity>>(
    `/amenities?${searchParams.toString()}`
  )
  return response.docs
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
  const response = await payloadFetch<PayloadResponse<Review>>(
    `/reviews?where[listing][equals]=${listingId}&where[isActive][equals]=true&limit=100&depth=1`
  )
  return response.docs
}

export async function createReview(reviewData: Partial<Review>): Promise<Review> {
  return payloadFetch<Review>('/reviews', {
    method: 'POST',
    body: JSON.stringify(reviewData),
  })
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
    const response = await payloadFetch<PayloadResponse<Availability>>(
      `/availability?where[listing][equals]=${listingId}&where[dateRange.startDate][less_than_equal]=${endDate}&where[dateRange.endDate][greater_than_equal]=${startDate}&where[status][not_equals]=available`
    )
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
  const searchParams = new URLSearchParams()
  searchParams.set('where[listing][equals]', listingId)

  if (startDate) {
    searchParams.set('where[dateRange.endDate][greater_than_equal]', startDate)
  }
  if (endDate) {
    searchParams.set('where[dateRange.startDate][less_than_equal]', endDate)
  }

  const response = await payloadFetch<PayloadResponse<Availability>>(
    `/availability?${searchParams.toString()}`
  )
  return response.docs
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
  return payloadFetch<Booking>('/bookings', {
    method: 'POST',
    body: JSON.stringify(bookingData),
  })
}

export async function getBookingsForUser(userId: string): Promise<Booking[]> {
  const response = await payloadFetch<PayloadResponse<Booking>>(
    `/bookings?where[user][equals]=${userId}&depth=2`
  )
  return response.docs
}

export async function getBookingByNumber(bookingNumber: string): Promise<Booking | null> {
  try {
    const response = await payloadFetch<PayloadResponse<Booking>>(
      `/bookings?where[bookingNumber][equals]=${bookingNumber}&depth=2`
    )
    return response.docs[0] || null
  } catch (error) {
    console.error('Error fetching booking:', error)
    return null
  }
}

export async function updateBookingStatus(
  bookingId: string,
  status: Booking['status']
): Promise<Booking> {
  return payloadFetch<Booking>(`/bookings/${bookingId}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  })
}
