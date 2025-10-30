import { Grade } from '@/types/career'

interface CareerCardProps {
  grade: Grade
  isLastSection: boolean
}

export default function CareerCard({ grade, isLastSection }: CareerCardProps) {
  return (
    <div className="relative backdrop-blur-md bg-white/40 dark:bg-stone-900/60 p-4 md:p-8 lg:p-12 shadow-2xl transition-all duration-500 border-2 border-stone-300 dark:border-stone-600 rounded-3xl overflow-hidden group hover:shadow-emerald-500/20 hover:border-emerald-600/50 hover:border-emerald-600 dark:hover:border-emerald-500">
      <div className="relative z-10">
        {/* Grade Badge */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-4 md:mb-6">
          <span className={`relative px-4 py-2 md:px-5 md:py-2.5 rounded-2xl font-bold text-white bg-gradient-to-br ${grade.color} shadow-lg text-sm md:text-base transform transition-transform group-hover:scale-105`}>
            {grade.grade}
          </span>
          <span className="text-xs md:text-sm uppercase tracking-wider text-stone-600 dark:text-stone-300 font-medium">
            {grade.year}
          </span>
        </div>

        {/* Role Title */}
        <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 leading-tight">
          <span className={`bg-gradient-to-r ${grade.color} bg-clip-text text-transparent`}>
            {grade.role}
          </span>
        </h2>

        {/* Description with better spacing */}
        <p className="text-sm sm:text-base md:text-lg text-stone-800 dark:text-stone-200 mb-4 md:mb-6 lg:mb-8 leading-relaxed font-medium">
          {grade.description}
        </p>

        {/* Skills with climbing chalk aesthetic */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
          {grade.skills.map((skill, index) => (
            <span
              key={index}
              className="relative px-2 py-2 md:px-3 md:py-2.5 bg-white/70 dark:bg-stone-800/70 rounded-xl text-xs md:text-sm border-2 border-stone-300 dark:border-stone-600 flex items-center justify-center text-center font-medium text-stone-800 dark:text-stone-200 transition-all hover:border-emerald-500 hover:shadow-md group/skill overflow-hidden"
            >
              {/* Subtle gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${grade.color} opacity-0 group-hover/skill:opacity-5 transition-opacity`}></div>
              <span className="relative z-10">{skill}</span>
            </span>
          ))}
        </div>

        {/* CTA on last section */}
        {isLastSection && (
          <div className="mt-6 md:mt-8 flex justify-center">
            <a
              href="/projects"
              className="relative px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-emerald-700 to-green-700 text-white rounded-xl font-bold uppercase tracking-wide shadow-lg hover:shadow-emerald-500/50 hover:scale-105 transition-all text-sm md:text-base overflow-hidden group/cta"
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/cta:translate-x-full transition-transform duration-700"></div>
              <span className="relative z-10">View My Routes (Projects)</span>
            </a>
          </div>
        )}
      </div>
    </div>
  )
}