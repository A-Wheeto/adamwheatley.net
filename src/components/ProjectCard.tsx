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
      className="block p-6 md:p-8 no-underline"
      style={{ display: 'block' }}
    >
      <div className="relative z-10 p-3">
        {/* Project Title */}
        <h3 className="text-xl md:text-2xl font-bold mb-3 text-stone-900 dark:text-stone-100">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm md:text-base text-stone-800 dark:text-stone-200 mb-4 leading-relaxed font-medium">
          {project.description}
        </p>

        {/* Technologies */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="block round fixed px-3 py-1.5 text-xs font-medium text-stone-800 dark:text-stone-200"
              style={{ display: 'inline-block' }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </a>
  )
}