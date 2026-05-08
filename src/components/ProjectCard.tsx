import Image from 'next/image'
import { Project } from '@/types/project'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="project-card">
      {project.imageUrl && (
        <div className="project-card-image-wrapper">
          <Image
            src={project.imageUrl}
            alt={`${project.title} screenshot`}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="project-card-image"
          />
        </div>
      )}
      <div className="project-card-body">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-lg font-bold" style={{ color: '#e6edf3' }}>
            {project.title}
          </h3>
          {project.badge && (
            <span className="project-badge">{project.badge}</span>
          )}
        </div>
        <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--muted)' }}>
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span key={tech} className="skill-tag">{tech}</span>
          ))}
        </div>
        <div className="project-card-links">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card-link-primary"
            >
              ⬡ Live Demo
            </a>
          )}
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card-link-secondary"
            >
              ◈ GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
