import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s - Chisfis',
    default: 'Chisfis - Booking online React Next.js template',
  },
  description: 'Booking online & rental online Next.js Template',
  keywords: ['Chisfis', 'Booking online', 'Rental online', 'React Next.js template'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // This is a simplified root layout that just passes through children
  // The (payload) route group has its own RootLayout from Payload
  // The (app) route group has its own layout with ThemeProvider and Tailwind CSS
  return children
}
