'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-lg font-semibold hover:text-green-700 dark:hover:text-green-400 transition"
        >
          adamwheatley.net
        </Link>

        <div className="hidden md:flex gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${isActive
                    ? 'bg-green-800 dark:bg-green-900/30 text-white dark:text-green-400'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-green-700 dark:hover:text-green-400'
                  }`}
              >
                {link.name}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}