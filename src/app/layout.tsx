import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Adam Wheatley | Full-Stack Developer',
    template: '%s | Adam Wheatley'
  },
  description: 'Full-Stack Developer specializing in Ruby on Rails and Next.js. Journey from IT support to development, showcasing projects and climbing the grades of web development.',
  keywords: ['Adam Wheatley', 'full-stack developer', 'web developer', 'Ruby on Rails', 'Next.js', 'React', 'TypeScript', 'portfolio'],
  authors: [{ name: 'Adam Wheatley' }],
  creator: 'Adam Wheatley',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://adamwheatley.net',
    title: 'Adam Wheatley | Full-Stack Developer',
    description: 'Full-Stack Developer specializing in Ruby on Rails and Next.js',
    siteName: 'Adam Wheatley Portfolio',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="stylesheet" href="https://unpkg.com/blocks.css/dist/blocks.min.css" />
      </head>
      <body className={`${inter.className} bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100`}>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}