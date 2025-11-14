'use client'

import { useState, useEffect, useRef } from 'react'
import { careerGrades } from '@/data/careerGrades'
import ProgressIndicator from '@/components/ProgressIndicator'
import CareerCard from '@/components/CareerCard'

export default function HomePage() {
  const [currentGrade, setCurrentGrade] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      const currentScroll = window.scrollY
      const progress = Math.min(currentScroll / totalScroll, 1)
      setScrollProgress(progress)

      const gradeIndex = Math.floor(progress * (careerGrades.length - 1))
      setCurrentGrade(gradeIndex)

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
    handleScroll()

    // Scroll to top on mount to ensure proper initial positioning
    window.scrollTo(0, 0)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    })
  }

  return (
    <>
      <main className="relative">
        <div
          className="fixed inset-0 -z-10"
          style={{
            backgroundImage: 'url("/background.png")',
            backgroundRepeat: 'repeat',
            opacity: 0.7,
            backgroundSize: 'clamp(400px, 50vw, 800px)',
          }}
        />

        <ProgressIndicator
          grades={careerGrades}
          currentGrade={currentGrade}
          onGradeClick={scrollToSection}
          variant="desktop"
        />

        <ProgressIndicator
          grades={careerGrades}
          currentGrade={currentGrade}
          onGradeClick={scrollToSection}
          variant="mobile"
        />

        <div className="relative z-10">
          {careerGrades.map((grade, index) => (
            <section
              key={index}
              ref={(el) => {
                sectionRefs.current[index] = el
              }}
              className={`min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 relative ${index === 0 ? 'pt-4 pb-32 md:pt-20 md:pb-20' : 'pt-20 pb-32 md:pt-20 md:pb-20'
                }`}
            >
              <div className="max-w-4xl w-full">
                <CareerCard
                  grade={grade}
                  isLastSection={index === careerGrades.length - 1}
                />
              </div>
            </section>
          ))}
        </div>
      </main>
    </>
  )
}