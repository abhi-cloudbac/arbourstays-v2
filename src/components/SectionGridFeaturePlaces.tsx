'use client'

import { TStayListing } from '@/data/listings'
import ButtonPrimary from '@/shared/ButtonPrimary'
import T from '@/utils/getT'
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import { FC, ReactNode, useState, useMemo } from 'react'
import SectionTabHeader from './SectionTabHeader'
import StayCard from './StayCard'
import StayCard2 from './StayCard2'

//
interface Location {
  id: string
  name: string
  slug: string
  [key: string]: any
}

interface SectionGridFeaturePlacesProps {
  stayListings: TStayListing[]
  locations?: Location[]
  gridClass?: string
  heading?: ReactNode
  subHeading?: string
  headingIsCenter?: boolean
  cardType?: 'card1' | 'card2'
}

const SectionGridFeaturePlaces: FC<SectionGridFeaturePlacesProps> = ({
  stayListings = [],
  locations = [],
  gridClass = '',
  heading = 'Featured places to stay.',
  subHeading = 'Keep calm & travel on',
  cardType = 'card2',
}) => {
  // Create tabs from locations, add "All" as first option
  const tabs = useMemo(() => {
    const locationNames = locations.map((loc) => loc.name)
    return ['All', ...locationNames]
  }, [locations])

  // State for active tab
  const [activeTab, setActiveTab] = useState(tabs[0] || 'All')

  // Filter listings based on selected location
  const filteredListings = useMemo(() => {
    if (activeTab === 'All' || !activeTab) {
      return stayListings
    }

    // Find the location object for the active tab
    const activeLocation = locations.find((loc) => loc.name === activeTab)
    if (!activeLocation) {
      return stayListings
    }

    // Filter listings by location
    return stayListings.filter((listing) => {
      return listing.locationId === activeLocation.id || listing.locationName === activeLocation.name
    })
  }, [activeTab, stayListings, locations])

  // Handle tab change
  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName)
  }

  let CardName = StayCard
  if (cardType === 'card1') {
    CardName = StayCard
  } else if (cardType === 'card2') {
    CardName = StayCard2
  }

  return (
    <div className="relative">
      <SectionTabHeader
        tabActive={activeTab}
        subHeading={subHeading}
        tabs={tabs}
        heading={heading}
        onChangeTab={handleTabChange}
      />
      <div
        className={`mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-2 md:gap-x-8 md:gap-y-12 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}
      >
        {filteredListings.length > 0 ? (
          filteredListings.map((stay) => (
            <CardName key={stay.id} data={stay} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <p className="text-neutral-500 dark:text-neutral-400">
              No listings found for {activeTab}
            </p>
          </div>
        )}
      </div>
      <div className="mt-16 flex items-center justify-center">
        <ButtonPrimary href={'/stay-categories/all'}>
          {T['common']['Show me more']}
          <ArrowRightIcon className="h-5 w-5 rtl:rotate-180" />
        </ButtonPrimary>
      </div>
    </div>
  )
}

export default SectionGridFeaturePlaces
