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
      role: 'Adam Wheatley',
      description: "Full-Stack Developer with a passion for building elegant solutions. This is my journey from IT support to full-stack development - a climb that's taught me persistence, problem-solving, and the value of finding the right approach. Just like in bouldering, every problem has a solution; sometimes you just need to find the right sequence.",
      color: 'from-gray-600 to-gray-500',
      holdColor: 'bg-gray-500',
      year: 'The Journey Begins'
    },
    {
      grade: 'V1',
      role: 'IT Analyst - Aviva',
      description: 'Started my tech career providing 1st line IT support to employees across UK, Ireland, and globally. Handled high-volume support calls, diagnosed issues with desktop machines, laptops, Citrix, RDP, and Virtual Machines. Building my foundation in troubleshooting and customer service.',
      color: 'from-blue-600 to-blue-500',
      holdColor: 'bg-blue-500',
      year: 'Nov 2018 - Nov 2019'
    },
    {
      grade: 'V2',
      role: '2nd Line IT Support - Askham Bryan College',
      description: 'Leveled up to supporting 2000+ students and 400 staff across five UK sites. Managed a busy walk-up IT support desk, handling everything from hardware issues to software problems across Windows, Mac, and Chromebooks. Focus on educating users to resolve issues independently.',
      color: 'from-purple-600 to-purple-500',
      holdColor: 'bg-purple-500',
      year: 'Nov 2019 - Aug 2022'
    },
    {
      grade: 'V3',
      role: 'Support Engineer - Cloud Design Box',
      description: 'Transitioned to cloud technologies, specializing in automated SharePoint solutions for schools and businesses. Integrated with school MIS systems using Microsoft Data Sync, led client onboarding, and provided tailored consultations. The technical crux where cloud met infrastructure.',
      color: 'from-pink-600 to-pink-500',
      holdColor: 'bg-pink-500',
      year: 'Aug 2022 - Sep 2023'
    },
    {
      grade: 'V4',
      role: 'IT Application Support 3rd Line - STEM Learning',
      description: 'Reached the summit of IT support, managing SharePoint, Office 365, Azure AD for 160+ employees. Led migration from network shares to SharePoint, extensive Microsoft Dynamics work including a 16-week development course. This was my springboard into development.',
      color: 'from-red-600 to-red-500',
      holdColor: 'bg-red-500',
      year: 'Sep 2023 - Mar 2024'
    },
    {
      grade: 'V5',
      role: 'Junior Ruby Developer - STEM Learning',
      description: 'Made the leap to full development! Building features for Teach Computing website using Ruby on Rails, JavaScript, Stimulus, and CSS. Integrated Classmarker & Credly APIs, managing Heroku deployments, achieving 96% test coverage with RSpec. From support to developer - the climb continues!',
      color: 'from-orange-600 to-orange-500',
      holdColor: 'bg-orange-500',
      year: 'Mar 2024 - Present'
    },
    {
      grade: 'V6',
      role: 'Full Stack Developer',
      description: 'The summit achieved! Ruby on Rails backend expertise meets Next.js frontend mastery. Building complete solutions from concept to deployment, creating this very portfolio to showcase the journey. Ready for agency work that combines technical excellence with creative problem-solving.',
      color: 'from-green-600 to-emerald-600',
      holdColor: 'bg-green-600',
      year: 'The Next Challenge'
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
    <main className="relative bg-green-50 dark:bg-stone-950">
      {/* Fixed Progress Indicator - Hidden on mobile */}
      <div className="fixed top-10 left-8 z-40 space-y-4 hidden md:block">
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

      {/* Abstract Mountain Shape - Fixed on right side */}
      <div className="fixed right-0 top-0 h-full w-[10vw] z-0 overflow-hidden pointer-events-none">
        <svg
          className="h-full w-full"
          viewBox="0 0 100 1000"
          preserveAspectRatio="none"
          style={{ transform: 'translateX(-2px)' }}
        >
          <defs>
            <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgb(220, 220, 220)" stopOpacity="0.15" />
              <stop offset="50%" stopColor="rgb(200, 200, 200)" stopOpacity="0.1" />
              <stop offset="100%" stopColor="rgb(180, 180, 180)" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="mountainGradientDark" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgb(100, 100, 100)" stopOpacity="0.2" />
              <stop offset="50%" stopColor="rgb(80, 80, 80)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="rgb(60, 60, 60)" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Mountain silhouette path */}
          <path
            d="M 100 0 
               L 85 50 
               L 90 120 
               L 75 180 
               L 82 250 
               L 70 320 
               L 88 400 
               L 72 480 
               L 85 550 
               L 68 620 
               L 80 700 
               L 75 780 
               L 90 850 
               L 85 920 
               L 100 1000 
               L 100 0 Z"
            className="fill-stone-200/20 dark:fill-stone-800/30"
          />

          {/* Secondary layer for depth */}
          <path
            d="M 100 100 
               L 92 150 
               L 95 220 
               L 88 280 
               L 93 350 
               L 85 420 
               L 92 500 
               L 87 580 
               L 91 650 
               L 86 720 
               L 92 800 
               L 88 880 
               L 95 950 
               L 100 1000 
               L 100 100 Z"
            className="fill-stone-300/10 dark:fill-stone-700/20"
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
              <div className={`absolute top-20 left-1/4 w-16 h-16 ${grade.holdColor} rounded-full opacity-20 transform rotate-12 shadow-lg`} />
              <div className={`absolute bottom-20 right-1/3 w-20 h-14 ${grade.holdColor} opacity-20 transform -rotate-6 shadow-lg`}
                style={{ borderRadius: '60% 40% 70% 30%' }} />
              <div className={`absolute top-1/2 right-1/4 w-14 h-18 ${grade.holdColor} opacity-20 transform rotate-45 shadow-lg rounded-lg`} />
            </div>

            <div className="max-w-4xl w-full">
              <div className="bg-white/95 dark:bg-stone-900/95 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-xl transform transition-all duration-500 hover:scale-105 border border-stone-200/50 dark:border-stone-800/50">
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
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">🧗 Bouldering Enthusiast</span>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">🎸 Guitarist</span>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">🥁 Drummer</span>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">💻 Problem Solver</span>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">🚀 Creative Thinker</span>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">🎯 Detail Oriented</span>
                    </>
                  )}
                  {index === 1 && (
                    <>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">☎️ High Volume Support</span>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">🖥️ Windows 7/10</span>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">☁️ Citrix & RDP</span>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">🗂️ Active Directory</span>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">📱 Mobile Support</span>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">🎫 Ticket Management</span>
                    </>
                  )}
                  {index === 2 && (
                    <>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">👥 2000+ Users</span>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">🖥️ Multi-Platform</span>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">🍎 Mac OS</span>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">📱 Chromebooks</span>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">🎓 User Training</span>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">🏢 Multi-Site Support</span>
                    </>
                  )}
                  {index === 3 && (
                    <>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">☁️ SharePoint Design</span>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">🔄 MS Data Sync</span>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">🏫 MIS Integration</span>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">🚀 Client Onboarding</span>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">🔐 Permissions Mgmt</span>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">💼 Consultations</span>
                    </>
                  )}
                  {index === 4 && (
                    <>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">☁️ Azure AD</span>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">📊 MS Dynamics</span>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">🔄 SharePoint Migration</span>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">🖥️ Infrastructure</span>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">🐧 Linux</span>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">📱 Intune</span>
                    </>
                  )}
                  {index === 5 && (
                    <>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">💎 Ruby on Rails</span>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">⚡ JavaScript/Stimulus</span>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">🧪 RSpec (96% coverage)</span>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">🚀 Heroku</span>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">🔌 API Integration</span>
                      <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm">📊 MS Dynamics</span>
                    </>
                  )}
                  {index === 6 && (
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

                {/* CTA on first section */}
                {index === 0 && (
                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
                      }}
                      className="px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-500 text-white rounded-lg font-bold uppercase tracking-wide shadow-lg hover:scale-105 transition text-center"
                    >
                      Start the Journey ↓
                    </a>
                  </div>
                )}

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

      {/* Scroll indicator - hides when at bottom */}
      {scrollProgress < 0.98 && (
        <div className="fixed bottom-8 right-8 z-40">
          <div className="bg-white/90 dark:bg-stone-900/90 backdrop-blur rounded-full p-3 shadow-lg animate-bounce">
            <svg className="w-6 h-6 text-stone-600 dark:text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      )}
    </main>
  )
}