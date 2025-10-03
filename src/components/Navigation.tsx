'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Navigation() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
  ]

  // Close menu when clicking a link
  const handleLinkClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-stone-100/90 dark:bg-stone-900/90 backdrop-blur-md border-b border-stone-300 dark:border-stone-700">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link
            href="/"
            className="text-lg font-semibold hover:text-green-700 dark:hover:text-green-400 transition"
          >
            adamwheatley.net
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${isActive
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-semibold'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-green-700 dark:hover:text-green-400'
                    }`}
                >
                  {link.name}
                </Link>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              // X icon when menu is open
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger icon when menu is closed
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-900 z-50 transform transition-transform duration-300 md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        <div className="p-6">
          {/* Close button */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Menu Links */}
          <div className="mt-12 flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`px-4 py-3 rounded-lg text-base transition-all duration-200 ${isActive
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-semibold'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-green-700 dark:hover:text-green-400'
                    }`}
                >
                  {link.name}
                </Link>
              )
            })}
          </div>

          {/* Optional: Add social links or other info */}
          <div className="absolute bottom-6 left-6 right-6">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              © 2024 Adam Wheatley
            </p>
          </div>
        </div>
      </div>
    </>
  )
}