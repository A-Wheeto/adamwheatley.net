import type { Metadata } from 'next'
import './globals.css'
import NavBar from '@/components/NavBar'
import BackgroundLayers from '@/components/BackgroundLayers'

export const metadata: Metadata = {
  metadataBase: new URL('https://adamwheatley.net'),
  title: {
    default: 'Adam Wheatley | Full-Stack Developer',
    template: '%s | Adam Wheatley',
  },
  description:
    'Full-Stack Developer specialising in Ruby on Rails and Next.js. Career journey from IT support to development.',
  keywords: [
    'Adam Wheatley',
    'full-stack developer',
    'Ruby on Rails',
    'Next.js',
    'React',
    'TypeScript',
    'portfolio',
  ],
  authors: [{ name: 'Adam Wheatley' }],
  creator: 'Adam Wheatley',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://adamwheatley.net',
    title: 'Adam Wheatley | Full-Stack Developer',
    description: 'Full-Stack Developer specialising in Ruby on Rails and Next.js',
    siteName: 'Adam Wheatley Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Adam Wheatley — Full-Stack Developer',
      },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Adam Wheatley',
              jobTitle: 'Full-Stack Developer',
              url: 'https://adamwheatley.net',
              sameAs: [
                'https://github.com/A-Wheeto',
                'https://uk.linkedin.com/in/adam-wheatley-643810195',
              ],
            }),
          }}
        />
        <BackgroundLayers />
        <NavBar />
        <main style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </main>
        <footer className="footer">
          <span className="footer-brand">adam_wheatley · {new Date().getFullYear()}</span>
          <div className="flex gap-4">
            <a
              href="https://github.com/A-Wheeto"
              className="footer-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://uk.linkedin.com/in/adam-wheatley-643810195"
              className="footer-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </footer>
      </body>
    </html>
  )
}
