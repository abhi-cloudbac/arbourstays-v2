/**
 * Data Transformers
 *
 * Utility functions to transform Payload CMS data into formats expected by frontend components.
 * This bridges the gap between Payload's data structure and the existing component interfaces.
 */

import type { Listing, Category, Host, Review, Amenity, Location } from './payload-api'
import type { TStayListing } from '@/data/types'

/**
 * Transform Payload Listing to frontend TStayListing format
 */
export function transformListingToStayListing(listing: Listing): TStayListing {
  // Handle host data - it could be populated or just an ID
  const hostData = typeof listing.host === 'object' ? listing.host : null

  // Handle category data
  const categoryData = typeof listing.listingCategory === 'object' ? listing.listingCategory : null

  // Handle location data
  const locationData = typeof listing.location === 'object' ? listing.location : null

  // Handle featured image
  const featuredImageUrl = listing.featuredImage && typeof listing.featuredImage === 'object'
    ? listing.featuredImage.url
    : listing.featuredImage

  // Handle gallery images
  const galleryImgs = listing.galleryImgs?.map((item) => {
    if (typeof item.image === 'object') {
      return item.image.url
    }
    return item.image as string
  }) || []

  // Handle amenities
  const amenities = listing.amenities?.map((amenity) => {
    if (typeof amenity === 'object') {
      return amenity.name
    }
    return amenity as string
  }) || []

  return {
    id: listing.id,
    locationId: locationData?.id || '',
    locationName: locationData?.name || '',
    locationSlug: locationData?.slug || '',
    date: listing.date,
    listingCategory: categoryData?.name || 'Stay',
    title: listing.title,
    handle: listing.handle || listing.slug || listing.id, // Fallback to slug or id if handle is missing
    description: listing.description ? JSON.stringify(listing.description) : '',
    featuredImage: featuredImageUrl || '',
    galleryImgs,
    like: listing.like,
    address: listing.address,
    reviewStart: listing.reviewStart || 0,
    reviewCount: listing.reviewCount || 0,
    price: `$${listing.price}`,
    maxGuests: listing.maxGuests,
    bedrooms: listing.bedrooms,
    bathrooms: listing.bathrooms,
    beds: listing.beds,
    saleOff: listing.saleOff || null,
    isAds: listing.isAds || null,
    map: listing.map,
    host: hostData ? {
      displayName: hostData.displayName,
      handle: hostData.handle || 'host', // Fallback for host handle
      avatarUrl: hostData.avatarUrl && typeof hostData.avatarUrl === 'object'
        ? hostData.avatarUrl.url
        : hostData.avatarUrl || '',
    } : {
      displayName: 'Host',
      handle: 'host',
      avatarUrl: '',
    },
    amenities,
  }
}

/**
 * Transform array of Payload Listings to TStayListing array
 */
export function transformListingsToStayListings(listings: Listing[]): TStayListing[] {
  return listings.map(transformListingToStayListing)
}

/**
 * Transform Payload Category to frontend format
 */
export function transformCategory(category: Category) {
  const featuredImageUrl = category.featuredImage && typeof category.featuredImage === 'object'
    ? category.featuredImage.url
    : category.featuredImage

  // Generate href based on taxonomy
  const basePath = category.taxonomy === 'stay-type' ? '/stay-categories'
    : category.taxonomy === 'experience-type' ? '/experience-categories'
    : category.taxonomy === 'car-type' ? '/car-categories'
    : category.taxonomy === 'real-estate-type' ? '/real-estate-categories'
    : '/stay-categories' // default fallback

  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    handle: category.slug, // Using slug as handle
    href: `${basePath}/${category.slug}`, // Add href for Link components
    taxonomy: category.taxonomy,
    description: category.description || '',
    icon: category.icon || '',
    coverImage: featuredImageUrl || '',
    thumbnail: featuredImageUrl || '', // Add thumbnail property
    count: category.listingCount || 0,
    listingCount: category.listingCount,
    isActive: category.isActive,
    // Additional fields that might be expected by components
    region: 'Worldwide', // Default value, could be customized
  }
}

