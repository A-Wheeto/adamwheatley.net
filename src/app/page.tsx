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
    return () => window.removeEventListener('scroll', handleScroll)
  }, []) // Empty dependency array is fine - we want this to run once on mount

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
            backgroundSize: 'auto',
            opacity: 0.3,
            filter: 'saturate(0.5) hue-rotate(120deg)'
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
              className="min-h-screen flex items-center justify-center px-4 py-20 sm:px-6 md:px-8 lg:px-12 relative"
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