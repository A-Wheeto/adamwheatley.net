import { Grade } from '@/types/career'

interface CareerCardProps {
  grade: Grade
  isLastSection: boolean
}

export default function CareerCard({ grade, isLastSection }: CareerCardProps) {
  return (
    <div className="block fixed p-8 md:p-12 lg:p-16 transition-all duration-500">
      <div className="relative z-10 p-8">
        {/* Grade Badge */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-4 md:mb-6">
          <span className="block fixed accent px-4 py-2 md:px-5 md:py-2.5 font-bold text-sm md:text-base" style={{ display: 'inline-block' }}>
            {grade.grade}
          </span>
          <span className="text-xs md:text-sm uppercase tracking-wider text-stone-600 dark:text-stone-300 font-medium">
            {grade.year}
          </span>
        </div>

        {/* Role Title */}
        <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 leading-tight text-stone-900 dark:text-stone-100">
          {grade.role}
        </h2>

        {/* Description with better spacing */}
        <p className="text-sm sm:text-base md:text-lg text-stone-800 dark:text-stone-200 mb-4 md:mb-6 lg:mb-8 leading-relaxed font-medium">
          {grade.description}
        </p>

        {/* Skills with blocks.css pills */}
        <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
          {grade.skills.map((skill, index) => (
            <span
              key={index}
              className="block round fixed px-3 py-2 md:px-4 md:py-2.5 text-xs md:text-sm font-medium text-stone-800 dark:text-stone-200"
              style={{ display: 'inline-block' }}
            >
              {skill}
            </span>
          ))}
        </div>

        {/* CTA on last section */}
        {isLastSection && (
          <div className="mt-6 md:mt-8 flex justify-center">
            <a
              href="/projects"
              className="block accent px-6 py-3 md:px-8 md:py-4 font-bold uppercase tracking-wide text-sm md:text-base text-white no-underline"
            >
              View My Routes
            </a>
          </div>
        )}
      </div>
    </div>
  )
}