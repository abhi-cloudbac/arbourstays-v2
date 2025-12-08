'use client'

import { useState } from 'react'
import { checkAvailability, createBooking, type Booking, type Listing } from '@/lib/payload-api'
import ButtonPrimary from '@/shared/ButtonPrimary'
import { DescriptionDetails, DescriptionList, DescriptionTerm } from '@/shared/description-list'

interface BookingWidgetProps {
  listing: Listing
  userId?: string
}

export default function BookingWidget({ listing, userId }: BookingWidgetProps) {
  const [checkIn, setCheckIn] = useState<string>('')
  const [checkOut, setCheckOut] = useState<string>('')
  const [adults, setAdults] = useState<number>(1)
  const [children, setChildren] = useState<number>(0)
  const [isChecking, setIsChecking] = useState(false)
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null)
  const [isBooking, setIsBooking] = useState(false)
  const [bookingError, setBookingError] = useState<string | null>(null)

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const nights = calculateNights()
  const baseTotal = nights * listing.price
  const cleaningFee = listing.bookingSettings?.cleaningFee || 0
  const serviceFee = baseTotal * 0.12 // 12% service fee
  const tax = (baseTotal + serviceFee) * 0.08 // 8% tax
  const totalPrice = baseTotal + cleaningFee + serviceFee + tax

  const handleCheckAvailability = async () => {
    if (!checkIn || !checkOut) {
      setBookingError('Please select check-in and check-out dates')
      return
    }

    setIsChecking(true)
    setBookingError(null)

    try {
      const available = await checkAvailability(listing.id, checkIn, checkOut)
      setIsAvailable(available)

      if (!available) {
        setBookingError('This listing is not available for the selected dates')
      }
    } catch (error) {
      console.error('Error checking availability:', error)
      setBookingError('Failed to check availability. Please try again.')
      setIsAvailable(null)
    } finally {
      setIsChecking(false)
    }
  }

  const handleCreateBooking = async () => {
    if (!userId) {
      setBookingError('Please log in to make a booking')
      return
    }

    if (!isAvailable) {
      setBookingError('Please check availability first')
      return
    }

    const totalGuests = adults + children
    if (totalGuests > listing.maxGuests) {
      setBookingError(`This listing can accommodate maximum ${listing.maxGuests} guests`)
      return
    }

    setIsBooking(true)
    setBookingError(null)

    try {
      const bookingData: Partial<Booking> = {
        listing: listing.id,
        user: userId,
        dates: {
          checkIn,
          checkOut,
          nights,
        },
        guests: {
          adults,
          children,
          infants: 0,
          total: totalGuests,
        },
        pricing: {
          basePrice: listing.price,
          nightsTotal: baseTotal,
          cleaningFee,
          serviceFee,
          tax,
          discount: 0,
          totalPrice,
          currency: 'USD',
        },
        status: 'pending',
        paymentStatus: 'pending',
      }

      const booking = await createBooking(bookingData)

      // Redirect to checkout or payment page
      window.location.href = `/checkout?booking=${booking.bookingNumber}`
    } catch (error) {
      console.error('Error creating booking:', error)
      setBookingError('Failed to create booking. Please try again.')
    } finally {
      setIsBooking(false)
    }
  }

  return (
    <div className="listingSection__wrap sm:shadow-xl">
      {/* PRICE */}
      <div className="flex items-end text-2xl font-semibold sm:text-3xl">
        {listing.saleOff && (
          <span className="text-neutral-300 line-through">${listing.price}</span>
        )}
        <span className="mx-2">${listing.price}</span>
        <div className="pb-1">
          <span className="text-base font-normal text-neutral-500 dark:text-neutral-400">/night</span>
        </div>
      </div>

      {/* FORM */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col rounded-3xl border border-neutral-200 dark:border-neutral-700">
          {/* Date inputs */}
          <div className="flex flex-col gap-4 p-4">
            <div>
              <label htmlFor="checkIn" className="text-sm font-medium">
                Check-in
              </label>
              <input
                type="date"
                id="checkIn"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full rounded-lg border border-neutral-200 px-3 py-2 dark:border-neutral-700 dark:bg-neutral-800"
              />
            </div>
            <div>
              <label htmlFor="checkOut" className="text-sm font-medium">
                Check-out
              </label>
              <input
                type="date"
                id="checkOut"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                min={checkIn || new Date().toISOString().split('T')[0]}
                className="w-full rounded-lg border border-neutral-200 px-3 py-2 dark:border-neutral-700 dark:bg-neutral-800"
              />
            </div>
          </div>

          <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>

          {/* Guest inputs */}
          <div className="flex flex-col gap-4 p-4">
            <div>
              <label htmlFor="adults" className="text-sm font-medium">
                Adults
              </label>
              <input
                type="number"
                id="adults"
                value={adults}
                onChange={(e) => setAdults(parseInt(e.target.value) || 1)}
                min={1}
                max={listing.maxGuests}
                className="w-full rounded-lg border border-neutral-200 px-3 py-2 dark:border-neutral-700 dark:bg-neutral-800"
              />
            </div>
            <div>
              <label htmlFor="children" className="text-sm font-medium">
                Children
              </label>
              <input
                type="number"
                id="children"
                value={children}
                onChange={(e) => setChildren(parseInt(e.target.value) || 0)}
                min={0}
                max={listing.maxGuests - adults}
                className="w-full rounded-lg border border-neutral-200 px-3 py-2 dark:border-neutral-700 dark:bg-neutral-800"
              />
            </div>
          </div>
        </div>

        {/* Check availability button */}
        {checkIn && checkOut && (
          <ButtonPrimary
            onClick={handleCheckAvailability}
            disabled={isChecking}
            className="w-full"
          >
            {isChecking ? 'Checking...' : 'Check Availability'}
          </ButtonPrimary>
        )}

        {/* Availability status */}
        {isAvailable !== null && (
          <div
            className={`rounded-lg p-3 text-sm ${
              isAvailable
                ? 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                : 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-400'
            }`}
          >
            {isAvailable
              ? '✓ Available for your selected dates'
              : '✗ Not available for these dates'}
          </div>
        )}

        {/* Error message */}
        {bookingError && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-400">
            {bookingError}
          </div>
        )}
      </div>

      {/* Pricing breakdown */}
      {nights > 0 && (
        <DescriptionList>
          <DescriptionTerm>
            ${listing.price} x {nights} {nights === 1 ? 'night' : 'nights'}
          </DescriptionTerm>
          <DescriptionDetails className="sm:text-right">
            ${baseTotal.toFixed(2)}
          </DescriptionDetails>

          {cleaningFee > 0 && (
            <>
              <DescriptionTerm>Cleaning fee</DescriptionTerm>
              <DescriptionDetails className="sm:text-right">
                ${cleaningFee.toFixed(2)}
              </DescriptionDetails>
            </>
          )}

          <DescriptionTerm>Service fee</DescriptionTerm>
          <DescriptionDetails className="sm:text-right">
            ${serviceFee.toFixed(2)}
          </DescriptionDetails>

          <DescriptionTerm>Taxes</DescriptionTerm>
          <DescriptionDetails className="sm:text-right">${tax.toFixed(2)}</DescriptionDetails>

          <DescriptionTerm className="font-semibold text-neutral-900 dark:text-neutral-100">
            Total
          </DescriptionTerm>
          <DescriptionDetails className="font-semibold sm:text-right">
            ${totalPrice.toFixed(2)}
          </DescriptionDetails>
        </DescriptionList>
      )}

      {/* RESERVE BUTTON */}
      {isAvailable && (
        <ButtonPrimary
          onClick={handleCreateBooking}
          disabled={isBooking || !userId}
          className="w-full"
        >
          {isBooking ? 'Processing...' : userId ? 'Reserve' : 'Log in to Reserve'}
        </ButtonPrimary>
      )}

      {/* Booking settings info */}
      {listing.bookingSettings && (
        <div className="mt-4 text-xs text-neutral-500 dark:text-neutral-400">
          <p>Check-in: {listing.bookingSettings.checkInTime}</p>
          <p>Check-out: {listing.bookingSettings.checkOutTime}</p>
          {listing.bookingSettings.minimumStay > 1 && (
            <p>Minimum stay: {listing.bookingSettings.minimumStay} nights</p>
          )}
        </div>
      )}
    </div>
  )
}
