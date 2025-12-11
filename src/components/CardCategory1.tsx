import { TCategory } from '@/data/categories'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

export interface CardCategory1Props {
  className?: string
  category: TCategory
  size?: 'large' | 'normal'
}

const CardCategory1: FC<CardCategory1Props> = ({ className = '', size = 'normal', category }) => {
  const { count, name, href, thumbnail } = category
  return (
    <Link href={href} className={`flex items-center ${className}`}>
      <div className={`relative shrink-0 ${size === 'large' ? 'size-20' : 'size-12'} me-4 overflow-hidden rounded-lg`}>
        {thumbnail ? (
          <Image alt={name} fill src={thumbnail} />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-neutral-200 dark:bg-neutral-700">
            <span className={`${size === 'large' ? 'text-2xl' : 'text-lg'} font-semibold text-neutral-400 dark:text-neutral-500`}>
              {name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      <div>
        <h2
          className={`${
            size === 'large' ? 'text-lg' : 'text-base'
          } font-semibold nc-card-title text-neutral-900 dark:text-neutral-100`}
        >
          {name}
        </h2>
        <span
          className={`${size === 'large' ? 'text-sm' : 'text-xs'} mt-0.5 block text-neutral-500 dark:text-neutral-400`}
        >
          {count}+ properties
        </span>
      </div>
    </Link>
  )
}

export default CardCategory1
