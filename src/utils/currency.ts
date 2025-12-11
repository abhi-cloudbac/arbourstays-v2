/**
 * Currency utility functions
 * Handles currency formatting and symbols across the application
 */

export type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'GBP' | 'AUD' | 'CAD' | 'JPY' | 'CHF'

interface CurrencyInfo {
  symbol: string
  code: string
  name: string
  position: 'before' | 'after'
  decimalPlaces: number
}

export const CURRENCIES: Record<CurrencyCode, CurrencyInfo> = {
  INR: {
    symbol: '₹',
    code: 'INR',
    name: 'Indian Rupee',
    position: 'before',
    decimalPlaces: 0,
  },
  USD: {
    symbol: '$',
    code: 'USD',
    name: 'US Dollar',
    position: 'before',
    decimalPlaces: 0,
  },
  EUR: {
    symbol: '€',
    code: 'EUR',
    name: 'Euro',
    position: 'before',
    decimalPlaces: 0,
  },
  GBP: {
    symbol: '£',
    code: 'GBP',
    name: 'British Pound',
    position: 'before',
    decimalPlaces: 0,
  },
  AUD: {
    symbol: 'A$',
    code: 'AUD',
    name: 'Australian Dollar',
    position: 'before',
    decimalPlaces: 0,
  },
  CAD: {
    symbol: 'C$',
    code: 'CAD',
    name: 'Canadian Dollar',
    position: 'before',
    decimalPlaces: 0,
  },
  JPY: {
    symbol: '¥',
    code: 'JPY',
    name: 'Japanese Yen',
    position: 'before',
    decimalPlaces: 0,
  },
  CHF: {
    symbol: 'CHF',
    code: 'CHF',
    name: 'Swiss Franc',
    position: 'before',
    decimalPlaces: 0,
  },
}

/**
 * Get currency symbol for a given currency code
 */
export function getCurrencySymbol(currencyCode: string): string {
  const currency = CURRENCIES[currencyCode as CurrencyCode]
  return currency?.symbol || currencyCode
}

/**
 * Format price with currency symbol
 */
export function formatPrice(price: number, currencyCode: string): string {
  const currency = CURRENCIES[currencyCode as CurrencyCode]

  if (!currency) {
    return `${price}`
  }

  // Format number with thousand separators
  const formattedNumber = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: currency.decimalPlaces,
    maximumFractionDigits: currency.decimalPlaces,
  }).format(price)

  // Position symbol
  if (currency.position === 'before') {
    return `${currency.symbol}${formattedNumber}`
  } else {
    return `${formattedNumber}${currency.symbol}`
  }
}

/**
 * Format price with full currency code (for accessibility)
 */
export function formatPriceWithCode(price: number, currencyCode: string): string {
  const formattedPrice = formatPrice(price, currencyCode)
  return `${formattedPrice} ${currencyCode}`
}

/**
 * Get currency info
 */
export function getCurrencyInfo(currencyCode: string): CurrencyInfo | null {
  return CURRENCIES[currencyCode as CurrencyCode] || null
}
