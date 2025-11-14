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
      <div className="fixed top-10 left-8 z-40 space-y-4 hidden md:block w-16">
        <div className="block fixed accent p-4 w-full">
          <div className="text-2xl font-bold text-center">
            {grades[currentGrade].grade}
          </div>
        </div>

        <div className="block fixed p-6 w-full">
          <div className="flex flex-col gap-3 items-center py-2">
            {grades.map((grade, index) => (
              <button
                key={index}
                onClick={() => onGradeClick(index)}
                className={`w-5 h-5 transition-all duration-300 rounded-full cursor-pointer hover:scale-125 ${index <= currentGrade
                    ? 'bg-stone-600 dark:bg-stone-400'
                    : 'bg-stone-300 dark:bg-stone-700'
                  } ${index === currentGrade
                    ? 'scale-150 ring-2 ring-stone-500/50 ring-offset-2'
                    : ''
                  }`}
                aria-label={`Jump to ${grade.grade}`}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden" style={{ padding: '0 2.5%' }}>
      <div className="block fixed px-6 py-4" style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'space-between', width: '100%', marginBottom: '0.5rem' }}>
        <div className="text-lg font-bold">
          {grades[currentGrade].grade}
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {grades.map((grade, index) => (
            <button
              key={index}
              onClick={() => onGradeClick(index)}
              className={`w-3 h-3 transition-all duration-300 rounded-full cursor-pointer hover:scale-125 ${index <= currentGrade
                  ? 'bg-stone-600 dark:bg-stone-400'
                  : 'bg-stone-300 dark:bg-stone-700'
                } ${index === currentGrade
                  ? 'scale-150 ring-1 ring-stone-500/50'
                  : ''
                }`}
              aria-label={`Jump to ${grade.grade}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}