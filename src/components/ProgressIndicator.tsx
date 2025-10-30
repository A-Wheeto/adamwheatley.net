import { Grade } from '@/types/career'

interface ProgressIndicatorProps {
  grades: Grade[]
  currentGrade: number
  onGradeClick: (index: number) => void
  variant: 'desktop' | 'mobile'
}

export default function ProgressIndicator({
  grades,
  currentGrade,
  onGradeClick,
  variant
}: ProgressIndicatorProps) {
  if (variant === 'desktop') {
    return (
      <div className="fixed top-10 left-8 z-40 space-y-4 hidden md:block">
        <div className="bg-white/95 dark:bg-stone-900/95 backdrop-blur-lg rounded-2xl p-4 shadow-xl border border-stone-200 dark:border-stone-700">
          <p className="text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2 font-medium">
            Current Grade
          </p>
          <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent">
            {grades[currentGrade].grade}
          </div>
        </div>

        <div className="flex flex-col gap-3 bg-white/95 dark:bg-stone-900/95 backdrop-blur-lg rounded-2xl p-4 shadow-xl border border-stone-200 dark:border-stone-700">
          {grades.map((grade, index) => (
            <button
              key={index}
              onClick={() => onGradeClick(index)}
              className={`w-5 h-5 transition-all duration-300 rounded-full cursor-pointer hover:scale-125 ${index <= currentGrade
                  ? grade.holdColor
                  : 'bg-stone-300 dark:bg-stone-700'
                } ${index === currentGrade ? 'scale-150 ring-2 ring-emerald-500/50 ring-offset-2 ring-offset-white dark:ring-offset-stone-900' : ''}`}
              aria-label={`Jump to ${grade.grade}`}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
      <div className="bg-white/95 dark:bg-stone-900/95 backdrop-blur-lg px-6 py-4 shadow-xl flex items-center gap-4 justify-between border-t border-stone-200 dark:border-stone-700">
        <div className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent">
          {grades[currentGrade].grade}
        </div>

        <div className="flex gap-2">
          {grades.map((grade, index) => (
            <button
              key={index}
              onClick={() => onGradeClick(index)}
              className={`w-3 h-3 transition-all duration-300 rounded-full cursor-pointer hover:scale-125 ${index <= currentGrade
                  ? grade.holdColor
                  : 'bg-stone-300 dark:bg-stone-700'
                } ${index === currentGrade ? 'scale-150 ring-1 ring-emerald-500/50' : ''}`}
              aria-label={`Jump to ${grade.grade}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}