'use client'

import { useState, useEffect, useRef } from 'react'
import { careerGrades } from '@/data/careerGrades'
import ProgressIndicator from '@/components/ProgressIndicator'
import CareerCard from '@/components/CareerCard'

export default function HomePage() {
  const [currentGrade, setCurrentGrade] = useState(0)
  const sectionRefs = useRef<(HTMLElement | null)[]>([])
  const [typedRole, setTypedRole] = useState('')
  const [typingDone, setTypingDone] = useState(false)
  const typingRef = useRef<ReturnType<typeof setInterval> | null>(null)

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

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setTypedRole('Full-Stack Developer')
      setTypingDone(true)
      return
    }
    const target = 'Full-Stack Developer'
    let i = 0
    typingRef.current = setInterval(() => {
      i++
      setTypedRole(target.slice(0, i))
      if (i >= target.length) {
        clearInterval(typingRef.current!)
        setTypingDone(true)
      }
    }, 55)
    return () => { if (typingRef.current) clearInterval(typingRef.current) }
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
          <p className="whoami-role">
            {typedRole}
            {!typingDone && <span className="cursor" aria-hidden="true" />}
          </p>
          <p className="whoami-bio" style={{ opacity: typingDone ? 1 : 0, transition: 'opacity 0.6s' }}>
            Seven years in tech, starting in IT support and working up to full-stack development. That foundation shapes how I write code: practical, user-aware, and built to last. I build with Ruby on Rails and Next.js, and I care about clean, well-tested solutions that actually solve problems. Outside of work I boulder, play guitar, and drum. The same mindset that gets me up a hard climb is what I bring to engineering. I&apos;m looking for a team where I can keep growing and work on things that matter.
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
