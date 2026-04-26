import './css/style.css'

import { Inter } from 'next/font/google'
import Theme from './theme-provider'
import AppProvider from './app-provider'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  title: 'BidTrack - Tender pipeline tracking for SME bid teams',
  description: 'Replace messy bid spreadsheets with a secure tender pipeline, deadline reminders, reporting, and CSV exports.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>{/* suppressHydrationWarning: https://github.com/vercel/next.js/issues/44343 */}
      <body className="font-inter antialiased bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400">
        <Theme>
          <AppProvider>
            {children}
          </AppProvider>
        </Theme>
      </body>
    </html>
  )
}