/**
 * Transform array of Payload Categories
 */
export function transformCategories(categories: Category[]) {
  return categories.map(transformCategory)
}

/**
 * Transform Payload Location to frontend format
 */
export function transformLocation(location: Location) {
  const featuredImageUrl = location.featuredImage && typeof location.featuredImage === 'object'
    ? location.featuredImage.url
    : location.featuredImage

  return {
    id: location.id,
    name: location.name,
    slug: location.slug,
    country: location.country,
    region: location.region || '',
    coordinates: location.coordinates,
    featuredImage: featuredImageUrl || '',
    description: location.description || '',
    listingCount: location.listingCount || 0,
    isFeatured: location.isFeatured,
    displayOrder: location.displayOrder,
    isActive: location.isActive,
  }
}

/**
 * Transform array of Payload Locations
 */
export function transformLocations(locations: Location[]) {
  return locations.map(transformLocation)
}

/**
 * Transform Payload Host to frontend format
 */
export function transformHost(host: Host) {
  const avatarUrl = host.avatarUrl && typeof host.avatarUrl === 'object'
    ? host.avatarUrl.url
    : host.avatarUrl

  return {
    id: host.id,
    displayName: host.displayName,
    handle: host.handle,
    avatarUrl: avatarUrl || '',
    bio: host.bio || '',
    verified: host.verified,
    joinedDate: host.joinedDate,
    languages: host.languages?.map(l => l.language) || [],
    responseRate: host.responseRate,
    responseTime: host.responseTime,
    totalListings: host.totalListings,
    rating: host.rating,
    reviewCount: host.reviewCount,
    isActive: host.isActive,
  }
}

/**
 * Transform Payload Review to frontend format
 */
export function transformReview(review: Review) {
  const userData = typeof review.user === 'object' ? review.user : null

  return {
    id: review.id,
    listing: review.listing,
    user: userData ? {
      id: userData.id,
      email: userData.email,
      displayName: userData.email.split('@')[0], // Use email prefix as display name
    } : null,
    title: review.title || '',
    comment: review.comment,
    rating: review.rating,
    categoryRatings: review.categoryRatings,
    date: review.date,
    stayDate: review.stayDate,
    verified: review.verified,
    images: review.images?.map(img => {
      if (typeof img.image === 'object') {
        return img.image.url
      }
      return img.image as string
    }) || [],
    hostResponse: review.hostResponse,
    helpful: review.helpful,
    isActive: review.isActive,
  }
}

/**
 * Transform array of Payload Reviews
 */
export function transformReviews(reviews: Review[]) {
  return reviews.map(transformReview)
}

/**
 * Transform Payload Amenity to frontend format
 */
export function transformAmenity(amenity: Amenity) {
  return {
    id: amenity.id,
    name: amenity.name,
    slug: amenity.slug,
    category: amenity.category,
    icon: amenity.icon || '',
    description: amenity.description || '',
    isActive: amenity.isActive,
  }
}

/**
 * Extract media URL from Payload media object or string
 */
export function getMediaUrl(media: string | { url: string; alt?: string } | undefined): string {
  if (!media) return ''
  if (typeof media === 'string') return media
  return media.url
}

/**
 * Format price for display
 */
export function formatPrice(price: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(price)
}

/**
 * Calculate average rating from category ratings
 */
export function calculateAverageRating(categoryRatings?: {
  cleanliness?: number
  accuracy?: number
  checkIn?: number
  communication?: number
  location?: number
  value?: number
}): number {
  if (!categoryRatings) return 0

  const ratings = Object.values(categoryRatings).filter((r): r is number => r !== undefined)
  if (ratings.length === 0) return 0

  const sum = ratings.reduce((acc, rating) => acc + rating, 0)
  return sum / ratings.length
}
