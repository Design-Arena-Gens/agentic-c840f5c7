import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'n8n Cold Email Workflow',
  description: 'Build and visualize cold email workflows',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
