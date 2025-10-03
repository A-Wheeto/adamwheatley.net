'use client'

import { useState, useEffect, useRef } from 'react'

export default function HomePage() {
  const [currentGrade, setCurrentGrade] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  // Your career progression
  const grades = [
    {
      grade: 'V0',
      role: 'Starting the Climb',
      description: 'Everyone starts somewhere. Ready to begin the ascent.',
      color: 'from-gray-600 to-gray-500',
      holdColor: 'bg-gray-500',
      year: 'The Beginning'
    },
    {
      grade: 'V1',
      role: 'IT Support 1st Line',
      description: 'Learning the basics, finding my grip in the tech world. Solving fundamental problems and building foundation skills.',
      color: 'from-blue-600 to-blue-500',
      holdColor: 'bg-blue-500',
      year: 'Early Career'
    },
    {
      grade: 'V2',
      role: 'IT Support 2nd Line',
      description: 'Developing problem-solving muscles. Tackling more complex technical challenges with growing confidence.',
      color: 'from-purple-600 to-purple-500',
      holdColor: 'bg-purple-500',
      year: 'Building Skills'
    },
    {
      grade: 'V3',
      role: 'IT Application Support 3rd Line',
      description: 'The technical crux. Deep-diving into applications, understanding systems at a fundamental level.',
      color: 'from-pink-600 to-pink-500',
      holdColor: 'bg-pink-500',
      year: 'Technical Growth'
    },
    {
      grade: 'V4',
      role: 'Junior Ruby Developer',
      description: 'Breaking into development. Writing clean code, building features, contributing to real projects.',
      color: 'from-red-600 to-red-500',
      holdColor: 'bg-red-500',
      year: 'Developer Journey'
    },
    {
      grade: 'V5',
      role: 'Full Stack Developer',
      description: 'Sending the project. Ruby on Rails backend, Next.js frontend. Building complete solutions from concept to deployment.',
      color: 'from-green-600 to-emerald-600',
      holdColor: 'bg-green-600',
      year: 'Current Summit'
    }
  ]

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      const currentScroll = window.scrollY
      const progress = Math.min(currentScroll / totalScroll, 1)
      setScrollProgress(progress)

      // Calculate which grade we're at based on scroll
      const gradeIndex = Math.floor(progress * (grades.length - 1))
      setCurrentGrade(gradeIndex)

      // Check which section is most visible
      sectionRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect()
          const isVisible = rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2
          if (isVisible) {
            setCurrentGrade(index)
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [grades.length])

  return (
    <main className="relative">
      {/* Fixed Progress Indicator */}
      <div className="fixed top-20 left-8 z-40 space-y-4">
        <div className="bg-white/90 dark:bg-stone-900/90 backdrop-blur rounded-lg p-4 shadow-lg">
          <p className="text-xs uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-2">
            Current Grade
          </p>
          <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            {grades[currentGrade].grade}
          </div>
        </div>

        {/* Climbing progress dots */}
        <div className="flex flex-col gap-2">
          {grades.map((grade, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index <= currentGrade
                  ? grade.holdColor
                  : 'bg-stone-300 dark:bg-stone-700'
                } ${index === currentGrade ? 'scale-150 animate-pulse' : ''}`}
            />
          ))}
        </div>
      </div>

      {/* Fixed Climbing Wall Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-stone-100 to-stone-200 dark:from-stone-900 dark:to-stone-800">
        {/* Texture */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
            }}>
          </div>
        </div>

        {/* Animated climbing line that follows scroll */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d={`M 50 100 Q 40 ${100 - scrollProgress * 20} 45 ${100 - scrollProgress * 40} T 50 ${100 - scrollProgress * 60} Q 55 ${100 - scrollProgress * 80} 50 ${100 - scrollProgress * 100}`}
            stroke="rgba(34, 197, 94, 0.3)"
            strokeWidth="0.5"
            fill="none"
            strokeDasharray="2,1"
          />
        </svg>
      </div>

      {/* Scrollable Content Sections */}
      <div className="relative z-10">
        {grades.map((grade, index) => (
          <section
            key={index}
            ref={(el) => {
              sectionRefs.current[index] = el;
            }}
            className="min-h-screen flex items-center justify-center px-6 relative"
          >
            {/* Floating holds for each section */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className={`absolute top-20 left-1/4 w-16 h-16 ${grade.holdColor} rounded-full opacity-20 transform rotate-12 grip-texture shadow-lg`} />
              <div className={`absolute bottom-20 right-1/3 w-20 h-14 ${grade.holdColor} opacity-20 transform -rotate-6 grip-texture shadow-lg`}
                style={{ borderRadius: '60% 40% 70% 30%' }} />
              <div className={`absolute top-1/2 right-1/4 w-14 h-18 ${grade.holdColor} opacity-20 transform rotate-45 grip-texture shadow-lg rounded-lg`} />
            </div>

            <div className="max-w-4xl w-full">
              <div className="bg-white/90 dark:bg-stone-900/90 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-2xl transform transition-all duration-500 hover:scale-105">
                {/* Grade Badge */}
                <div className="flex items-center gap-4 mb-6">
                  <span className={`px-4 py-2 rounded-full font-bold text-white bg-gradient-to-r ${grade.color}`}>
                    {grade.grade}
                  </span>
                  <span className="text-sm uppercase tracking-wider text-stone-500 dark:text-stone-400">
                    {grade.year}
                  </span>
                </div>

                {/* Role Title */}
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className={`bg-gradient-to-r ${grade.color} bg-clip-text text-transparent`}>
                    {grade.role}
                  </span>
                </h2>

                {/* Description */}
                <p className="text-lg text-stone-700 dark:text-stone-300 mb-8">
                  {grade.description}
                </p>

                {/* Skills/Achievements for this level */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {index === 0 && (
                    <>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">💡 Problem Solving</span>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">🎯 Attention to Detail</span>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">🚀 Ready to Learn</span>
                    </>
                  )}
                  {index === 1 && (
                    <>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">🖥️ Hardware Support</span>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">🔧 Troubleshooting</span>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">📞 Customer Service</span>
                    </>
                  )}
                  {index === 2 && (
                    <>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">🔍 Advanced Diagnostics</span>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">📊 System Analysis</span>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">🛠️ Network Support</span>
                    </>
                  )}
                  {index === 3 && (
                    <>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">💾 Database Management</span>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">⚙️ Application Support</span>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">📝 Documentation</span>
                    </>
                  )}
                  {index === 4 && (
                    <>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">💎 Ruby</span>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">🛤️ Rails</span>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">🗄️ PostgreSQL</span>
                    </>
                  )}
                  {index === 5 && (
                    <>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">⚡ Next.js</span>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">🎨 TypeScript</span>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">🚀 Full Stack</span>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">☁️ Cloud Deploy</span>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">🔄 CI/CD</span>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">🎸 Music & Climbing</span>
                    </>
                  )}
                </div>

                {/* CTA on last section */}
                {index === grades.length - 1 && (
                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <a
                      href="/projects"
                      className="px-8 py-4 bg-gradient-to-r from-green-700 to-emerald-700 text-white rounded-lg font-bold uppercase tracking-wide shadow-lg hover:scale-105 transition text-center"
                    >
                      View My Routes (Projects)
                    </a>
                    <a
                      href="/contact"
                      className="px-8 py-4 border-2 border-green-600 text-green-700 dark:text-green-400 rounded-lg font-bold uppercase tracking-wide shadow-lg hover:scale-105 transition text-center"
                    >
                      Find a Belay Partner
                    </a>
                  </div>
                )}
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="fixed bottom-8 right-8 z-40">
        <div className="bg-white/90 dark:bg-stone-900/90 backdrop-blur rounded-full p-3 shadow-lg animate-bounce">
          <svg className="w-6 h-6 text-stone-600 dark:text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </main>
  )
}