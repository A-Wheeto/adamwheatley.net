import { Grade } from '@/types/career'

interface CareerCardProps {
  grade: Grade
  isActive: boolean
}

export default function CareerCard({ grade, isActive }: CareerCardProps) {
  const isAspirational = grade.grade === 'V6'

  if (isAspirational) {
    return (
      <div className="career-card-aspirational">
        <div className="flex items-center gap-3 mb-3">
          <span className="grade-badge-dim">{grade.grade}</span>
          <span className="card-date" style={{ opacity: 0.6 }}>{grade.year}</span>
        </div>
        <h2
          className="text-2xl font-bold mb-1"
          style={{ color: 'rgba(230, 237, 243, 0.6)' }}
        >
          {grade.role}
        </h2>
        <p
          className="text-sm mb-4 leading-relaxed"
          style={{ color: 'rgba(139, 148, 158, 0.6)' }}
        >
          {grade.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {grade.skills.map((skill) => (
            <span key={skill} className="skill-tag-dim">{skill}</span>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`career-card${isActive ? ' career-card-active' : ''}`}>
      <div className="flex items-center gap-3 mb-3">
        <span className="grade-badge">{grade.grade}</span>
        <span className="card-date">{grade.year}</span>
      </div>
      <h2 className="text-2xl font-bold mb-1" style={{ color: '#e6edf3' }}>
        {grade.role}
      </h2>
      <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--muted)' }}>
        {grade.description}
      </p>
      {grade.skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {grade.skills.map((skill) => (
            <span key={skill} className="skill-tag">{skill}</span>
          ))}
        </div>
      )}
    </div>
  )
}
