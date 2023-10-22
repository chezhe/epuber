import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import { TamaguiProvider } from './TamaguiProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'epuber',
  description: 'A modern epub reader',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <TamaguiProvider> */}
        <Providers>{children}</Providers>
        {/* </TamaguiProvider> */}
      </body>
    </html>
  )
}
