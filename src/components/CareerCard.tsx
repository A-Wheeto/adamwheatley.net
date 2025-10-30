import { Grade } from '@/types/career'

interface CareerCardProps {
  grade: Grade
  isLastSection: boolean
}

export default function CareerCard({ grade, isLastSection }: CareerCardProps) {
  return (
    <div className="relative bg-gradient-to-br from-stone-50 to-stone-100 dark:from-stone-900 dark:to-stone-800 backdrop-blur-md p-4 md:p-8 lg:p-12 shadow-2xl transition-all duration-500 border border-stone-200 dark:border-stone-700 rounded-3xl overflow-hidden group hover:shadow-emerald-500/10 hover:border-emerald-600/30">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMSI+PHBhdGggZD0iTTM2IDE4YzAgNi42MjctNS4zNzMgMTItMTIgMTJzLTEyLTUuMzczLTEyLTEyIDUuMzczLTEyIDEyLTEyIDEyIDUuMzczIDEyIDEyeiIvPjwvZz48L2c+PC9zdmc+')]"></div>

      <div className="relative z-10">
        {/* Grade Badge */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-4 md:mb-6">
          <span className={`relative px-4 py-2 md:px-5 md:py-2.5 rounded-2xl font-bold text-white bg-gradient-to-br ${grade.color} shadow-lg text-sm md:text-base transform transition-transform group-hover:scale-105`}>
            {grade.grade}
          </span>
          <span className="text-xs md:text-sm uppercase tracking-wider text-stone-500 dark:text-stone-400 font-medium">
            {grade.year}
          </span>
        </div>

        {/* Role Title with subtle underline */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 leading-tight relative inline-block">
          <span className={`bg-gradient-to-r ${grade.color} bg-clip-text text-transparent`}>
            {grade.role}
          </span>
          <div className={`h-1 w-1/3 bg-gradient-to-r ${grade.color} opacity-20 rounded-full mt-2`}></div>
        </h2>

        {/* Description with better spacing */}
        <p className="text-sm sm:text-base md:text-lg text-stone-600 dark:text-stone-300 mb-4 md:mb-6 lg:mb-8 leading-relaxed">
          {grade.description}
        </p>

        {/* Skills with climbing chalk aesthetic */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
          {grade.skills.map((skill, index) => (
            <span
              key={index}
              className="relative px-2 py-2 md:px-3 md:py-2.5 bg-white dark:bg-stone-800 rounded-xl text-xs md:text-sm border border-stone-200 dark:border-stone-700 flex items-center justify-center text-center font-medium text-stone-700 dark:text-stone-300 transition-all hover:border-emerald-500/50 hover:shadow-md group/skill overflow-hidden"
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