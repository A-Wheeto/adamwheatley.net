import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navigation from '@/components/Navigation'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Adam Wheatley | Full-Stack Developer',
    template: '%s | Adam Wheatley'
  },
  description: 'Portfolio showcasing my web development projects and skills',
  keywords: ['web developer', 'portfolio', 'full-stack', 'react', 'nextjs'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100`}>
        <Navigation />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}