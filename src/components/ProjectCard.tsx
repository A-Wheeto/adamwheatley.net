import { Project } from '@/types/project'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="project-card"
    >
      <h3 className="text-lg font-bold mb-2" style={{ color: '#e6edf3' }}>
        {project.title}
      </h3>
      <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--muted)' }}>
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <span key={tech} className="skill-tag">{tech}</span>
        ))}
      </div>
    </a>
  )
}
