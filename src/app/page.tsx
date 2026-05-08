'use client'

import { useState, useEffect, useRef } from 'react'
import { careerGrades } from '@/data/careerGrades'
import ProgressIndicator from '@/components/ProgressIndicator'
import CareerCard from '@/components/CareerCard'

export default function HomePage() {
  const [currentGrade, setCurrentGrade] = useState(0)
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight <= 0) return
      const progress = Math.min(window.scrollY / docHeight, 1)
      setCurrentGrade(Math.round(progress * (careerGrades.length - 1)))
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    window.scrollTo(0, 0)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[64px_1fr]">
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

      <div className="flex flex-col gap-6 py-10 px-4 md:px-12 pb-20 lg:pb-10">
        <div className="whoami-block">
          <p className="whoami-prompt">$ whoami</p>
          <p className="whoami-name">Adam Wheatley</p>
          <p className="whoami-role">Full-Stack Developer</p>
          <p className="whoami-bio">
            IT support turned developer — I bring systems thinking to full-stack engineering with Rails and Next.js.
          </p>
        </div>

        {careerGrades.map((grade, index) => (
          <section
            key={grade.grade}
            ref={(el) => { sectionRefs.current[index] = el }}
          >
            <CareerCard grade={grade} isActive={index === currentGrade} />
          </section>
        ))}
      </div>
    </div>
  )
}
