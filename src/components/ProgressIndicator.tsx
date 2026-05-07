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
  variant,
}: ProgressIndicatorProps) {
  if (variant === 'desktop') {
    return (
      <div className="progress-sidebar">
        <div className="prog-track">
          {grades.map((grade, index) => (
            <div key={grade.grade}>
              {index > 0 && <div className="prog-line" />}
              <div className="prog-item">
                <button
                  className={`prog-dot${index === currentGrade ? ' prog-dot-active' : index < currentGrade ? ' prog-dot-visited' : ''}`}
                  onClick={() => onGradeClick(index)}
                  aria-label={`Jump to ${grade.grade}`}
                />
                <span className={`prog-label${index === currentGrade ? ' prog-label-active' : ''}`}>
                  {grade.grade}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="progress-mobile-bar">
      <div className="flex items-center justify-between">
        <span className="prog-label prog-label-active" style={{ fontSize: '11px' }}>
          {grades[currentGrade].grade} — {grades[currentGrade].role}
        </span>
        <div className="flex gap-2 items-center">
          {grades.map((grade, index) => (
            <button
              key={grade.grade}
              className={`prog-dot${index === currentGrade ? ' prog-dot-active' : index < currentGrade ? ' prog-dot-visited' : ''}`}
              onClick={() => onGradeClick(index)}
              aria-label={`Jump to ${grade.grade}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
