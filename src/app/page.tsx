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
    <>
      <main className="relative">
        <div
          className="fixed inset-0 -z-10"
          style={{
            backgroundImage: 'url("/background.png")',
            backgroundRepeat: 'repeat',
            backgroundSize: 'auto',
            opacity: 0.3,
            filter: 'saturate(0.5) hue-rotate(120deg)'
          }}
        />

        {/* Fixed Progress Indicator - Desktop (left side) */}
        <div className="fixed top-10 left-8 z-40 space-y-4 hidden md:block">
          <div className="bg-white/90 dark:bg-stone-900/90 backdrop-blur rounded-lg p-4 shadow-lg">
            <p className="text-xs uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-2">
              Current Grade
            </p>
            <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {grades[currentGrade].grade}
            </div>
          </div>

          {/* Climbing progress dots with hold shapes */}
          <div className="flex flex-col gap-2">
            {grades.map((grade, index) => (
              <div
                key={index}
                className={`w-4 h-4 transition-all duration-300 rounded-full ${index <= currentGrade
                    ? grade.holdColor
                    : 'bg-stone-300 dark:bg-stone-700'
                  } ${index === currentGrade ? 'scale-150 animate-pulse' : ''}`}
              />
            ))}
          </div>
        </div>

        {/* Fixed Progress Indicator - Mobile (bottom) */}
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 md:hidden">
          <div className="bg-white/90 dark:bg-stone-900/90 backdrop-blur rounded-full px-6 py-3 shadow-lg flex items-center gap-4">
            <div className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {grades[currentGrade].grade}
            </div>

            {/* Climbing progress dots - horizontal on mobile with hold shapes */}
            <div className="flex gap-2">
              {grades.map((grade, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 transition-all duration-300 rounded-full ${index <= currentGrade
                      ? grade.holdColor
                      : 'bg-stone-300 dark:bg-stone-700'
                    } ${index === currentGrade ? 'scale-150 animate-pulse' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Scrollable Content Sections */}
        <div className="relative z-10">
          {grades.map((grade, index) => (
            <section
              key={index}
              ref={(el) => {
                sectionRefs.current[index] = el;
              }}
              className="min-h-screen flex items-center justify-center px-8 md:px-8 lg:px-12 relative"
            >
              <div className="max-w-4xl w-full">
                <div className="bg-white/95 dark:bg-stone-900/95 backdrop-blur-md p-6 md:p-12 shadow-xl transition-all duration-500 border-2 border-stone-300 dark:border-stone-700 rounded-2xl">
                  {/* Grade Badge */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className={`px-4 py-2 rounded-full font-bold text-white bg-gradient-to-r ${grade.color} shadow-lg`}>
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
                        <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm border-1 flex items-center justify-center text-center">Bouldering Enthusiast</span>
                        <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm border-1 flex items-center justify-center text-center">Guitarist</span>
                        <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm border-1 flex items-center justify-center text-center">Drummer</span>
                        <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm border-1 flex items-center justify-center text-center">Problem Solver</span>
                        <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm border-1 flex items-center justify-center text-center">Creative Thinker</span>
                        <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm border-1 flex items-center justify-center text-center">Detail Oriented</span>
                      </>
                    )}
                    {index === 1 && (
                      <>
                        <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm border-1 flex items-center justify-center text-center">High Volume Support</span>
                        <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm border-1 flex items-center justify-center text-center">Windows 7/10</span>
                        <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm border-1 flex items-center justify-center text-center">Citrix & RDP</span>
                        <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm border-1 flex items-center justify-center text-center">Active Directory</span>
                        <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm border-1 flex items-center justify-center text-center">Mobile Support</span>
                        <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm border-1 flex items-center justify-center text-center">Ticket Management</span>
                      </>
                    )}
                    {index === 2 && (
                      <>
                        <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm border-1 flex items-center justify-center text-center">2000+ Users</span>
                        <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm border-1 flex items-center justify-center text-center">Multi-Platform</span>
                        <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm border-1 flex items-center justify-center text-center">Mac OS</span>
                        <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm border-1 flex items-center justify-center text-center">Chromebooks</span>
                        <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm border-1 flex items-center justify-center text-center">User Training</span>
                        <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm border-1 flex items-center justify-center text-center">Multi-Site Support</span>
                      </>
                    )}
                    {index === 3 && (
                      <>
                        <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm border-1 flex items-center justify-center text-center">SharePoint Design</span>
                        <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm border-1 flex items-center justify-center text-center">MS Data Sync</span>
                        <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm border-1 flex items-center justify-center text-center">MIS Integration</span>
                        <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm border-1 flex items-center justify-center text-center">Client Onboarding</span>
                        <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm border-1 flex items-center justify-center text-center">Permissions Mgmt</span>
                        <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm border-1 flex items-center justify-center text-center">Consultations</span>
                      </>
                    )}
                    {index === 4 && (
                      <>
                        <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm border-1 flex items-center justify-center text-center">Azure AD</span>
                        <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm border-1 flex items-center justify-center text-center">MS Dynamics</span>
                        <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm border-1 flex items-center justify-center text-center">SharePoint Migration</span>
                        <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm border-1 flex items-center justify-center text-center">Infrastructure</span>
                        <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm border-1 flex items-center justify-center text-center">Linux</span>
                        <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm border-1 flex items-center justify-center text-center">Intune</span>
                      </>
                    )}
                    {index === 5 && (
                      <>
                        <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm border-1 flex items-center justify-center text-center">Ruby on Rails</span>
                        <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm border-1 flex items-center justify-center text-center">JavaScript/Stimulus</span>
                        <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm border-1 flex items-center justify-center text-center">RSpec</span>
                        <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm border-1 flex items-center justify-center text-center">Heroku</span>
                        <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm border-1 flex items-center justify-center text-center">API Integration</span>
                        <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm border-1 flex items-center justify-center text-center">MS Dynamics</span>
                      </>
                    )}
                    {index === 6 && (
                      <>
                        <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm border-1 flex items-center justify-center text-center">Next.js</span>
                        <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm border-1 flex items-center justify-center text-center">TypeScript</span>
                        <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm border-1 flex items-center justify-center text-center">Full Stack</span>
                        <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm border-1 flex items-center justify-center text-center">Cloud Deploy</span>
                        <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm border-1 flex items-center justify-center text-center">CI/CD</span>
                        <span className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm border-1 flex items-center justify-center text-center">Vercel</span>
                      </>
                    )}
                  </div>

                  {/* Climb to next level button - show on all except last */}
                  {index < grades.length - 1 && (
                    <div className="mt-8 flex justify-center">
                      <button
                        onClick={() => {
                          window.scrollTo({
                            top: window.innerHeight * (index + 1),
                            behavior: 'smooth'
                          });
                        }}
                        className={`px-6 py-3 bg-gradient-to-r ${grade.color} text-white rounded-lg font-bold uppercase tracking-wide shadow-lg hover:scale-105 transition flex items-center gap-2`}
                      >
                        Climb to Next Level
                      </button>
                    </div>
                  )}

                  {/* CTA on last section */}
                  {index === grades.length - 1 && (
                    <div className="mt-8 flex justify-center">
                      <a
                        href="/projects"
                        className="px-8 py-4 bg-gradient-to-r from-green-700 to-emerald-700 text-white rounded-lg font-bold uppercase tracking-wide shadow-lg hover:scale-105 transition text-center"
                      >
                        View My Routes (Projects)
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </section>
          ))}
        </div>
      </main>
    </>
  )
}