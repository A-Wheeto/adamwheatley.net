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
        <div className="bg-white/90 dark:bg-stone-900/90 backdrop-blur rounded-lg p-4 shadow-lg">
          <p className="text-xs uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-2">
            Current Grade
          </p>
          <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            {grades[currentGrade].grade}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {grades.map((grade, index) => (
            <button
              key={index}
              onClick={() => onGradeClick(index)}
              className={`w-4 h-4 transition-all duration-300 rounded-full cursor-pointer hover:scale-125 ${index <= currentGrade
                  ? grade.holdColor
                  : 'bg-stone-300 dark:bg-stone-700'
                } ${index === currentGrade ? 'scale-150 animate-pulse' : ''}`}
              aria-label={`Jump to ${grade.grade}`}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
      <div className="bg-white/90 dark:bg-stone-900/90 backdrop-blur px-6 py-3 shadow-lg flex items-center gap-4 justify-between">
        <div className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
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
                } ${index === currentGrade ? 'scale-150 animate-pulse' : ''}`}
              aria-label={`Jump to ${grade.grade}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}