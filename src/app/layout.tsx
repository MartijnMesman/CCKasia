import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Minimal Dark App',
  description: 'A minimal Next.js app with dark theme',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white font-sans antialiased">
        {children}
      </body>
    </html>
  )
}