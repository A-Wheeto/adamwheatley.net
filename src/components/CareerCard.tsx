import { Grade } from '@/types/career'

interface CareerCardProps {
  grade: Grade
  isLastSection: boolean
}

export default function CareerCard({ grade, isLastSection }: CareerCardProps) {
  return (
    <div className="bg-white/95 dark:bg-stone-900/95 backdrop-blur-md p-4 md:p-12 shadow-xl transition-all duration-500 border-2 border-stone-300 dark:border-stone-700 rounded-2xl">
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

      {/* Skills */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {grade.skills.map((skill, index) => (
          <span
            key={index}
            className="px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm border-1 flex items-center justify-center text-center"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* CTA on last section */}
      {isLastSection && (
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
  )
}